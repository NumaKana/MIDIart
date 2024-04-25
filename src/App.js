import { Box } from "@mui/material";
import { Theme } from "./theme/Theme";
import { FormProvider } from "./provider/Provider";
import EstimatePage from "./views/EstimatePage";


function App() {
  return (
    <>
      <FormProvider>
        <Box>
          <EstimatePage />
        </Box>
      </FormProvider>
    </>
  );
}

export default App;