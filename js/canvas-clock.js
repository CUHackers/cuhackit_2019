var startTime = (new Date(2018, 2, 10, 10)).getTime();
var endTime = (new Date(2018, 2, 11, 10)).getTime();


/* // for testing
var startTime = (new Date(2018, 1, 27, 10)).getTime();
var endTime = (new Date(2018, 1, 28, 10)).getTime();
*/




function currentTime() {
    return (new Date()).getTime();
}

var progress = {
    before: function () {
	return currentTime() < startTime;
    },
    during: function () {
	return startTime <= currentTime() && currentTime() < endTime;
    },
    after: function () {
	return endTime <= currentTime();
    }
}






if (progress.before()) {
    console.log("The event has not started");
}
else if (progress.during()) {
    console.log("The event is in progress");
}
else if (progress.after()) {
    console.log("The event is over");
}
else {
    console.log("How did you get out of all time?");
}






// Canvas access
var c = document.getElementById("clock"),
    ctx = c.getContext("2d"),
    width = c.width,
    height = c.height;

// Colors
var gridLineColor = "#333";

/*
  This gradient is present where the top of the canvas is lighter than the bottom

  Changes based on current state of competition, i.e. before/during/after
 */
function getCurrentGradient() {
    var gridTextGradient = ctx.createLinearGradient(0,0,0,height);
    if (progress.before()) {
	gridTextGradient.addColorStop(0, "#0016ff"); // old color here!
	gridTextGradient.addColorStop(1, "#01a"); // make this a darker one!
    }
    else if (progress.during()) {
	gridTextGradient.addColorStop(0, "#e70000"); // old color here!
	gridTextGradient.addColorStop(1, "#a00"); // make this a darker one!
    }
    else {
	gridTextGradient.addColorStop(0, "#711ed6"); // old color here!
	gridTextGradient.addColorStop(1, "#40a"); // make this a darker one!
    }

    return gridTextGradient;
}



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






function secondsLeft() {
    if (progress.before()) {
	return Math.floor((startTime -  (new Date().getTime())) / 1000);
    }
    else if (progress.during()) {
	return Math.floor((endTime - (new Date().getTime())) / 1000);
    }
    else {
	throw new Error("This shouldn't be happening!!!");
    }

}



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

function drawNumbers() {
    // draw the boxes
    for (y = 0; y < rows; y++) {
	for (x = 0; x < columns; x++) {
	    if (grid[y][x] == 1) {
		ctx.fillStyle = getCurrentGradient();
		drawBox(y, x);
	    }
	}
    }
}

function drawGrid() {
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


// Event Has Ended!
// G_G___G____GG__G__G__GGG___GG__G__G_GGG
// G_G__G_G__G__G_G_G___G__G_G__G_GG_G_G__
// GGG__GGG__G____GG____G__G_G__G_G_GG_GGG
// G_G_G___G_G__G_G_G___G__G_G__G_G__G_G__
// G_G_G___G__GG__G__G__GGG___GG__G__G_GGG
var eventOver = [
    [G,_,_,G,_,_,G,G,_,_,_,G,G,_,G,_,G,_,_,G,G,G,_,_,_,G,G,_,_,G,_,_,G,_,G,G,G,_,G],
    [G,_,_,G,_,G,_,_,G,_,G,_,_,_,G,_,G,_,_,G,_,_,G,_,G,_,_,G,_,G,G,_,G,_,G,_,_,_,G],
    [G,G,G,G,_,G,G,G,G,_,G,_,_,_,G,G,_,_,_,G,_,_,G,_,G,_,_,G,_,G,G,G,G,_,G,G,G,_,G],
    [G,_,_,G,_,G,_,_,G,_,G,_,_,_,G,_,G,_,_,G,_,_,G,_,G,_,_,G,_,G,_,G,G,_,G,_,_,_,_],
    [G,_,_,G,_,G,_,_,G,_,_,G,G,_,G,_,G,_,_,G,G,G,_,_,_,G,G,_,_,G,_,_,G,_,G,G,G,_,G]
]



function staticDrawEnd() {
    var rowStart = Math.floor(Math.max(0, rows/2) - eventOver.length/2),
	colStart = Math.floor(Math.max(0, columns/2) - eventOver[0].length/2);

    ctx.fillStyle = getCurrentGradient();
    for (y = 0; y < eventOver.length; y++) {
	for (x = 0; x < eventOver[0].length; x++) {
	    if (eventOver[y][x]) {
		drawBox(y+rowStart,x+colStart);
	    }
	}
    }
    drawGrid();


    $(".time-label").hide();
}




function main() {
    if (progress.after()) {
	ctx.clearRect(-10, -10, width + 10, height + 10);
	staticDrawEnd();
    } else {
	if (updateGrid()) {
	    ctx.clearRect(-10, -10, width + 10, height + 10);
	    drawNumbers();
	    drawGrid();
	}
	setTimeout(function() { main(); }, 300);
    }
}
main();
