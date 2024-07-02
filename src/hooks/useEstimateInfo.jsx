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
        scale, setScale,
        id, setId,
        toggle, setToggle,
        drawerWidth,
        btn, setBtn,
        length_slider, setLengthSlider,
        notes, setNotes
    } = useContext(FormContext);

    const handleChangeFile = ({file}) => {
        setUploadedfile(file);
    }

    const handleSlider = (num) => {
        setSlider(num)
    }

    const handleLengthSlider = (num) => {
        setLengthSlider(num)
    }

    const handleScaleChange = (value) => {
        setScale(value)
    }

    const handleToggle = (val, n) => {
        console.log(n)
        setToggle(n)
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
        scale, setScale,
        handleChangeFile,
        handleSlider,
        handleScaleChange,
        handleToggle,
        id, setId,
        toggle, setToggle,
        drawerWidth,
        btn, setBtn,
        length_slider, setLengthSlider,
        handleLengthSlider,
        notes, setNotes
    }
}

export default useEstimateInfo;