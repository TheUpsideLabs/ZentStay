import fs from "fs";
import readline from "readline";
import prisma from "../config/prisma";
import path from "path";

// Normalizes a string: title case, removes extra spaces
function normalizeName(str: string): string {
  if (!str) return "";
  return str
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Generates a URL-friendly slug
function generateSlug(name: string, city: string, state: string): string {
  const base = `${name} ${city} ${state}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  // To avoid excessively long slugs, truncate to 100 chars
  return base.substring(0, 100).replace(/-$/, "");
}

function parseCSVLine(text: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"' && text[i + 1] === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result.map(s => s.trim());
}

async function run() {
  const args = process.argv.slice(2);
  const filePath = args[0] || path.join(__dirname, "../../data/aishe_colleges.csv");

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    console.error(`Usage: npm run tsx src/scripts/import-colleges.ts <path-to-csv>`);
    process.exit(1);
  }

  console.log(`Starting import from ${filePath}...`);
  
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let isHeader = true;
  const headers: string[] = [];
  let imported = 0;
  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for await (const line of rl) {
    let processedLine = line.trim();
    if (processedLine.startsWith('"') && processedLine.endsWith('"') && processedLine.includes('""')) {
      // Fix weird CSV where the entire line is wrapped in quotes and inner quotes are doubled
      processedLine = processedLine.substring(1, processedLine.length - 1).replace(/""/g, '"');
    } else if (processedLine.startsWith('"') && processedLine.endsWith('"') && !processedLine.substring(1, processedLine.length - 1).includes('"')) {
      processedLine = processedLine.substring(1, processedLine.length - 1);
    }
    const values = parseCSVLine(processedLine);

    if (isHeader) {
      headers.push(...values.map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, "")));
      isHeader = false;
      continue;
    }

    // Map by header index
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = values[i] || "";
    });

    // Standard AISHE headers might include aishecode, name, district, state
    // We map flexibly to handle standard variations
    let aisheCode = row.aishecode || row.id || "";
    let rawName = row.name || row.institutionname || row.collegename || "";
    const rawCity = row.district || row.city || row.districtname || "Unknown City";
    const rawState = row.state || row.statename || "Unknown State";
    const rawWebsite = row.website || row.officialwebsite || row.url || "";

    // Extract embedded AISHE code (Id: C-39230)
    if (!aisheCode && rawName.includes("(Id:")) {
      const match = rawName.match(/\(Id:\s*([A-Z0-9-]+)\)/i);
      if (match) {
        aisheCode = match[1];
        rawName = rawName.replace(/\(Id:\s*[A-Z0-9-]+\)/i, "").trim();
      }
    }

    if (!rawName) {
      skipped++;
      continue;
    }

    const name = normalizeName(rawName);
    const city = normalizeName(rawCity);
    const state = normalizeName(rawState);
    const shortName = name.split(" ").map(w => w[0]).join("").substring(0, 10).toUpperCase();
    const officialWebsite = rawWebsite ? rawWebsite.trim().toLowerCase() : null;

    let baseSlug = generateSlug(name, city, state);

    try {
      // Deduplication strategy: primarily by aisheCode. 
      // If no aisheCode, deduplicate by slug (Name + City + State combination)
      let existingCollege = null;

      if (aisheCode) {
        existingCollege = await prisma.college.findFirst({
          where: { aisheCode },
        });
      }

      if (!existingCollege) {
        existingCollege = await prisma.college.findFirst({
          where: { slug: baseSlug },
        });
      }

      const collegeData = {
        name,
        shortName,
        slug: baseSlug,
        city,
        state,
        aisheCode: aisheCode || null,
        officialWebsite,
        source: "AISHE",
        sourceYear: "2015", // updated to match our decision
        verified: true,
      };

      if (existingCollege) {
        // Update if existing to ensure idempotent runs
        await prisma.college.update({
          where: { id: existingCollege.id },
          data: collegeData,
        });
        updated++;
      } else {
        // Create new
        // Handle potential slug collision on insert
        let slugToUse = baseSlug;
        let suffix = 1;
        while (true) {
          const checkSlug = await prisma.college.findUnique({ where: { slug: slugToUse } });
          if (!checkSlug) break;
          slugToUse = `${baseSlug}-${suffix++}`;
        }
        
        collegeData.slug = slugToUse;
        await prisma.college.create({
          data: collegeData,
        });
        imported++;
      }
    } catch (err: any) {
      console.error(`Error processing row: ${name}`, err.message);
      errors++;
    }
  }

  console.log(`\nImport complete!`);
  console.log(`---------------------`);
  console.log(`Imported: ${imported}`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Errors: ${errors}`);
}

run().catch(console.error).finally(() => prisma.$disconnect());
