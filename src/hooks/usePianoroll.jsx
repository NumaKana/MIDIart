import useEstimateInfo from "./useEstimateInfo";

const usePianoroll = () => {
    const { slider, context, playheadctx, cellheight, cellwidth, h, w } = useEstimateInfo();
    let head_x = 0
    let dx = 2
    let timer = ""

    const drawNote = (ctx, note, start, end, selected=true) => {
        let x=start*cellwidth;
        let y=(note)*cellheight;
        ctx.beginPath();
        ctx.fillStyle = "rgb(128,128,128)";
        if(selected){
            ctx.strokeStyle = "rgb(255,255,255)";
        }else{
            ctx.strokeStyle = "rgb(24,24,24)";
        }
        ctx.rect(x, y, cellwidth*(end-start), cellheight);
        ctx.fill()
        ctx.stroke();
    }
    
    const drawPlayHead = (x) => {
        playheadctx.beginPath();    
        playheadctx.moveTo(x,0);
        playheadctx.lineWidth = 2;      
        playheadctx.strokeStyle = "red";
        playheadctx.lineTo(x,h);
        playheadctx.shadowBlur=0;
        playheadctx.stroke();
    }

    const movePlayHead = () => {
        if(playheadctx){
            playheadctx.beginPath();    
            playheadctx.clearRect(0, 0, head_x, h)
            playheadctx.beginPath();    
            playheadctx.moveTo(head_x,0);
            playheadctx.lineWidth = 2;      
            playheadctx.strokeStyle = "red";
            playheadctx.lineTo(head_x,h);
            playheadctx.shadowBlur=0;
            playheadctx.stroke();
            head_x += dx;
        }
    }

    const move = () => {
        if(!timer){
            timer = setInterval(movePlayHead, 10);
        }else{
            clearInterval(timer)
            timer = ""
            head_x = 0
            playheadctx.clearRect(0, 0, w, h)
        }
    }
    
    const drawPianoGrid = (context) => {
        for(let y=0;y<w;y=y+cellheight){
            for(let x=0;x<w;x=x+cellwidth){
            if(x % 8 === 0){
                context.beginPath();    
                context.moveTo(x,0);
                context.strokeStyle = "black";
                context.lineTo(x,h);
                context.shadowBlur=0;
                context.stroke();
            }
            context.beginPath();
            if(y % 7){
                context.fillStyle = "rgb(32,32,32)";
            }else{
                context.fillStyle = "rgb(40,40,40)";
            }
            context.strokeStyle = "rgb(24,24,24)";
            context.rect(x, y, cellwidth, cellheight);
            context.fill()
            context.stroke();
            }
        }
    }
    
    const resizeCanvasToDisplaySize = (canvas) => {
        // look up the size the canvas is being displayed
        var width = canvas.clientWidth;
        var height = canvas.clientHeight;
    
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            return true;
        }
    
        return false;
        }

    const check = (ongaq) => {
        setInterval(() => {
            if(!ongaq.isPlaying){
                clearInterval(timer)
            }
        },10)
    }

    const nearest = (array, value) => {
        return array.reduce((a, b) => {
            let aDiff = Math.abs(a - value);
            let bDiff = Math.abs(b - value);
    
            if (aDiff === bDiff) {
                // 大きい方 vs 小さいほう (> vs <) を指定する
                return a > b ? a : b;
            } else {
                return bDiff < aDiff ? b : a;
            }
        });
    } 

    const Midinum2Note = (num) => {
        const scale = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
        const idx = num % 12
        const position = Math.floor((num - 12) / 12)

        if(position > 0 && position < 5){
            let Note = ""
            if(scale[idx].length === 2){
                Note = scale[idx+1] + position + "b"
            }else{
                Note = scale[idx] + position
            }
            return Note
        }else{
            return ""
        }
        
    }

    const BeatMeasure = (i) => {
        let c = i / 4
        const measure = Math.floor(c)
        const beat = (i - measure * 4) * 4

        return [beat, measure]
    }

    const ImgtoMidiart = (img_data) => {
        const cv2 = window.cv

        let old_width = img_data.naturalWidth
        let old_height = img_data.naturalHeight
        img_data.height = 48
        img_data.width = old_width * (48 / old_height);
        var img = cv2.imread(img_data) 
        var img_w = img_data.width
        var img_h = img_data.height
        let dst = new cv2.Mat();
        cv2.cvtColor(img, dst, cv2.COLOR_BGR2GRAY)

        cv2.imshow("gray", dst)

        const grayCanvas = document.getElementById("gray")
        let arr = []
        for(let i=0; i<img_w;i++){
            let tmp = []
            for(let j=0; j<img_h; j++){
                tmp.push(grayCanvas.getContext("2d").getImageData(i,j,1,1))
            }
            arr.push(tmp)
        }
        cv2.Canny(img, dst, 140, 150, 3, false);

        cv2.imshow("edge", dst)
        const edgeCanvas = document.getElementById("edge")

        let img_edge = []
        for(let i=0; i<img_h;i++){
            let tmp = []
            for(let j=0; j<img_w; j++){
                tmp.push(edgeCanvas.getContext("2d").getImageData(j,i,1,1).data[0])
            }
            img_edge.push(tmp)
        }

        const ongaq = new window.Ongaq ({
            api_key:process.env.REACT_APP_Ongaq_JS_KEY,
            bpm: 120,
            volume: 70,
            onReady: () => {
                const button = document.getElementById("button")
                button.className = "button start"
                button.onclick = () => {
                    check(ongaq)
                    if (ongaq.params.isPlaying) {
                        console.log("stop")
                        ongaq.pause()
                        check(ongaq)
                        move()
                        button.className = "button start"
                    } else {
                        movePlayHead()
                        console.log("start")
                        ongaq.start()
                        move()
                        button.className = "button pause"
                    }
                }
            }
        })

        const instrument = new window.Part({
            sound: "my_piano",
            measure: Math.floor(img_w / 16),
            repeat: false,
            maxLap: 0,
            beatsInMeasure: 16
        })

        const maj_chord = [0, 4, 7]
        // const min_chord = [0, 3, 7, 9, 10]
        // const seventh_chord = [0, 2, 4, 6, 7, 8, 9, 10]
        const l2 = [-1, 0, 1, 2]

        var luminance = ""

        let top = 999

        for(let j=0;j<img_h;j++){
            for(let i=0; i<img_w; i++){
                luminance = img_edge[j][i]
                if(luminance === 255){
                    if(top > j){ top = j }
                    let len = 1
                    if(i < img_h - 1){ 
                        if(img_edge[j][i+len] !== 0){
                            while(img_edge[j][i+len] > 0){
                                len += 1 
                                if(i+len === img_w) break;
                            }
                        }
                    }
                
                    let p = img_h - j + top + 24
                    let q = 0
                    if(Math.random() < slider){
                        // #C
                        q = nearest(maj_chord, p % 12) + 12 * Math.floor(p / 12)
                    }else{
                        q = p
                    }
                    // q = p
                    let t = i * 0.25
                    if(!Number.isInteger(t)){
                        if(Math.random() < slider*0.75){
                            while(!Number.isInteger(t)){
                                t += 0.25 * l2[Math.floor(Math.random() * l2.length)]
                            }
                        }
                    }
                    const time = BeatMeasure(t)
                    instrument.add( new window.Filter ({
                        key: Midinum2Note(q),
                        length: 4 + 4*len,
                        active: (beat, measure) => beat === time[0] && measure === time[1]
                    }) )
                    drawNote(context, img_h-q+24, t, t+0.25*len)
                    i += len
                }
            }
        }

        dst.delete()
        img.delete()
        ongaq.add(instrument)

        // const drum = new window.Part({
        //     sound: "small_cube_drums",
        //     measure: Math.floor(img_w / 16),
        //     maxLap: 0,
        //     repeat: false,
        //     beatsInMeasure: 16
        // })  

        // drum.add(new window.Filter ({
        //     key: "kick",
        //     active: beat => beat === 0
        // }) )

        // ongaq.add(drum)

    }
    
    return {
        drawNote,
        drawPlayHead,
        drawPianoGrid,
        resizeCanvasToDisplaySize,
        ImgtoMidiart,
        movePlayHead
    }

}

export default usePianoroll;