import { useTheme } from '@mui/material'
import { React, useEffect } from 'react'
import makePianoroll from '../hooks/usePianoroll';
import useEstimateInfo from '../hooks/useEstimateInfo';

const ShowPianoroll = () => {
    const theme = useTheme();
    const {ImgtoMidiart, resizeCanvasToDisplaySize, drawPianoGrid, drawPlayHead} = makePianoroll();
    const {slider, uploadedfile, canvas, setCanvas, context, setContext, setPlayheadctx, setH, setW, setcellHeight, setcellWidth} = useEstimateInfo();

    // コンポーネントの初期化完了後コンポーネント状態にコンテキストを登録

    useEffect(()=>{
        const Canvas = document.getElementById("canvas")
        setCanvas(Canvas)
        const canvasContext = Canvas.getContext("2d")
        setContext(canvasContext)
        const playheadContext = document.getElementById("playhead").getContext("2d")
        setPlayheadctx(playheadContext)
        
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
                ImgtoMidiart(img_Element) 
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
                ImgtoMidiart(img_Element) 
            }

            drawPlayHead(0);

        }
    },[slider])


    return (
        <div theme={theme}>
            <button id="button" className='button'></button>
            <div>
                <img id="img" alt='no img'></img>
                <canvas id="gray"></canvas>
                <canvas id="edge"></canvas> 
            </div>
            <div style={{position: "relative"}}>
                <canvas style={{position: "absolute"}} width="1280" height="720" id="canvas"></canvas>
                <canvas style={{position: "absolute"}} width="1280" height="720" id="playhead"></canvas>
            </div>
        </div>
    )
}

export default ShowPianoroll