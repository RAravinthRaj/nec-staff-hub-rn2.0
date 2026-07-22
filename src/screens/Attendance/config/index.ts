import { NoDataFound } from "@/components";

/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
export const ATTENDANCE_CONFIG = {
  attendance: "Attendance",
  saveButton: "Save",
  statsDetails: [
    {
      image: "totalStudents",
      description: "Total Students",
      color: "secondary",
    },
    {
      image: "present",
      description: "Present",
      color: "badgeGreen",
    },
    {
      image: "absent",
      description: "Absent",
      color: "red",
    },
    {
      image: "onDuty",
      description: "On - Duty",
      color: "orange",
    },
  ],
  roll: "Roll",
  number: "Number",
  name: "Name",
  status: "Status",
  markAllPresent: "Mark All Present",
  markAllAbsent: "Mark All Absent",
  modalTitle: "Attendance Actions",
  modalSubTitle: "Apply to all students",
  NoDataFound: "No Data Found",
  retry: "Retry",
  saveTitle: "Save Attendance",
  saveSubtitle: "Are you sure you want to save the attendance?",
  cancel: "Cancel",
  confirm: "Yes, Save",
  color: {
    present: "badgeGreen",
    absent: "red",
    onDuty: "orange",
  },
};
