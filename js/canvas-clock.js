var eventDate = new Date(2018, 2, 10, 10);
// Canvas access
var c = document.getElementById("clock"),
    ctx = c.getContext("2d"),
    width = c.width,
    height = c.height;

// Colors
var gridLineColor = "#333",
    gridTextGradient = ctx.createLinearGradient(0,0,0,height);
gridTextGradient.addColorStop(0, "#1783C1");//"#002cf5"); old color here!
gridTextGradient.addColorStop(1, "#27B"); // make this a darker one!



// columns and rows

var digit = { count: 8, pairs: 4, width: 3, height: 5 };
var space = { sides: 1, topBottom: 1, inBetweenPairs: 3, inBetweenDigits: 1 };
var rows = space.topBottom * 2 + digit.height;
var columns = space.sides * 2
    + digit.count * digit.width // added size by digits
    + (digit.pairs - 1) * space.inBetweenPairs // space between individual pairs of numbers
    + digit.pairs * space.inBetweenDigits; // space between numbers in pair

// grid state [y, x] for consistency
var grid = [], y, x;
for (y = 0; y < rows; y++) {
    grid.push([]);
    for (x = 0; x < columns; x++) {
	grid[y].push(0);
    }
}


/** getDigitPosition
* returns [y, x] digit position
*/
function getDigitPosition(d) {
    const y = space.topBottom;
    const x = space.sides
	  + Math.floor(d / 2) * (digit.width * 2 + space.inBetweenPairs + space.inBetweenDigits)
	  + (d % 2) * (digit.width + space.inBetweenDigits);

    return [y, x];
}
function getCanvasCoords(y, x) {
    return [Math.floor(y * height / rows), Math.floor(x * width / columns)];
}
/**
* All numbers return x, y offsets
*/
const G = 1, _ = 0;
const zero =
      [
	  [G, G, G],
	  [G, _, G],
	  [G, _, G],
	  [G, _, G],
	  [G, G, G]
      ],
      one =
      [
	  [_, G, _],
	  [G, G, _],
	  [_, G, _],
	  [_, G, _],
	  [G, G, G]
      ],
      two =
      [
	  [G, G, G],
	  [_, _, G],
	  [G, G, G],
	  [G, _, _],
	  [G, G, G]
      ],
      three =
      [
	  [G, G, G],
	  [_, _, G],
	  [G, G, G],
	  [_, _, G],
	  [G, G, G]
      ],
      four =
      [
	  [G, _, G],
	  [G, _, G],
	  [G, G, G],
	  [_, _, G],
	  [_, _, G]
      ],
      five =
      [
	  [G, G, G],
	  [G, _, _],
	  [G, G, G],
	  [_, _, G],
	  [G, G, G]

      ],
      six =
      [
	  [G, G, G],
	  [G, _, _],
	  [G, G, G],
	  [G, _, G],
	  [G, G, G]
      ],
      seven =
      [
	  [G, G, G],
	  [_, _, G],
	  [_, _, G],
	  [_, _, G],
	  [_, _, G]
      ],
      eight =
      [
	  [G, G, G],
	  [G, _, G],
	  [G, G, G],
	  [G, _, G],
	  [G, G, G]
      ],
      nine =
      [
	  [G, G, G],
	  [G, _, G],
	  [G, G, G],
	  [_, _, G],
	  [_, _, G]
      ];

const digits = [zero, one, two, three, four, five, six, seven, eight, nine];




var eventTime = eventDate.getTime();

function secondsLeft() { return Math.floor((eventTime -  (new Date().getTime())) / 1000); }



/**
* returns whether the was a change in the grid
*/
function writeDigitAt(number, numberPos) {
    const base = getDigitPosition(numberPos);
    const numberSpec = digits[number];
    var wasChange = false;

    for (y = 0; y < digit.height; y++) {
	for (x = 0; x < digit.width; x++) {
	    if (grid[base[0] + y][base[1] + x] === numberSpec[y][x]) { continue; }
	    grid[base[0] + y][base[1] + x] = numberSpec[y][x];
	    wasChange = true;
	}
    }
    return wasChange;
}


function logGrid() {
    var gridToText = "";
    for (y = 0; y < grid.length; y++) {
	for (x = 0; x < grid[y].length; x++) {
	    gridToText += (grid[y][x] == 0 ? '_' : 'G');
	}
	gridToText += "\n";
    }
    console.log(gridToText);
}

function updateGrid() {
    var clockTime = secondsLeft();
    var seconds = clockTime % 60;
    clockTime = Math.floor(clockTime / 60);
    var minutes = clockTime % 60;
    clockTime = Math.floor(clockTime / 60);
    var hours = clockTime % 24;
    clockTime = Math.floor(clockTime / 24);
    var days = clockTime;


    var wasChange = writeDigitAt(Math.floor(days / 10), 0);
    wasChange = writeDigitAt(days % 10, 1) || wasChange;

    wasChange = writeDigitAt(Math.floor(hours / 10), 2) || wasChange;
    wasChange = writeDigitAt(hours % 10, 3) || wasChange;

    wasChange = writeDigitAt(Math.floor(minutes / 10), 4) || wasChange;
    wasChange = writeDigitAt(minutes % 10, 5) || wasChange;

    wasChange = writeDigitAt(Math.floor(seconds / 10), 6) || wasChange;
    wasChange = writeDigitAt(seconds % 10, 7) || wasChange;

//    logGrid();
    return wasChange;
}

const boxWidth = getCanvasCoords(1,1)[1];
const boxHeight = getCanvasCoords(1,1)[0];
function drawBox(y, x) {
    const topLeft = getCanvasCoords(y, x);
    ctx.beginPath();
    ctx.rect(topLeft[1], topLeft[0], boxWidth, boxHeight);
    ctx.fill();
}

function drawGrid() {
    // draw the boxes
    for (y = 0; y < rows; y++) {
	for (x = 0; x < columns; x++) {
	    if (grid[y][x] == 1) {
		ctx.fillStyle = gridTextGradient;
		drawBox(y, x);
	    }
	}
    }

    ctx.strokeStyle = gridLineColor;
    ctx.lineWidth = 1;
    // draw the grid
    for (y = 1; y < rows; y++) {
	var lineY = getCanvasCoords(y, 0)[0];
	ctx.beginPath();
	ctx.moveTo(-10, lineY);
	ctx.lineTo(width + 10, lineY);
	ctx.stroke();
    }
    for (x = 1; x < columns; x++) {
	var lineX = getCanvasCoords(0, x)[1];
	ctx.beginPath();
	ctx.moveTo(lineX, -10);
	ctx.lineTo(lineX, height + 10);
	ctx.stroke();
    }


}




function main() {
    if (updateGrid()) {
	ctx.clearRect(-10, -10, width + 10, height + 10);
	drawGrid();
    }
    setTimeout(function() { main(); }, 300);
}
main();
