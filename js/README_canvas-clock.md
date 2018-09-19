# Canvas Clock

Canvas Clock is a countdown clock written in Javascript with HTML5 canvas element

## Documentation

These instructions will provide documentation for the functions in canvas-clock.js file.

### Getting Current Time

This functions returns the current time. You can call the function following way.

```
function currentTime();
// returns date and time in this format "Sun Sep 09 2018 01:00:22 GMT-0400 (Eastern Daylight Time)"
```

### Changing the clock's color gradient

This function changes the color gradient of the clock depending on the state of competition.

```
function getCurrentGradient();
// returns
// #0016ff color on the top half of the alphabet and for bottom half it add #01a to the top half of the clock before the event starts.

// #e70000 color on the top half of the alphabet and for bottom half it add #a00 to the top half of the clock during the event.

// #711ed6 color on the top half of the alphabet and for bottom half it add #40a to the top half of the clock after the event has ended.
```

### Getting digit position

This functions returns the pair of [y,x] coordinates of the digit on the canvas grid

```
function getDigitPosition(d);
// return the coordinates of digit in pair [y,x]
// param d: position of the digit in clock i.e 01:23:45:67 || dd:hh:mm:ss
```

### Drawing the box

This function draws the box on the grid which makes up the number/ letter

```
function drawBox();
// this function gets the canvas coordinates and call the built in canvas function ctx.rect to draw the box.
```

### Getting the canvas coordinates

This function gets the canvas coordinates

```
function getCanvasCoords(y, x);
// this function gets returns the canvas coordinates in the pair of [y,x]
```

### Getting the time for canvas clock

This function returns the difference between the event start time and the current time in seconds before the event starts and returns the difference between the event end time and the current time

```
function secondsLeft();
// returns the difference between the event start and current time before the event starts in seconds and
// returns the difference between the event ends and current time during the events in seconds
```

### Change in grid

This function returns whether the grid was changed or not.

```
function writeDigitAt(number, numberPos);
// this function indicate whether there was a change in grid, by checking if there was a change in the digits coordinates
```

### Updating the grid

This function updates the time on the grid of canvas clock

```
function updateGrid();
// this function calls the secondsLeft() to get the remaining time and converts it in HH MM SS and calls writeDigitAt() to see if there was any change in the digit, if it gets one then it updates the grid
```

### Drawing the box

This function the box that joins together to represent the letter/number.

```
function drawBox(y, x);
// this function draws the 1*1 square box
```

### Drawing the numbers

This function draws the number on the grid of the clock.

```
function drawNumber();
// this function call the drawBox function to draws boxes on the grid which makes up the number and calls getCurrentGradient function to fill up the boxes with appropriate color.
```


### Drawing the grid

This function draws the grid (background) of the canvas clock on which the number/letters are displayed

```
function drawGrid();
// Draws the grid  based on the canvas coordinates first for loop generates the vertical line and second for loop generates the horizontal line.
```

### Displaying the Hack Done!

This function displays the Hack Done! on the canvas grid once the event has ended.

```
function function staticDrawEnd();
// Calls the getCurrentGradient and changes the of the grid.
// Then takes the eventOver array and based on the measurement of the grid draws each block of letters (HACK DONE!) and hides the time.
```
