# RMUTL Timetable Management System
Currently this project is created to be use within Computer Engineering Faculty of RMUTL which may not meet up to your requirements. 

## Back-End Management System Features

| List | Add | Remove | Edit | View | Search | Filter | Note |
| - | - | - | - | - | - | - | - |
| Group | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | - |
| Instructor | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | - |
| Subject | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :warning: | TO BE ADDED | Search implemented name and code, all other field that will be add is in consideration. |
| Section | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | TO BE ADDED | TO BE ADDED | Section type can not be edit and must not be edit. Associated record will be updated automatically on some field to prevent data conflict. |
| Building | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | - |
| Group | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | - |
| Room | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :warning: | TO BE ADDED | Search implemented name. Search by building name will be added in the future. |
| Course | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | TO BE ADDED | :x: | - |
| Plan | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | TO BE ADDED | :x: | - |
| Timetable | TO BE ADDED | TO BE ADDED | TO BE ADDED | TO BE ADDED | TO BE ADDED | TO BE ADDED | - |
| Timetable Exam | TO BE ADDED | TO BE ADDED | TO BE ADDED | TO BE ADDED | TO BE ADDED | TO BE ADDED | - ||

## Additional Back-End Features
- Check overlapped period in timetable
- Check every period available to register in timetable

## Front-End Management System Features

### Timetable (Main)
- [x] Selectable period.
- [ ] Save data.
- [ ] Overlap detect.

### Timetable (Student)
- [ ] Show section data.
- [ ] Separate group.

### Timetable (Instructor)
- [ ] Individual instructor view.
- [ ] Add data to instructor without listing in student timetable.

### Timetable (Room)
- [ ] Show data on each day per room.

### Manage System Note
- [x] Room can be empty for external subject.
- [x] Instructor can be empty for external subject.
