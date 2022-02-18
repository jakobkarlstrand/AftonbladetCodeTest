/* 
--- Summary -----
The puzzle is made up of two instances of the class Grid,
which has an array of all "VideoCell" it's currently holding.

Each grid always renders a solid color background cell, and then if it has any Video Cells, render those on top.

The user can move all video cells over the canvas. On release it checks if the drop is possible.
If possible -> transfer the selected cell over to the other grid and set it to the corresponding position it was dropped.
If not -> snap the video cell back to its original position.

Once the length of the "Goal Grid" is equal to number of columns multiplied by the number of rows, it checks if the Viceo Cells are in the correct order
If yes -> User has won the game
If not -> Nothing happens, and the user can rearrange the cells until it's complete.

*/

//Config
let webcam = null; //Reference to video stream
let canvas = null;
let context = null;
let size = {x: 0, y: 0, width: 0, height: 0}

//Grids
let gridStart = null;
let gridGoal = null;

//Global reference for a selected video cell
let selectedCell = null;

//Mouse offset when clicking on a cell, to prevent "jumpy behaivior"
let mouseOffsetX = 0;
let mouseOffsetY = 0;

//Global variables for rows and columns
let nCols = 3;
let nRows = 3;

let cellWidth = 0;
let cellHeight = 0;


let time;
let gameWon = false;

const GRID_SPACE = 50 //Space between grids
const easyMode = false; // True -> Displays the video index on each video cell

async function  main(){
    canvas = document.getElementById("puzzle-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context = canvas.getContext("2d")
    let stream = await navigator.mediaDevices.getUserMedia({video: true})
        webcam = document.createElement("video");
        webcam.srcObject = stream;
        webcam.play();
       
    webcam.onloadeddata=function(){
        initializeGame()
        time = Date.now();
        render();
    }
    
}

function initializeGame(){

    let scalar = 0.5*Math.min(window.innerWidth/webcam.videoWidth, window.innerHeight/webcam.videoHeight);

    size.width = scalar*webcam.videoWidth;
    size.height = scalar*webcam.videoHeight;
    size.x = window.innerWidth/2-size.width/2;
    size.y = window.innerHeight/2-size.height/2;

    cellHeight = size.height/nRows;
    cellWidth = size.width/nCols;
    gridStart = new Grid(size.x-size.width/2 - GRID_SPACE,size.y,4,4, initializeVideoCells());
    gridGoal = new Grid(size.x+size.width/2 + GRID_SPACE,size.y,4,4);

    //Add eventlisteners
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
}



function initializeVideoCells(){  //Initialize an array with videocells in correct order
    let temp = []

    for(let i = 0; i < nCols*nRows; i++){
        temp.push(new VideoCell( (i % nRows),Math.floor(i/nCols),i))
    }
     return temp;
}


function moveVideoCellToGrid(fromGrid, toGrid){
    fromGrid.removeVideoCell(selectedCell);
    toGrid.addVideoCell(selectedCell);
}


function getSelectedCellFromGrid(grid,e){
    let [xGrid,yGrid] = grid.viewportPosition;

    for(let i = 0; i < grid.videoCells.length; i++){
        let xCellStart = xGrid + grid.videoCells[i].localPosition[0];
        let yCellStart = yGrid + grid.videoCells[i].localPosition[1];

        if(xCellStart <= e.x && e.x <= xCellStart+cellWidth && yCellStart<= e.y && e.y <= yCellStart+cellHeight){
            return grid.videoCells[i];
        }

    }
    return null;
}


function getRowColFromMousePosition(){
    let mouseX = (gridStart.viewportPosition[0] + selectedCell.localPosition[0]-gridGoal.viewportPosition[0])/cellWidth;
    let mouseY = (gridStart.viewportPosition[1] + selectedCell.localPosition[1]-gridGoal.viewportPosition[1])/cellHeight;

    let row = Math.round(mouseX);
    let col = Math.round(mouseY);

    return [row,col];
}

function hasWon(){
    if(gridGoal.videoCells.length != nRows*nCols){
        return;
    }

    let indexCounter = 0;
    for(let col = 0; col < nCols; col++){
        for(let row = 0; row < nRows; row++){
            if(gridGoal.getVideoCell(row,col).videoIndex !== indexCounter){
                return;
            }
            indexCounter++;
        }
    }

    // Player has won the game
    time = ((Date.now()-time)/1000).toString();

    document.removeEventListener("mousedown", handleMouseDown)
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)

    gameWon = true;
}


function dropIsValid(row,col){  // Check if drop is inside valid drop zone and if the requested spot is not already taken
    if(row < 0 || row > nRows-1 || col < 0 || col > nCols-1) return false;

    if(gridGoal.getVideoCell(row, col) === null){
        return true;
    }
    return false;
}

function snapToInitalPosition(){
    selectedCell.setFixedPosition(selectedCell.initalRow, selectedCell.initalCol)
}


function render(){

    context.clearRect(0,0,canvas.width,canvas.height); //Clear background each frame
    gridGoal.renderGrid(size.x+size.width/2 + GRID_SPACE,size.y) // Render grids
    gridStart.renderGrid(size.x-size.width/2 - GRID_SPACE,size.y)

    if(gameWon){
        displayWinningMessage();
    }
    window.requestAnimationFrame(render)

    
}

function displayWinningMessage(){
    context.beginPath();
    context.globalAlpha = 0.5;
    context.fillStyle = "#E5E1FF"
    context.fillRect(gridGoal.viewportPosition[0], gridGoal.viewportPosition[1], cellWidth*nRows, cellHeight*nCols);
    context.globalAlpha = 1.0;
    context.font = "30px Arial";
    context.textAlign = "center"
    context.fillStyle = "blue";
    context.fillText("GAME WON!", gridGoal.viewportPosition[0]+cellWidth*nRows/2, gridGoal.viewportPosition[1]+cellHeight*nCols/2);
    context.fillText("Time: " + time + "s", gridGoal.viewportPosition[0]+cellWidth*nRows/2, gridGoal.viewportPosition[1]+cellHeight*nCols/2 + 50);
}





