import React from 'react'
import { useTheme, Button, Typography, Box } from '@mui/material'
import useEstimateInfo from "../hooks/useEstimateInfo"


const FileInput = () => {

    const theme = useTheme();
    const { uploadedfile, handleChangeFile, drawerWidth } = useEstimateInfo();

    return (
        <Box sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, margin: "0 0 0 auto" }}>
        <label htmlFor="upload-button-file" theme={theme}>
            <input
                accept="image/*"
                className="FileUpload"
                id="upload-button-file"
                name="FileUpload"
                multiple
                type="file"
                onChange={(e) => handleChangeFile({file:e.target.files[0]})}
                style={{display: "none"}}
            />
            <Button variant="outlined" component="span">
                Upload File
            </Button>
        </label>
        {uploadedfile === "" &&
            <Typography>画像ファイルをアップロードしてください</Typography>
        }
        {uploadedfile !== "" &&
            <Box>
                <Typography>{uploadedfile.value}</Typography>
            </Box>
        }
        <img id="img" alt='no img'></img>
        </Box>
    )
}




export default FileInput