import useEstimateInfo from "./useEstimateInfo";

let test_music = []

// const bpm = 120;

let audioContext
// window.AudioContext = window.AudioContext || window.webkitAudioContext;
// // let oscillator;
let masterGain
// masterGain.gain.value = 0.1;
// masterGain.connect(audioContext.destination);

let isPlaying = false


const usePianoroll = () => {
    const { 
        slider, 
        context, 
        playheadctx, 
        cellheight, 
        cellwidth, 
        h, 
        w, 
        scale,
        key,
        btn, 
        setBtn, 
        length_slider,
        notes, setNotes,
        music, setMusic,
        bpm
    } = useEstimateInfo();
    let head_x = 0
    let dx = 1
    let timer = ""

    const drawNote = (ctx, note, start, end, selected=false) => {
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

        let tmp = notes
        tmp.push({note: note, note_start: start, note_end: end, y: y, start: x, end: x + cellwidth*(end-start)})
        setNotes(tmp)
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
            timer = setInterval(movePlayHead, bpm / 60 / cellwidth * 1000);
        }else{
            clearInterval(timer)
            timer = ""
            head_x = 0
            playheadctx.clearRect(0, 0, w, h)
        }
    }
    
    const drawPianoGrid = (context) => {
        setNotes([])
        for(let y=0;y<w;y=y+cellheight){
            for(let x=0;x<w;x=x+cellwidth){
                if((x / cellwidth) % 4 === 0){
                    context.beginPath();    
                    context.moveTo(x,0);
                    context.strokeStyle = "black";
                    context.lineTo(x,h);
                    context.shadowBlur=0;
                    context.stroke();
                }
                context.beginPath();
                if((y / cellheight) % 11 !== 0){
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

    // const check = (ongaq) => {
    //     setInterval(() => {
    //         if(!ongaq.isPlaying){
    //             clearInterval(timer)
    //         }
    //     },10)
    // }

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

    // const Midinum2Note = (num) => {
    //     const scale = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
    //     const idx = num % 12
    //     const position = Math.floor((num - 12) / 12)

    //     if(position > 0 && position < 5){
    //         let Note = ""
    //         if(scale[idx].length === 2){
    //             Note = scale[idx+1] + position + "b"
    //         }else{
    //             Note = scale[idx] + position
    //         }
    //         return Note
    //     }else{
    //         return ""
    //     }
        
    // }

    // const BeatMeasure = (i) => {
    //     let c = i / 4
    //     const measure = Math.floor(c)
    //     const beat = (i - measure * 4) * 4

    //     return [beat, measure]
    // }

    const ImgtoGray = (img_data) => {
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
        dst.delete()
        img.delete()

        return [img_w, img_h]
    } 

    const Midi2Hz = (num) => {
        return 440 * (2 ** ((num - 69) / 12))
    }

    const Beat2Time = (num) => {
        return ( bpm / 60 ) * num
    }

    const makeMusic = (audioContext) => {
        let start = audioContext.currentTime
        let hz = 0
        let time = 0
        let test = []

        for(let i=0; i<test_music.length; i++){
            const oscillator = audioContext.createOscillator();
            oscillator.type = "sine"; // sine, square, sawtooth, triangleがある
            let gain = new GainNode(audioContext)
            gain.gain.setValueAtTime(0.0,start)

            hz = Midi2Hz(test_music[i].note)
            time = Beat2Time(test_music[i].time)
            oscillator.frequency.setValueAtTime(hz, start + time)
            gain.gain.setValueAtTime(0.3, start+time)

            test.push({"hz": hz, "time": time})

            oscillator.connect(gain);
            gain.connect(masterGain);
            oscillator.start = oscillator.start || oscillator.noteOn; //互換対応
            oscillator.start();
            oscillator.stop(start + time + Beat2Time(test_music[i].len))
        }
        console.log(test)
        
        // return oscillator
    }

    const ImgtoMidiart = (id, img_w, img_h) => {

        const edgeCanvas = document.getElementById(id)

        let img_edge = []
        for(let i=0; i<img_h;i++){
            let tmp = []
            for(let j=0; j<img_w; j++){
                if(id==="draw"){
                    tmp.push(edgeCanvas.getContext("2d").getImageData(j,i,1,1).data[3])
                }else{
                    tmp.push(edgeCanvas.getContext("2d").getImageData(j,i,1,1).data[0])
                }
            }
            img_edge.push(tmp)
        }

        const button = document.getElementById("button")
        
        button.onclick = () => {
            move()
            // 再生中なら二重に再生されないようにする
            if (isPlaying) {
                // oscillator.stop();
                masterGain.gain.value = 0.0;
                masterGain.connect(audioContext.destination);
                isPlaying = false;
            }else{
                audioContext = new AudioContext();
                window.AudioContext = window.AudioContext || window.webkitAudioContext;
                // let oscillator;
                masterGain = audioContext.createGain();
                masterGain.gain.value = 0.1;
                masterGain.connect(audioContext.destination);
                makeMusic(audioContext)
                isPlaying = true;
            }
        };

        const maj_chord = [0, 4, 7]
        const min_chord = [0, 3, 7]
        const penta_chord = [0, 2, 4, 7, 9]
        const seventh_chord = [0, 4, 7, 10]

        let use_scale = []
        for(let i=0; i<4; i++){
            if(scale[i] === "major"){
                use_scale.push(maj_chord)
            }else if(scale[i] === "minor"){
                use_scale.push(min_chord)
            }else if(scale[i] === "penta"){
                use_scale.push(penta_chord)
            }else if(scale[i] === "seventh"){
                use_scale.push(seventh_chord)
            }
        }  

        const l2 = [-1, 0, 1, 2]

        var luminance = ""

        let top = 999
        let tmp = []

        for(let j=0;j<img_h;j++){
            for(let i=0; i<img_w; i++){
                luminance = img_edge[j][i]
                if(luminance === 255){
                    // if(top > j){ top = j }
                    let len = 1
                    if(i < img_h - 1){ 
                        if(img_edge[j][i+len] !== 0){
                            while(img_edge[j][i+len] > 0){
                                len += 1 
                                if(i+len === img_w) break;
                            }
                        }
                    }
                
                    let p = img_h - j + 24 // + top
                    let q = 0
                    if(Math.random() < slider){
                        if(i < img_w * 0.25){
                            // C
                            q = nearest(use_scale[0].map(x => x + key[0]), p % 12) + 12 * Math.floor(p / 12)
                        }else if(i < img_w * 0.5){
                            // Dm
                            q = nearest(use_scale[1].map(x => x + key[1]), p % 12) + 12 * Math.floor(p / 12)
                        }else if(i < img_w * 0.75){
                            // G7
                            q = nearest(use_scale[2].map(x => x + key[2]), p % 12) + 12 * Math.floor(p / 12)
                        }else{
                            // C
                            q = nearest(use_scale[3].map(x => x + key[3]), p % 12) + 12 * Math.floor(p / 12)
                        }
                        
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

                    
                    tmp.push({"note":q+24, "time": t, "len": 0.25*length_slider*len})         
                    drawNote(context, img_h-q+24, t, t+0.25*length_slider*len)

                    i += len
                }
            }
        }
        // setMusic(tmp)
        test_music = tmp
        console.log(test_music)

    }
    
    return {
        drawNote,
        drawPlayHead,
        drawPianoGrid,
        resizeCanvasToDisplaySize,
        ImgtoMidiart,
        movePlayHead,
        ImgtoGray
    }

}

export default usePianoroll;