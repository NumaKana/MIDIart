import { useState } from 'react'
import { useContext } from 'react';
import { FormContext } from '../provider/Provider';
import useEstimateInfo from "./useEstimateInfo";
import usePianoroll from './usePianoroll';

const useMove = () => {
    const {
        top, left, width, height,
        drawCvs, setDrawCvs,
        drawCtx, setDrawCtx,
        drawTempCvs, setDrawTempCvs,
        drawTempCtx, setDrawTempCtx,
        pointerCvs, setPointerCvs,
        pointerCtx, setPointerCtx,
        mode,setMode,
        startX, setStartX,
        startY, setStartY,
        inputType, setInputType,
        brushSize, setBrushSize,
        cellheight, cellwidth
    } = useContext(FormContext);

    const { notes, canvas, context } = useEstimateInfo();

    const { drawNote } = usePianoroll();


    // クリックホールドフラグ
    const [holdClick, setHoldClick] = useState(false);

    // 色
    var canvasRgba = "rgba(0,0,0,1)"

    const handleMode = (val) => {
        setMode(val)
    }

    const mouseOut = (e, area) => {
        if(area === "img"){
            pointerCtx.clearRect(0, 0, drawCvs.width, drawCvs.height)
            // マウスクリック外しイベントを呼び出し
            if (holdClick) {
                mouseUp(e, area);
            }
        }
    }

    // マウスクリックイベント
    const mouseDown = (e, area) => {
        setHoldClick(true);
        if(area === "img"){
            // クリック開始座標を保持
            const rect = pointerCvs.getBoundingClientRect();
            setStartX(e.clientX - rect.left);
            setStartY(e.clientY - rect.top);
        }else if(area === "note"){
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            let highlight = null
            notes.forEach((note) => {
                context.beginPath();
                context.fillStyle = "rgb(128,128,128)";
                if(x >= note.start && x < note.end && y >= note.y && y < note.y + cellheight){
                    highlight = note
                }else{
                    drawNote(context, note.note, note.note_start, note.note_end, false)
                }
            })
            if(highlight){
                drawNote(context, highlight.note, highlight.note_start, highlight.note_end, true)
            }
        }
    }

    // マウス移動イベント
    const mouseMove = (e, area) => {
        if(area === "img"){
            if (mode === "1") { // モード：描く

                if (inputType === "1" || inputType === "2") { // 描き込みタイプ：ペン or 直線
                    pointer(e);
                }

                if (holdClick) {
                    if (inputType === "1") { // 描き込みタイプ：ペン
                        drawPen(e);
                    } else if (inputType === "2") { // 描き込みタイプ：直線
                        drawLine(e);
                    } else if (inputType === "3") { // 描き込みタイプ：短径
                        drawRect(e);
                    } else if (inputType === "4") { // 描き込みタイプ：円
                        drawArc(e);
                    }
                }

            } else if (mode === "2") { // モード：消しゴム

                pointer(e);

                if (holdClick) {
                    drawErase(e);
                }
            }
        }
    }

    // マウスクリック外しイベント
    const mouseUp = (e, area) => {

        setHoldClick(false);

        if(area === "img"){
            if (mode === "1") { // モード：描く
                if (inputType === "1") { // 描き込みタイプ：ペン
                    drawPen(e);
                } else if (inputType === "2") { // 描き込みタイプ：直線
                    drawLine(e, false);
                } else if (inputType === "3") { // 描き込みタイプ：短径
                    drawRect(e, false);
                } else if (inputType === "4") { // 描き込みタイプ：円
                    drawArc(e, false);
                }
            } else if (mode === "2") { // モード：消しゴム
                drawErase(e);
            }
        }
    }

    // drawCanvasエリア描画(ペン)
    function drawPen(e) {

        const rect = pointerCvs.getBoundingClientRect();
        drawCtx.lineWidth = brushSize;
        drawCtx.strokeStyle = "rgba(0, 0, 0, 1)";;
        drawCtx.lineJoin = "round";
        drawCtx.lineCap = "round";
        drawCtx.globalCompositeOperation = 'source-over';
        drawCtx.beginPath();
        drawCtx.moveTo(startX, startY); // 開始座標（前回座標）
        drawCtx.lineTo(e.clientX - rect.left, e.clientY - rect.top); // 終了座標（現在座標）
        drawCtx.stroke(); // 直線を描画
        drawCtx.closePath();

        // 次の描画に向けて現在の座標を保持（開始・終了を同じ座標で描画すると、マウスを高速に移動したときに歯抜け状態になる）
        setStartX(e.clientX - rect.left);
        setStartY(e.clientY - rect.top);
    }

    // drawCanvasエリア描画(直線)
    const drawLine = (e, hold=true) => {

        // 一時的描画Canvasクリア
        drawTempCtx.clearRect(0, 0, drawCvs.width, drawCvs.height)

        let targateCtx = ""
        if (hold) {
            // クリックホールド中は一時的描画Canvasに対して描画
            targateCtx = drawTempCtx;
        } else {
            targateCtx = drawCtx;
        }

        const rect = pointerCvs.getBoundingClientRect();
        targateCtx.lineWidth = brushSize;
        targateCtx.strokeStyle = canvasRgba;
        targateCtx.lineCap = "round"; // 先端の形状
        targateCtx.globalCompositeOperation = 'source-over';
        targateCtx.beginPath();
        targateCtx.moveTo(startX, startY); // 開始座標（クリック開始座標）
        targateCtx.lineTo(e.clientX - rect.left, e.clientY - rect.top); // 終了座標（現在座標）
        targateCtx.stroke(); // 直線を描画
        targateCtx.closePath();
    }

    // drawCanvasエリア描画(短径)
    const drawRect = (e, hold=true) => {

        // 一時的描画Canvasクリア
        drawTempCtx.clearRect(0, 0, drawCvs.width, drawCvs.height)

        let targateCtx

        if (hold) {
            // クリックホールド中は一時的描画Canvasに対して描画
            targateCtx = drawTempCtx;
        } else {
            targateCtx = drawCtx;
        }

        targateCtx.lineWidth = brushSize;
        targateCtx.fillStyle = canvasRgba;
        targateCtx.globalCompositeOperation = 'source-over';

        const rect = pointerCvs.getBoundingClientRect();

        targateCtx.beginPath();
        // クリック開始座標～現在座標で短径を描画
        targateCtx.strokeRect(startX, startY, e.clientX - rect.left - startX, e.clientY - rect.top - startY);
        targateCtx.closePath();
        // targateCtx.stroke();
    }

    // drawCanvasエリア描画(円)
    const drawArc = (e, hold=true) => {

        // 一時的描画Canvasクリア
        drawTempCtx.clearRect(0, 0, drawCvs.width, drawCvs.height)

        let targateCtx = ""

        if (hold) {
            // クリックホールド中は一時的描画Canvasに対して描画
            targateCtx = drawTempCtx;
        } else {
            targateCtx = drawCtx;
        }

        targateCtx.lineWidth = brushSize;
        targateCtx.fillStyle = canvasRgba;
        targateCtx.globalCompositeOperation = 'source-over';

        const rect = pointerCvs.getBoundingClientRect();

        var centerX = Math.max(startX, e.clientX - rect.left) - Math.abs(startX - (e.clientX - rect.left)) / 2;
        var centerY = Math.max(startY, e.clientY - rect.top) - Math.abs(startY - (e.clientY - rect.top)) / 2;
        var distance = Math.sqrt(Math.pow(startX - (e.clientX - rect.left), 2) + Math.pow(startY - (e.clientY - rect.top), 2));

        targateCtx.beginPath();
        // クリック開始座標～現在座標の中間を中心点として円を描画
        targateCtx.arc(centerX, centerY, distance / 2, 0, Math.PI * 2, true);
        // targateCtx.fill();
        // targateCtx.closePath();
        targateCtx.stroke();
        targateCtx.closePath(); 
    }

    // drawCanvasエリア描画(消しゴム)
    const drawErase = (e) => {

        const rect = pointerCvs.getBoundingClientRect();

        drawCtx.lineWidth = brushSize;
        drawCtx.lineCap = "round"; // 先端の形状
        drawCtx.strokeStyle = canvasRgba; // 色はなんでもよいが、透過度は1にする
        drawCtx.globalCompositeOperation = 'destination-out' // 塗りつぶした個所を透明化
        drawCtx.beginPath();
        drawCtx.moveTo(startX, startY); // 開始座標（前回座標）
        drawCtx.lineTo(e.clientX - rect.left, e.clientY - rect.top); // 終了座標（現在座標）
        drawCtx.stroke(); // 描画
        drawCtx.closePath();

        // 次の描画に向けて現在の座標を保持（開始座標・終了座標を同じ座標にしてしまうと、マウスを高速に移動したときに歯抜け状態になる）
        setStartX(e.clientX - rect.left);
        setStartY(e.clientY - rect.top);
    }

    // pointerCanvasエリア描画
    const pointer = (e) => {

        // 事前のポインタ描画を除去
        pointerCtx.clearRect(0, 0, drawCvs.width, drawCvs.height)

        if (mode === "2") {
            // モード：消しゴムのときは白固定
            pointerCtx.strokeStyle = "rgba(255, 255, 255, 1)";
        } else {
            pointerCtx.strokeStyle = canvasRgba; // 事前に設定していた色
        }

        pointerCtx.lineWidth = brushSize; // 太さ
        pointerCtx.lineCap = "round"; // 円

        const rect = pointerCvs.getBoundingClientRect();

        pointerCtx.beginPath();
        pointerCtx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        pointerCtx.lineTo(e.clientX - rect.left, e.clientY - rect.top); // 開始座標と終了座標を同じ
        pointerCtx.stroke(); // 描画
        pointerCtx.closePath();
    }

    return {
        top, left, width, height,
        drawCvs, setDrawCvs,
        drawCtx, setDrawCtx,
        drawTempCvs, setDrawTempCvs,
        drawTempCtx, setDrawTempCtx,
        pointerCvs, setPointerCvs,
        pointerCtx, setPointerCtx,
        mode,setMode,
        startX, setStartX,
        startY, setStartY,
        inputType, setInputType,
        brushSize, setBrushSize,
        handleMode,
        mouseOut,
        mouseDown,
        mouseMove,
        mouseUp
    }

}

export default useMove;