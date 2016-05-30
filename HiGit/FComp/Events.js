function load() {
    var imgCanvas = document.getElementById("ImageCanvas");
    var imgCtx = imgCanvas.getContext("2d");
    var workCanvas = document.getElementById("WorkCanvas");
    var workCtx = workCanvas.getContext("2d");
    var img = new Image();
    img.src = "images/2.jpg";
    img.onload = function () { return imgCtx.drawImage(img, 0, 0); };
    var workImg = new Image();
    workImg.src = "images/0.jpg";
    workImg.onload = function () { return workCtx.drawImage(workImg, 0, 0); };
    var buttons = document.getElementsByTagName("button");
    buttons[0].onclick = function () { return grayscale(); };
    buttons[1].onclick = function () { return decompress(); };
    buttons[1].disabled = true;
}
function grayscale() {
    var imgCanvas = document.getElementById("ImageCanvas");
    var imgCtx = imgCanvas.getContext("2d");
    var imgData = imgCtx.getImageData(0, 0, 512, 512);
    var bmp = new Bitmap(imgData);
    bmp.toGrayscale();
    imgCtx.putImageData(bmp.toImageData(), 0, 0);
    updateGrayButton();
}
function updateGrayButton() {
    var button = document.getElementsByTagName("button")[0];
    button.innerHTML = "Compress";
    button.onclick = function () { return compress(); };
}
function compress() {
    disableCompressButton();
    enableDecompressButton();
    var workCanvas = document.getElementById("ImageCanvas");
    var workCtx = workCanvas.getContext("2d");
    var factory = new EntityFactory(GLOBALSIZE);
    var comp = new Compressor(factory, workCtx);
    comp.compress();
    alert("done");
    // потрясающий вывод информации во внешний мир, удачи
    console.log(GLOBALINFO);
}
function disableCompressButton() {
    var button = document.getElementsByTagName("button")[0];
    button.disabled = true;
}
function decompress() {
    var imgCanvas = document.getElementById("WorkCanvas");
    var imgCtx = imgCanvas.getContext("2d");
    var factory = new EntityFactory(GLOBALSIZE);
    var decomp = new Decompressor(factory, imgCtx);
    decomp.decompress();
}
function enableDecompressButton() {
    var button = document.getElementsByTagName("button")[1];
    button.disabled = false;
}
/// внешний мир
var GLOBALINFO;
var GLOBALSIZE = 16;
/// конец внешнего мира
load();
//# sourceMappingURL=Events.js.map