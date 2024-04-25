import React from 'react'
import { useTheme, Button, Typography } from '@mui/material'
import useEstimateInfo from "../hooks/useEstimateInfo"


const FileInput = () => {

    const theme = useTheme();
    const { uploadedfile, handleChangeFile } = useEstimateInfo();

    return (
        <>
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
            <Button variant="contained" component="span">
                Upload File
            </Button>
        </label>
        {uploadedfile === "" &&
            <Typography>画像ファイルをアップロードしてください</Typography>
        }
        {uploadedfile !== "" &&
            <Typography>{uploadedfile.value}</Typography>
        }
        </>
    )
}




export default FileInput