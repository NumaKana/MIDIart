import { Box, useTheme } from '@mui/material'
import { React, useEffect } from 'react'
import Button from '@mui/material/Button';

import makePianoroll from '../hooks/usePianoroll';
import useEstimateInfo from '../hooks/useEstimateInfo';
import useMove from '../hooks/useMove';

const ShowPianoroll = () => {
    const theme = useTheme();
    const {
        ImgtoMidiart, 
        resizeCanvasToDisplaySize, 
        drawPianoGrid, 
        drawPlayHead, 
        ImgtoGray
    } = makePianoroll();
    const {
        slider, 
        scale,
        key,
        uploadedfile, 
        canvas, setCanvas, 
        context,setContext, 
        setPlayheadctx, 
        setH, 
        setW, 
        setcellHeight, 
        setcellWidth, 
        id, setId,
        drawerWidth,
        btn,
        length_slider
    } = useEstimateInfo();

    const {
        mouseDown,
        mouseMove,
        mouseOut,
        mouseUp
    } = useMove();

    // コンポーネントの初期化完了後コンポーネント状態にコンテキストを登録

    useEffect(()=>{
        const Canvas = document.getElementById("canvas")
        setCanvas(Canvas)
        const canvasContext = Canvas.getContext("2d")
        setContext(canvasContext)
        const playheadContext = document.getElementById("playhead").getContext("2d")
        setPlayheadctx(playheadContext)
        
        if(context){
            setH(canvas.scrollHeight)
            setW(canvas.scrollWidth)
            setcellHeight(canvas.scrollHeight / 48)
            setcellWidth(canvas.scrollWidth / 24)

            resizeCanvasToDisplaySize(canvas); 
            drawPianoGrid(context);
        }
    },[])

    useEffect(() => {
        if(context){
            setH(canvas.scrollHeight)
            setW(canvas.scrollWidth)
            setcellHeight(canvas.scrollHeight / 48)
            setcellWidth(canvas.scrollWidth / 24)

            resizeCanvasToDisplaySize(canvas); 
            drawPianoGrid(context);
        }
    },[context])

    useEffect(()=>{
        if(uploadedfile){
            resizeCanvasToDisplaySize(canvas); 
            drawPianoGrid(context);
            
            let img_Element = document.getElementById("img")
            img_Element.src = URL.createObjectURL(uploadedfile)

            img_Element.onload = () => {
                setId("edge")
                const arr = ImgtoGray(img_Element)
                ImgtoMidiart("edge",arr[0], arr[1])  
            }

            drawPlayHead(0);

        }
    },[uploadedfile])

    useEffect(()=>{
        if(uploadedfile){
            resizeCanvasToDisplaySize(canvas); 
            drawPianoGrid(context);
            
            let img_Element = document.getElementById("img")
            img_Element.src = URL.createObjectURL(uploadedfile)

            img_Element.onload = () => {
                const arr = ImgtoGray(img_Element)
                ImgtoMidiart("edge", arr[0], arr[1])  
            }

            drawPlayHead(0);

        }else if(id === "draw"){
            resizeCanvasToDisplaySize(canvas); 
            drawPianoGrid(context);
            ImgtoMidiart("draw", 96, 48) 
        }
    },[slider, length_slider, scale[0], key])

    return (
        <Box theme={theme} sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, margin: "0 0 0 auto" }}>
            <Button variant='outlined' id="button" className='button'>{btn}</Button>
            <div style={{position: "relative"}}>
                <canvas 
                    style={{position: "absolute"}} 
                    width="1280" 
                    height="720" 
                    id="canvas"
                ></canvas>
                <canvas 
                    style={{position: "absolute"}} 
                    width="1280" 
                    height="720" 
                    id="playhead"
                    onMouseDown={e => mouseDown(e, "note")}
                    onMouseUp={e => mouseUp(e, "note")}
                    onMouseMove={e => mouseMove(e, "note")}
                    onMouseOut={e => mouseOut(e, "note")}
                ></canvas>
            </div>
            <div>
                <canvas id="gray"></canvas>
                <canvas id="edge"></canvas> 
                <canvas id="draw"></canvas>
            </div>
        </Box>
    )
}

export default ShowPianoroll