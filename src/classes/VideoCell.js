
class VideoCell{
    constructor(row,col,videoIndex){
        this.videoIndex = videoIndex;
        this.initalRow = row;
        this.initalCol= col;
        this.cropX = this.initalRow*webcam.videoWidth/nRows;
        this.cropY = this.initalCol*webcam.videoHeight/nCols;
        this.row = this.initalRow;
        this.col = this.initalCol;
        this.localPosition = this.getLocalBasedOnRowCol(); // Position relative to grid
    }

    setFixedPosition(row,col){
        this.row = row;
        this.col = col;
        this.localPosition = this.getLocalBasedOnRowCol();
    }

    setLocalPosition(x,y){
        this.localPosition[0] = x;
        this.localPosition[1] = y;
    }


    getLocalBasedOnRowCol(){
        return [this.row*cellWidth, this.col*cellHeight];
    }

    render(originX,originY){
        context.beginPath()
        context.drawImage(webcam, 
            this.cropX,this.cropY,
            webcam.videoWidth/nRows,webcam.videoHeight/nCols,
            originX+this.localPosition[0],originY+this.localPosition[1],
            cellWidth, cellHeight
            )
        if(easyMode){
            context.font = "30px Arial";
            context.fillStyle = "red";
            context.fillText(this.videoIndex, originX + this.localPosition[0]+cellWidth/2, originY + this.localPosition[1]+cellHeight/2);
            
        }
        }
    }