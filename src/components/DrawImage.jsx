import {React, useState, useEffect} from 'react'
import { useTheme, Button, Typography, Box } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Slider from '@mui/material/Slider';
import useEstimateInfo from "../hooks/useEstimateInfo"
import usePianoroll from '../hooks/usePianoroll';
import useMove from '../hooks/useMove'

const DrawImage = () => {

    const theme = useTheme();
    const { 
        id, 
        setId, 
        canvas, 
        context, 
        handleChangeFile
     } = useEstimateInfo();
    const { ImgtoMidiart, resizeCanvasToDisplaySize, drawPianoGrid } = usePianoroll();
    const { 
        top, left, width, height,
        drawCvs,
        setDrawCvs, 
        setDrawCtx, 
        setDrawTempCvs,
        setDrawTempCtx,
        setPointerCvs,
        setPointerCtx,
        setInputType,
        brushSize, 
        setBrushSize,
        mode,
        inputType,
        mouseOut, 
        mouseDown, 
        mouseMove, 
        mouseUp, 
        handleMode
    } = useMove();



    useEffect(()=>{
        var newCvs = document.getElementById("drawCanvas");
        setDrawCvs(newCvs)
        var newCtx = newCvs.getContext("2d")
        setDrawCtx(newCtx)

        newCvs = document.getElementById("drawTempCanvas");
        setDrawTempCvs(newCvs)
        newCtx = newCvs.getContext("2d");
        setDrawTempCtx(newCtx)

        newCvs = document.getElementById("pointerCanvas");
        setPointerCvs(newCvs)
        newCtx = newCvs.getContext("2d");
        setPointerCtx(newCtx)

    }, [])

    // 描き込みタイプ変更時
    const handleInputType = (val) => {
        setInputType(val)
    }


    // 太さ変更時
    const handleSize = (num) => {
        setBrushSize(Number(num));
    }


    const Submit = () => {
        const testC = document.getElementById("draw");
        const testCtx = testC.getContext("2d")

        testCtx.clearRect(0,0,testC.width, testC.height)
        
        testCtx.drawImage(drawCvs, 0 , 0 , width, height, 0, 0, 96, 48)

        resizeCanvasToDisplaySize(canvas); 
        drawPianoGrid(context);

        setId("draw")
        handleChangeFile("")
        ImgtoMidiart("draw", 96, 48)
    }

    return (
        <Box sx={{height: String(20 + height +top) + "px", width: String(100 + width +left) + "px", flexGrow: 1, p: 3, margin: "0 0 0 auto"}}>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    row
                    onChange={e => handleMode(e.target.value)}
                    value={mode}
                    sx={{margin: "0 20px"}}
                >
                    <FormControlLabel value="1" control={<Radio/>} label="ペン" />
                    <FormControlLabel value="2" control={<Radio/>} label="消しゴム" />
                </RadioGroup>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    row
                    onChange={e => handleInputType(e.target.value)}
                    value={inputType}
                    sx={{margin: "0 20px"}}
                >
                    <FormControlLabel value="1" control={<Radio />} label="ペン" />
                    <FormControlLabel value="2" control={<Radio />} label="直線" />
                    <FormControlLabel value="3" control={<Radio />} label="四角" />
                    <FormControlLabel value="4" control={<Radio />} label="円" />
                </RadioGroup>
            </FormControl>
            <Box width="200px" margin="20px">
                <Typography>ブラシサイズ</Typography>
                <Slider 
                    value={brushSize}
                    defaultValue={0}
                    min={10}
                    step={0.1}
                    max={100} 
                    aria-label="BrushSlider"
                    onChange={(e) => handleSize(e.target.value)} 
                />
            </Box>
            <Button sx={{margin: "0 20px"}} variant='outlined' onClick={Submit}>MIDIアートにする</Button>
            <canvas id="drawCanvas" 
                style={{
                    top: top,
                    left: left, 
                    margin: "auto", 
                    position: "absolute",
                    border: "solid 1px",
                }}
                width={width}
                height={height}></canvas>
            <canvas id="drawTempCanvas"
                style={{
                    top: top,
                    left: left, 
                    margin: "auto", 
                    position: "absolute",
                }}
                width={width}
                height={height}
                ></canvas>
            <canvas id="pointerCanvas"
                style={{
                    top: top,
                    left: left, 
                    margin: "auto", 
                    position: "absolute",
                }}
                width={width}
                height={height}
                onMouseDown={e => mouseDown(e, "img")}
                onMouseUp={e => mouseUp(e, "img")}
                onMouseMove={e => mouseMove(e, "img")}
                onMouseOut={e => mouseOut(e, "img")}></canvas>
        </Box>
    )
}




export default DrawImage