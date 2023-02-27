/*
  Warnings:

  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exercise_log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exercise_time` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workout_log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExerciseToWorkout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_exercise_log_id_fkey";

-- DropForeignKey
ALTER TABLE "Exercise_log" DROP CONSTRAINT "Exercise_log_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Exercise_log" DROP CONSTRAINT "Exercise_log_workout_log_id_fkey";

-- DropForeignKey
ALTER TABLE "Exercise_time" DROP CONSTRAINT "Exercise_time_exercise_log_id_fkey";

-- DropForeignKey
ALTER TABLE "Workout_log" DROP CONSTRAINT "Workout_log_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Workout_log" DROP CONSTRAINT "Workout_log_workout_id_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToWorkout" DROP CONSTRAINT "_ExerciseToWorkout_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToWorkout" DROP CONSTRAINT "_ExerciseToWorkout_B_fkey";

-- DropTable
DROP TABLE "Exercise";

-- DropTable
DROP TABLE "Exercise_log";

-- DropTable
DROP TABLE "Exercise_time";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Workout";

-- DropTable
DROP TABLE "Workout_log";

-- DropTable
DROP TABLE "_ExerciseToWorkout";
