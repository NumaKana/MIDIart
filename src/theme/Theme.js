import { blue, orange } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";


export const Theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#f8fcff",
        },
        secondary: {
            main: blue[900],
            sub: orange[500],
        },
        background: {
            default: "#f8fcff",
            planUnSelected: "#aaa",
        },
        text: {
            main: "#000",
            sub: "#fff",
            section: "#555",
        },
        line: {
            section: "#555",
        },
        footer: {
            main: "#FECDF4",
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            ::-webkit-scrollbar{
                width: 0.7vw;
                height: 1.5vh;
            },
            ::-webkit-scrollbar-thumb {
                background-color: ${blue[900]};
                border-radius: 10px;
            },
            ::-webkit-scrollbar-track {
                background-color: transparent;
            }
            `
        }
    }
})