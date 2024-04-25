import Slider from '@mui/material/Slider';
import { Box } from '@mui/material';
import useEstimateInfo from '../hooks/useEstimateInfo';

const ShowSlider = () => {
    const { slider, handleSlider } = useEstimateInfo()
    return (
        <Box width="200px">
        <Slider 
            value={slider}
            defaultValue={0}
            min={0}
            step={0.01}
            max={1} 
            aria-label="FUSIGIslider"
            onChange={(e) => handleSlider(e.target.value)} />
        </Box>
    )
}

export default ShowSlider;