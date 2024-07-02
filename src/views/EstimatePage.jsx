import React from 'react'
import { useTheme, Box } from '@mui/material'
import ShowPianoroll from '../components/ShowPianoroll';
import FileInput from '../components/FileInput';
import DrawImage from '../components/DrawImage';
import Sidebar from '../components/Sidebar';
import useEstimateInfo from '../hooks/useEstimateInfo';


const EstimatePage = () => {

    const theme = useTheme();
    const {toggle} = useEstimateInfo();

    return (
        <Box theme={theme} margin="0 50px">
            <Sidebar />
            {toggle === "draw" ? <DrawImage /> : <FileInput />}
            <ShowPianoroll />
        </Box>
    )
}

export default EstimatePage