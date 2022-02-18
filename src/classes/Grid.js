class Grid{
    constructor(x,y,cols, rows, cells =[]){
        this.rows = rows;
        this.cols = cols;
        this.videoCells = cells;
        this.shuffleVideoCells();
        this.viewportPosition = [x,y];
    }


    shuffleVideoCells(){
        let availableIndexes = [];
        this.videoCells.forEach(vc =>{
            availableIndexes.push([vc.row,vc.col])
        })
        availableIndexes.sort( () => .5 - Math.random());
        this.videoCells.forEach((vc,index) =>{
            vc.setFixedPosition(availableIndexes[index][0], availableIndexes[index][1])
            vc.initalRow = availableIndexes[index][0];
            vc.initalCol = availableIndexes[index][1];
        })
        
    }

    getVideoCell(row,col){

        for(let i = 0; i< this.videoCells.length; i++){
            if(this.videoCells[i].row == row && this.videoCells[i].col == col){
                return this.videoCells[i];
            }
        }

        return null;
    }

    addVideoCell(videoCell){
        this.videoCells.push(videoCell);
    }

    removeVideoCell(videoCell){

        this.videoCells = this.videoCells.filter(cell =>{
            return !(cell.row == videoCell.row && cell.col == videoCell.col); 
        })
    }

    renderBackground(){
        for(let col = 0; col < nCols; col++){
            for(let row = 0; row < nRows; row++){
            context.beginPath();
            context.fillStyle = "#a090fc"
            context.fillRect(this.viewportPosition[0]+col*cellWidth, this.viewportPosition[1]+row*cellHeight, cellWidth-1, cellHeight-1);
            }
        }

    }

    renderVideoCells(){
        this.videoCells.forEach((vc) =>{
            vc.render(this.viewportPosition[0],this.viewportPosition[1])
        })
    }

    renderGrid(){
      this.renderBackground();
      this.renderVideoCells();
    }
    
}