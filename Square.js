const states = {
  hidden: 0,
  visible: 1,
  flagged: 2,
}

class GridSquare {
  constructor() {
    this.numAdj = 0;
    this.state = 0;
    this.mine = false;
  }
  
  toString() {
    if (this.flagged) {
      return "🚩";
    }
    if (this.showing) {
      if (this.mine) {
        return "💣";
      } else if (this.numAdj == 0) {
        return " "; 
      } else {
        return this.numAdj.toString();
      }
    } else {
      return " ";
    }
  }

  setAdj(a) {
    this.numAdj = a;
  }

  incAdj() {
    this.numAdj++;
  }

  get adj() {
    return this.numAdj;
  }

  get showing() {
    return this.state == states.visible;
  }

  setShowing() {
    this.state = states.visible;
  }
  
  get flagged() {
    return this.state == states.flagged;
  }

  toggleFlag() {
    if (this.state == states.flagged) {
      this.state = states.hidden;
      flags.html(parseInt(flags.html()) + 1);
    } else if (this.state == states.hidden) {
      this.state = states.flagged;
      flags.html(parseInt(flags.html()) - 1);
    }
  }
  
  setMine() {
    this.mine = true;
  }
  
  get isMine() {
    return this.mine;
  }
}