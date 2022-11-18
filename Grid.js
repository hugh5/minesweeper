class Grid {
    constructor(xsize, ysize) {
      this.xsize = xsize;
      this.ysize = ysize;
      this.size = min(xsize, ysize);
      this.grid = [];
      this.colors = [color("purple"), color("blue"), color("green"), 
                     color("red"), color("darkblue"), color("maroon"), 
                     color("teal"), color("black"), color("purple")];
      this.mines = new USet();
      this.initGrid();
    }
    
    initGrid() {
      console.log("initGrid(" + this.xsize + "," + this.ysize + ")");
      for (var j = 0; j < this.ysize; j++) {
        this.grid[j] = [];
        for (var i = 0; i < this.xsize; i++) {
          var g = new GridSquare();
          this.grid[j][i] = g;
        }
      }
      this.initMines();
    }
    
    initMines() {
      var difficulty = floor(this.xsize * this.ysize / 8);
      while (this.mines.size < difficulty) {
        this.mines.add(createVector(floor(random(this.xsize)), floor(random(this.ysize))));
      }
      for (var p of this.mines) {
        this.grid[p.y][p.x].setMine();
      }
      console.log("initMines(" + this.mines.size + ")");
      flags.html(this.mines.size);
      this.computeAdj();
    }
    
    inBounds(xindex, yindex) {
      return (xindex >= 0 && xindex < this.xsize && yindex >= 0 && yindex < this.ysize);
    }
    
    computeAdj() {
      for (var j = 0; j < this.ysize; j++) {
        for (var i = 0; i < this.xsize; i++) {
          if (this.grid[j][i].isMine) {
            var posx = i - 1;
            var posy = j - 1;
            for (var k = 0; k < 3; k++) {
              for (var l = 0; l < 3; l++) {
                if (this.inBounds(posx+k, posy+l) && (k != 1 || l != 1)) {
                  this.grid[posy+l][posx+k].incAdj();
                }
              }
            }
          }
        }
      }
    }
    
    show() {
      var w = floor(width / this.xsize);
      var h = floor(height / this.ysize);
      this.size = min(w, h);
      for (var j = 0; j < this.ysize; j++) {
        for (var i = 0; i < this.xsize; i++) {
          stroke(255);
          fill("gray");
          rectMode(CORNER);
          square(i * this.size, j * this.size, this.size);
          if (this.grid[j][i].flagged) {
            // flagged square;
            fill("red");
          } else if (this.grid[j][i].showing) {
            if (this.grid[j][i].isMine) {
              // mine;
              fill("black");
            } else if (this.grid[j][i].adj == 0) {
              // no mines adjacent;
              fill("lightgray");
              square(i * this.size, j * this.size, this.size);
              continue;
            } else {
              // adjacent mines;
              fill(this.colors[this.grid[j][i].adj]);
            }
          } else {
            continue;
          }
          stroke(0);
          textAlign(CENTER);
          textSize(this.size);
          text(this.grid[j][i].toString(), (i+0.5) * this.size, (j + 0.9) * this.size);
        }
      }
    }
    
    reveal(x, y) {
      this.grid[y][x].setShowing();
      if (this.grid[y][x].adj == 0) {
        var posx = x - 1;
        var posy = y - 1;
        for (var k = 0; k < 3; k++) {
          for (var l = 0; l < 3; l++) {
            if (this.inBounds(posx+k, posy+l) && (k != 1 || l != 1)) {
              if (!this.grid[posy+l][posx+k].showing) {
                this.reveal(posx+k, posy+l);
              }
            }
          }
        }
      }
    }
    
    flag(x, y) {
      if (!this.grid[y][x].isShowing) {
        console.log(`flag(${x},${y})`)
        this.grid[y][x].toggleFlag();
        this.checkWon();
      }
    }

    checkWon() {
      if (parseInt(flags.html()) != 0) {
        return;
      }
      for (var p of this.mines) {
        if (!this.grid[p.y][p.x].flagged) {
          return;
        }
      }
      flags.html("You won");
      noLoop();
    }
    
    gameOver() {
      for (var p of this.mines) {
        if (!this.grid[p.y][p.x].flagged) {
          this.grid[p.y][p.x].setShowing();
        }
      }
      flags.html("You Lost");
      noLoop();
    }
  
    handleMouse() {
      var x = floor(mouseX / this.size);
      var y = floor(mouseY / this.size);
      if (!this.inBounds(x, y)) {
        return;
      }
      console.log(`Click(${x},${y})`);
      if (mouseButton === LEFT && !this.grid[y][x].flagged) {
        if (this.grid[y][x].isMine) {
          this.gameOver();
          return;
        }
        this.reveal(x, y);
      } else if (mouseButton === RIGHT) {
        this.flag(x, y);
      }
    }
}