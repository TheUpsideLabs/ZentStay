# ZentStay — Production Cloud Deployment Guide

This guide details the two standard paths to deploy the ZentStay platform to production:
1. **Option A (Recommended Serverless / PaaS):** Vercel (Frontend) + Railway or Render (Backend & Managed PostgreSQL).
2. **Option B (Self-Hosted / VPS):** Single-command Docker Compose on AWS EC2, DigitalOcean, or Hetzner.

---

## 🚀 Option A: PaaS Deployment (Vercel + Railway / Render)

### Step 1: Managed PostgreSQL Database
1. Create a PostgreSQL 16 database on **Railway**, **Neon**, **Supabase**, or **AWS RDS**.
2. Copy the production connection string:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/zentstay_prod?sslmode=require"
   ```
3. Run initial production migration:
   ```bash
   npx prisma migrate deploy
   ```

---

### Step 2: Deploy Backend API (Railway / Render / AWS)
1. Link your GitHub repository and select the `/backend` directory as the root.
2. Set Environment Variables:
   * `PORT`: `5000`
   * `NODE_ENV`: `production`
   * `DATABASE_URL`: *(from Step 1)*
   * `JWT_ACCESS_SECRET`: *(generate a 32-byte hex key)*
   * `JWT_REFRESH_SECRET`: *(generate a 32-byte hex key)*
   * `FRONTEND_URL`: `https://your-frontend-domain.vercel.app`
   * `CLOUDINARY_CLOUD_NAME`: `your_cloud_name`
   * `CLOUDINARY_API_KEY`: `your_api_key`
   * `CLOUDINARY_API_SECRET`: `your_api_secret`
3. Build Command: `npm ci && npx prisma generate && npm run build`
4. Start Command: `npm start` (or `node dist/server.js`)
5. Your API will be live at `https://your-api.railway.app/api/v1/health`.

---

### Step 3: Deploy Frontend (Vercel)
1. Import repository on [Vercel](https://vercel.com) and select `/frontend` as the Root Directory.
2. Framework Preset: **Next.js**.
3. Set Environment Variables:
   * `NEXT_PUBLIC_API_URL`: `https://your-api.railway.app/api/v1`
   * `NEXT_PUBLIC_APP_URL`: `https://your-domain.com`
4. Click **Deploy**. Vercel will automatically compile the Next.js standalone build.

---

## 🐳 Option B: Self-Hosted Docker Compose (VPS / Single Server)

### 1. Configure Environment
Create `.env` at root using `docker-compose.prod.yml` specifications:
```env
POSTGRES_USER=zentstay_admin
POSTGRES_PASSWORD=your_ultra_secure_password_2026
POSTGRES_DB=zentstay_prod
JWT_ACCESS_SECRET=your_jwt_access_secret_2026
JWT_REFRESH_SECRET=your_jwt_refresh_secret_2026
FRONTEND_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-domain.com/api/v1
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 2. Launch All Containers
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

### 3. Run Production Database Migrations
```bash
docker exec -it zentstay_prod_backend npx prisma migrate deploy
```

---

## 🔒 Security Checklist
- [x] CORS restricted to `FRONTEND_URL` in production.
- [x] Standalone Next.js runner running as unprivileged `nextjs` user.
- [x] Backend running under unprivileged `node` user with `dumb-init` signal handling.
- [x] Images optimized via Next.js `remotePatterns` (Unsplash & Cloudinary).
- [x] AISHE dataset preserved across container restarts with persistent volume mounts.
