function load() {
    let imgCanvas = <HTMLCanvasElement>document.getElementById("ImageCanvas");
    let imgCtx = imgCanvas.getContext("2d");

    let workCanvas = <HTMLCanvasElement>document.getElementById("WorkCanvas");
    let workCtx = workCanvas.getContext("2d");

    let img = new Image();
    img.src = "images/2.jpg";
    img.onload = () => imgCtx.drawImage(img, 0, 0);

    let workImg = new Image();
    workImg.src = "images/0.jpg";
    workImg.onload = () => workCtx.drawImage(workImg, 0, 0);

    let buttons = document.getElementsByTagName("button");
    buttons[0].onclick = () => grayscale();
    buttons[1].onclick = () => decompress();
    buttons[1].disabled = true;
}

function grayscale() {
    let imgCanvas = <HTMLCanvasElement>document.getElementById("ImageCanvas");
    let imgCtx = imgCanvas.getContext("2d");
    let imgData = imgCtx.getImageData(0, 0, 512, 512);

    let bmp = new Bitmap(imgData);
    bmp.toGrayscale();
    imgCtx.putImageData(bmp.toImageData(), 0, 0);

    updateGrayButton();
}

function updateGrayButton() {
    let button = <HTMLButtonElement>document.getElementsByTagName("button")[0];
    button.innerHTML = "Compress";
    button.onclick = () => compress();
}

function compress() {
    disableCompressButton();
    enableDecompressButton();

    let workCanvas = <HTMLCanvasElement>document.getElementById("ImageCanvas");
    let workCtx = workCanvas.getContext("2d");
    let factory = new EntityFactory(GLOBALSIZE);
    let comp = new Compressor(factory, workCtx); 

    comp.compress();
    alert("done");

    // потрясающий вывод информации во внешний мир, удачи
    console.log(GLOBALINFO);
}

function disableCompressButton() {
    let button = <HTMLButtonElement>document.getElementsByTagName("button")[0];
    button.disabled = true;
}

function decompress() {
    let imgCanvas = <HTMLCanvasElement>document.getElementById("WorkCanvas");
    let imgCtx = imgCanvas.getContext("2d");
    let factory = new EntityFactory(GLOBALSIZE);
    let decomp = new Decompressor(factory, imgCtx);

    decomp.decompress();
}

function enableDecompressButton() {
    let button = <HTMLButtonElement>document.getElementsByTagName("button")[1];
    button.disabled = false;
}

/// внешний мир
var GLOBALINFO: CompInfo[];
const GLOBALSIZE = 16;
/// конец внешнего мира

load();
