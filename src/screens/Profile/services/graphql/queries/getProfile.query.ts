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
      created_at
      date_of_birth
      department {
        updated_at
        name
        id
        created_at
        abbreviation
      }
      designation
      email
      gender
      id
      name
      phone_no
      profile_image
      roll_no
      updated_at
      user_id
    }
  }
`;
