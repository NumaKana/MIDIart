import { createContext, useState } from 'react';

export const FormContext = createContext(null);

export const FormProvider = ({ children }) => {

    const [uploadedfile, setUploadedfile] = useState("");
    const [slider, setSlider] = useState(0);
    const [length_slider, setLengthSlider] = useState(0);
    const [scale, setScale] = useState("Cmajor");
    const [canvas, setCanvas] = useState(null);
    const [context, setContext] = useState(null);
    const [w, setW] = useState(0);
    const [h, setH] = useState(0);
    const [cellheight, setcellHeight] = useState(0);
    const [cellwidth, setcellWidth] = useState(0);
    const [playheadctx, setPlayheadctx] = useState(null);
    const [id, setId] = useState("edge");
    const [toggle, setToggle] = useState("upload");
    const [btn, setBtn] = useState("...loading")
    const [notes, setNotes] = useState([])

    // 各種canvasオブジェクト
    const [drawCvs, setDrawCvs] = useState(null)
    const [drawCtx, setDrawCtx] = useState(null)
    const [drawTempCvs, setDrawTempCvs] = useState(null)
    const [drawTempCtx, setDrawTempCtx] = useState(null)
    const [pointerCvs, setPointerCvs] = useState(null)
    const [pointerCtx, setPointerCtx] = useState(null)

    // モード（描く/消しゴム/画像移動）
    const [mode,setMode] = useState("1");

    // 開始座標(X)
    const [startX, setStartX] = useState(0);
    // 開始座標(Y)
    const [startY, setStartY] = useState(0);

    // 描き込みタイプ（ペン/直線/短径/円）
    const [inputType, setInputType] = useState("1");

    // 太さ
    const [brushSize, setBrushSize] = useState(10);

    const drawerWidth = 280;

    const top = 250
    const left = 300
    const width = 600
    const height = 300

    const contextValue = {
        uploadedfile, setUploadedfile,
        slider, setSlider,
        canvas, setCanvas,
        playheadctx, setPlayheadctx,
        context, setContext,
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
        top, left, width, height, 
        notes, setNotes
    };

    return (
        <FormContext.Provider value={contextValue}>
            {children}
        </FormContext.Provider>
    );
};