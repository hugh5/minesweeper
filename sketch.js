var grid;
var flags;
var diffSelect;

function setup() {
  const canvas = createCanvas(800, 800);
  canvas.elt.addEventListener("contextmenu", (e) => e.preventDefault())

  button = createButton('New Game');
  button.position(0, height + 10);
  button.mousePressed(newGame);

  flags = createP();
  flags.style('font-size', '30px');
  flags.position(120, height - 20);

  loop();
  grid = new Grid(10, 10);
  console.log(grid);
}

function draw() {
  background(255);
  fill(0);
  grid.show();
}

function mousePressed() {
  if (!isNaN(parseInt(flags.html()))) {
    grid.handleMouse();
  }
}

function newGame() {
  flags.remove();
  button.remove();
  setup();
}
