import { useContext } from 'react';
import { FormContext } from '../provider/Provider';

const useEstimateInfo = () => {
    const {
        uploadedfile, setUploadedfile,
        slider, setSlider,
        canvas, setCanvas,
        context, setContext,
        playheadctx, setPlayheadctx,
        w, setW,
        h, setH,
        cellheight, setcellHeight,
        cellwidth, setcellWidth,
    } = useContext(FormContext);

    const handleChangeFile = ({file}) => {
        setUploadedfile(file);
    }

    const handleSlider = (num) => {
        setSlider(num)
    }

    return {
        uploadedfile, setUploadedfile,
        slider, setSlider,
        canvas, setCanvas,
        context, setContext,
        playheadctx, setPlayheadctx,
        w, setW,
        h, setH,
        cellheight, setcellHeight,
        cellwidth, setcellWidth,
        handleChangeFile,
        handleSlider
    }
}

export default useEstimateInfo;