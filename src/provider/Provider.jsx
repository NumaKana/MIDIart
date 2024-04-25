import { createContext, useState } from 'react';

export const FormContext = createContext(null);

export const FormProvider = ({ children }) => {

    const [uploadedfile, setUploadedfile] = useState("");
    const [slider, setSlider] = useState(0)
    const [canvas, setCanvas] = useState(null)
    const [context, setContext] = useState(null)
    const [w, setW] = useState(0)
    const [h, setH] = useState(0)
    const [cellheight, setcellHeight] = useState(0)
    const [cellwidth, setcellWidth] = useState(0)
    const [playheadctx, setPlayheadctx] = useState(null)

    const contextValue = {
        uploadedfile, setUploadedfile,
        slider, setSlider,
        canvas, setCanvas,
        playheadctx, setPlayheadctx,
        context, setContext,
        w, setW,
        h, setH,
        cellheight, setcellHeight,
        cellwidth, setcellWidth
    };

    return (
        <FormContext.Provider value={contextValue}>
            {children}
        </FormContext.Provider>
    );
};