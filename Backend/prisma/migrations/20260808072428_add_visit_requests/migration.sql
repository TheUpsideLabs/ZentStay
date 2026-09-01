-- CreateEnum
CREATE TYPE "VisitStatus" AS ENUM ('PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED', 'COMPLETED');

-- CreateTable
CREATE TABLE "visit_requests" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "visitDate" TIMESTAMP(3) NOT NULL,
    "message" TEXT,
    "status" "VisitStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visit_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "visit_requests_studentId_idx" ON "visit_requests"("studentId");

-- CreateIndex
CREATE INDEX "visit_requests_propertyId_idx" ON "visit_requests"("propertyId");

-- CreateIndex
CREATE INDEX "visit_requests_status_idx" ON "visit_requests"("status");

-- AddForeignKey
ALTER TABLE "visit_requests" ADD CONSTRAINT "visit_requests_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit_requests" ADD CONSTRAINT "visit_requests_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
