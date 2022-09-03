import type P5 from 'p5';

export function HelperFunctions(p: P5) {
  //p5.dom click click events. Notice that there is no this. at the
  //start we don't need to do that here because the event will
  //be added to the button and doesn't 'belong' to the object

  //event handler for the clear button event. Clears the screen
  p.select('#clearButton').mouseClicked(function () {
    p.background(255);

    //call loadPixels to update the drawing state
    //this is needed for the mirror tool
    p.loadPixels();
  });

  //event handler for the save image button. saves the canvsa to the
  //local file system.
  p.select('#saveImageButton').mouseClicked(function () {
    //???
  });
}
