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
        key, setKey,
        id, setId,
        toggle, setToggle,
        drawerWidth,
        btn, setBtn,
        length_slider, setLengthSlider,
        notes, setNotes,
        music, setMusic,
        isPlaying, setIsPlaying
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

    const handleScaleChange = (value, num) => {
        let tmp = [...scale]
        tmp[num] = value
        setScale(tmp)
    }

    const handleKeyChange = (value, num) => {
        let tmp = [...key]
        tmp[num] = value
        setKey(tmp)
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
        key, setKey,
        handleChangeFile,
        handleSlider,
        handleScaleChange,
        handleKeyChange,
        handleToggle,
        id, setId,
        toggle, setToggle,
        drawerWidth,
        btn, setBtn,
        length_slider, setLengthSlider,
        handleLengthSlider,
        notes, setNotes,
        music, setMusic,
        isPlaying, setIsPlaying
    }
}

export default useEstimateInfo;