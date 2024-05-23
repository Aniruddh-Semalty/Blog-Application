/*
  Warnings:

  - You are about to drop the `_DislikedPosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LikedPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DislikedPosts" DROP CONSTRAINT "_DislikedPosts_A_fkey";

-- DropForeignKey
ALTER TABLE "_DislikedPosts" DROP CONSTRAINT "_DislikedPosts_B_fkey";

-- DropForeignKey
ALTER TABLE "_LikedPosts" DROP CONSTRAINT "_LikedPosts_A_fkey";

-- DropForeignKey
ALTER TABLE "_LikedPosts" DROP CONSTRAINT "_LikedPosts_B_fkey";

-- DropTable
DROP TABLE "_DislikedPosts";

-- DropTable
DROP TABLE "_LikedPosts";

-- CreateTable
CREATE TABLE "LikedPost" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "LikedPost_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateTable
CREATE TABLE "DislikedPost" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "DislikedPost_pkey" PRIMARY KEY ("userId","postId")
);

-- AddForeignKey
ALTER TABLE "LikedPost" ADD CONSTRAINT "LikedPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedPost" ADD CONSTRAINT "LikedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DislikedPost" ADD CONSTRAINT "DislikedPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DislikedPost" ADD CONSTRAINT "DislikedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
