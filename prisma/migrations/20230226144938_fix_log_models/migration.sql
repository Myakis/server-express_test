/*
  Warnings:

  - You are about to drop the column `userId` on the `Exercise_log` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise_log" DROP CONSTRAINT "Exercise_log_userId_fkey";

-- AlterTable
ALTER TABLE "Exercise_log" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Exercise_log" ADD CONSTRAINT "Exercise_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
