-- DropForeignKey
ALTER TABLE `SubjectOnCourse` DROP FOREIGN KEY `SubjectOnCourse_courseId_fkey`;

-- AddForeignKey
ALTER TABLE `SubjectOnCourse` ADD CONSTRAINT `SubjectOnCourse_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
