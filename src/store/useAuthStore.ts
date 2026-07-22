/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import { create } from "zustand";

export type Role = "STAFF" | "HOD";

export interface UserProfile {
  email: string;
  name: string;
  role: Role;
  designation: string;
  department: string;
  staffId: string;
  phone: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: UserProfile | null;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  login: (email: string) => {
    const isHod = email.toLowerCase().includes("hod");
    const user: UserProfile = isHod
      ? {
          email: "hod@nec.edu.in",
          name: "Dr. S. Gomathi",
          role: "HOD",
          designation: "Head of Department (CSE)",
          department: "Computer Science & Engineering",
          staffId: "NEC-HOD-001",
          phone: "+91 98765 43210",
        }
      : {
          email: "staff@nec.edu.in",
          name: "R. Aravinth Raj",
          role: "STAFF",
          designation: "Assistant Professor",
          department: "Computer Science & Engineering",
          staffId: "NEC-STF-102",
          phone: "+91 98765 12345",
        };

    set({ isLoggedIn: true, user });
  },
  logout: () => {
    set({ isLoggedIn: false, user: null });
  },
}));
