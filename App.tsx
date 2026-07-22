/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { CustomThemeProvider } from "@/hooks";
import { Main } from "@/Main";
import { config } from "@/config";

if (config.nodeEnv !== "development") {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.info = () => {};
}

const App = () => {
  return (
    <CustomThemeProvider>
      <Main />
    </CustomThemeProvider>
  );
};

export default App;
