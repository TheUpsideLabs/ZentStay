-- CreateEnum
CREATE TYPE "RentPeriod" AS ENUM ('MONTHLY', 'YEARLY');

-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "rentPeriod" "RentPeriod" NOT NULL DEFAULT 'MONTHLY';
