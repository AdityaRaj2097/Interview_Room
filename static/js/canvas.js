let board = document.querySelector(".board");
// tool -> digitizer pen

let color_eraser = document.querySelector(".eraser");
let newpage = document.querySelector(".newpage");

let downpdf = document.querySelector(".downpdf");

let tool = board.getContext("2d");
let left = document.querySelector(".left");
// board.height = 600;
// board.width = 1025;

tool.strokeStyle = "yellow";
tool.fillRect(0, 0, 1025, 600);

tool.stroke();

tool.lineWidth = 10;

let headercontainer = document.querySelector(".header");
let featuredoption = document.querySelector(".features-option");

let isDown = false;
tool.strokeStyle = "red";
tool.lineWidth = 10;

// jab mouse press mean ab likhna chata hai
board.addEventListener("mousedown", function (e) {
  console.log(e);
  tool.beginPath();
  tool.moveTo(e.clientX, getY(e.clientY));
  isDown = true;
});

//  agr mouse press k sath sath move move bhi kr rha hai sika mtlb we want to wrtie so likhod
board.addEventListener("mousemove", function (e) {
  // console.log("Move to")
  if (isDown == true) {
    tool.lineTo(e.clientX, getY(e.clientY));
    // koi bhi effect show by the help of stoke hi hota hai
    tool.stroke();
  }
});
// event
board.addEventListener("mouseup", function (e) {
  // tool.lineTo(e.clientX, e.clientY);
  // tool.stroke();
  isDown = false;
});
//  acutally kya hota hai getboud bount hume pistion with repset to dete hai
//  aur hume canvas k croppisond hiehgt k dalni aur isme humne extra height bhi le rakih hi ain header
//  or in Select Select  so for solving that hum eorginal ehight m se subtract krna padta hai
function getY(originalY) {
  let obj = headercontainer.getBoundingClientRect();
  let obj2 = featuredoption.getBoundingClientRect();
  let height = obj.height + obj2.height;
  return originalY - height;
}

//  adding Event on colors change
let colorArr = document.querySelectorAll(".color");
for (let i = 0; i < colorArr.length; i++) {
  colorArr[i].addEventListener("click", function () {
    let newColor = colorArr[i].classList[1];
    if (newColor == "red") {
      tool.strokeStyle = newColor;
    } else {
      tool.strokeStyle = newColor;
    }
  });
}

//  for changing the sie of pencil in white board
let pencilSize = document.querySelectorAll(".pencilsize");
for (let i = 0; i < pencilSize.length; i++) {
  pencilSize[i].addEventListener("click", function () {
    let size = pencilSize[i].getAttribute("value");
    tool.lineWidth = size;
  });
}

//  for downloading the writeent text on notepad
let download = document.querySelector(".download");
download.addEventListener("click", function () {
  let url = board.toDataURL();
  let a = document.createElement("a");
  a.download = "file.png";
  a.href = url;
  a.click();
  a.remove();
});
