/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query GetProfile {
    getProfile {
      staffId
      userId
      name
      email
      mobileNumber
      rollNumber
      dob
      profileImage
      designation
      department
      gender
    }
  }
`;
