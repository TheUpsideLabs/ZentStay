import { Footer } from "@/components/footer/footer";
import { ListingPage } from "@/components/properties/listing-page";
import { Navbar } from "@/components/navbar/navbar";

export default function PropertiesPage() {
  return (
    <>
      <Navbar />

      <main className="pt-32">

        <ListingPage />

      </main>

      <Footer />
    </>
  );
}