/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

export type UserRole = "STAFF" | "HOD" | "HR" | "OA";

export const getRoleFromEmail = (email: string): UserRole => {
  if (!email) return "STAFF";

  const [localPart, domain] = email.toLowerCase().split("@");
  if (domain !== "nec.edu.in") {
    return "STAFF";
  }

  switch (localPart) {
    case "hod":
      return "HOD";
    case "hr":
      return "HR";
    case "oa":
      return "OA";
    default:
      return "STAFF";
  }
};
