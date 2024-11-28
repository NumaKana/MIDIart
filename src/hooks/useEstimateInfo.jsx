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
        isPlaying, setIsPlaying,
        bpm, setBpm
    } = useContext(FormContext);

    const handleChangeFile = ({file}) => {
        if(file){
            setUploadedfile(file);
        }else{
            setUploadedfile("")
        }
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
        setToggle(n)
    }

    const handleBpm = (n) => {
        setBpm(n)
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
        isPlaying, setIsPlaying,
        bpm, setBpm,
        handleBpm,
    }
}

export default useEstimateInfo;