/*
  Warnings:

  - You are about to drop the column `location` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "achievements" JSONB,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "contactNumber" TEXT,
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "projects" JSONB,
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "location",
ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
