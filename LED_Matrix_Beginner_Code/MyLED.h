#include "LedControl.h"
#include "binary.h"

LedControl lc=LedControl(12,11,10,1);
byte imageState;

// smiley face
byte smiley[8]= {B00111100,B01000010,B10100101,B10000001,B10100101,B10011001,B01000010,B00111100};
// sad face
byte sadFace[8]= {B00111100,B01000010,B10100101,B10000001,B10011001,B10100101,B01000010,B00111100};
// Pacman
byte pacman[8] = {B00000000,B00111000,B01111100,B11111000,B11110011,B11111000,B01111100,B00111000};
// Heart shape
byte heart[8] = {B00000000,B01101100,B11111110,B11111110,B11111110,B01111100,B00111000,B00010000};
// Skull shape
byte skull[8] = {B11111111,B11111111,B10011001,B10011001,B11100111,B01100110,B00111100,B00111100};

void drawSad() {
  // Display sad face
  lc.setRow(0,0,sadFace[0]);
  lc.setRow(0,1,sadFace[1]);
  lc.setRow(0,2,sadFace[2]);
  lc.setRow(0,3,sadFace[3]);
  lc.setRow(0,4,sadFace[4]);
  lc.setRow(0,5,sadFace[5]);
  lc.setRow(0,6,sadFace[6]);
  lc.setRow(0,7,sadFace[7]);
}

void drawSmiley() {
  // Display smiley face
  lc.setRow(0,0,smiley[0]);
  lc.setRow(0,1,smiley[1]);
  lc.setRow(0,2,smiley[2]);
  lc.setRow(0,3,smiley[3]);
  lc.setRow(0,4,smiley[4]);
  lc.setRow(0,5,smiley[5]);
  lc.setRow(0,6,smiley[6]);
  lc.setRow(0,7,smiley[7]);
}

void drawPacman() {
  // Display Pacman
  lc.setRow(0,0,pacman[0]);
  lc.setRow(0,1,pacman[1]);
  lc.setRow(0,2,pacman[2]);
  lc.setRow(0,3,pacman[3]);
  lc.setRow(0,4,pacman[4]);
  lc.setRow(0,5,pacman[5]);
  lc.setRow(0,6,pacman[6]);
  lc.setRow(0,7,pacman[7]);
}

void drawHeart() {
  // Display Heart
  lc.setRow(0,0,heart[0]);
  lc.setRow(0,1,heart[1]);
  lc.setRow(0,2,heart[2]);
  lc.setRow(0,3,heart[3]);
  lc.setRow(0,4,heart[4]);
  lc.setRow(0,5,heart[5]);
  lc.setRow(0,6,heart[6]);
  lc.setRow(0,7,heart[7]);
}

void drawSkull(){
  // Display Skull
  lc.setRow(0,0,skull[0]);
  lc.setRow(0,1,skull[1]);
  lc.setRow(0,2,skull[2]);
  lc.setRow(0,3,skull[3]);
  lc.setRow(0,4,skull[4]);
  lc.setRow(0,5,skull[5]);
  lc.setRow(0,6,skull[6]);
  lc.setRow(0,7,skull[7]);
}

void displayImageByState(byte imageState){
  switch(imageState){
    case 0:
      lc.clearDisplay(0);
      break;
    case 1:
      drawSmiley();
      break;
    case 2:
      drawSad();
      break;
    case 3:
      drawPacman();
      break;
    case 4:
      drawHeart();
      break;
    case 5:
      drawSkull();
      break;
    default:
      lc.clearDisplay(0);
      break; 
  }  
}
