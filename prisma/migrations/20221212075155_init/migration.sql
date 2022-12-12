-- CreateTable
CREATE TABLE `Group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Instructor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('lecture', 'lab', 'both') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `credit` INTEGER NOT NULL,
    `lecture` INTEGER NOT NULL,
    `lab` INTEGER NOT NULL,
    `exam` INTEGER NOT NULL,
    `type` ENUM('compulsory', 'elective') NOT NULL,
    `category` ENUM('internal', 'external') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Section` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('lecture', 'lab') NOT NULL,
    `no` INTEGER NOT NULL,
    `lab` INTEGER NULL,
    `subjectId` INTEGER NOT NULL,
    `roomId` INTEGER NULL,
    `groupId` INTEGER NULL,
    `parentId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InstructorOnSection` (
    `sectionId` INTEGER NOT NULL,
    `instructorId` INTEGER NOT NULL,

    PRIMARY KEY (`sectionId`, `instructorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Timetable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `weekday` VARCHAR(191) NOT NULL,
    `start` INTEGER NOT NULL,
    `end` INTEGER NOT NULL,
    `sectionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TimetableExam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `weekday` VARCHAR(191) NOT NULL,
    `start` INTEGER NOT NULL,
    `end` INTEGER NOT NULL,
    `sectionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Section`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InstructorOnSection` ADD CONSTRAINT `InstructorOnSection_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `Section`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InstructorOnSection` ADD CONSTRAINT `InstructorOnSection_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `Instructor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Timetable` ADD CONSTRAINT `Timetable_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `Section`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TimetableExam` ADD CONSTRAINT `TimetableExam_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `Section`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
