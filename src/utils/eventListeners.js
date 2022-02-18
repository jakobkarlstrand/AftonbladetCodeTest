// --- Eventlisteners

function handleMouseDown(e){

    selectedCell = getSelectedCellFromGrid(gridStart,e);
    if(selectedCell == null){
        selectedCell = getSelectedCellFromGrid(gridGoal,e);
        if(selectedCell != null){
            moveVideoCellToGrid(gridGoal,gridStart);
            snapToInitalPosition();
        }
    }
    else{
        mouseOffsetX = e.x-selectedCell.localPosition[0];
        mouseOffsetY = e.y-selectedCell.localPosition[1];
        selectedCell.setLocalPosition(e.x-mouseOffsetX,e.y-mouseOffsetY)
    }
}

function handleMouseMove(e){
    
    if(selectedCell != null){
        selectedCell.setLocalPosition(e.x-mouseOffsetX,e.y-mouseOffsetY);
    }
}

function handleMouseUp(e){
    if(selectedCell == null) return;

    let [row,col] = getRowColFromMousePosition();

    if(dropIsValid(row,col)){

        moveVideoCellToGrid(gridStart,gridGoal,row,col);
        selectedCell.setFixedPosition(Math.abs(row),Math.abs(col));
        hasWon();
    }
    else{
        snapToInitalPosition();
    }
    selectedCell = null;
}