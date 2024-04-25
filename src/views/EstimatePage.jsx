import React from 'react'
import { useTheme, Box } from '@mui/material'
import ShowSlider from '../components/ShowSlider';
import ShowPianoroll from '../components/ShowPianoroll';
import FileInput from '../components/FileInput';


const EstimatePage = () => {

    const theme = useTheme();

    return (
        <Box theme={theme} padding="30px">
        <FileInput />
        <ShowPianoroll />
        <ShowSlider />
        </Box>
    )
}

export default EstimatePage