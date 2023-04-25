/*
 Created by Rui Santos
 
 All the resources for this project:
 http://randomnerdtutorials.com/
*/

#include "LedControl.h"
#include "binary.h"
#include "MyLED.h"

/*
 DIN connects to pin 12
 CLK connects to pin 11
 CS connects to pin 10 
*/

// delay time between faces
unsigned long delaytime=1000;

const int photoResistor = A5;
unsigned int photoValue;

void setup() {
  Serial.begin(57600);
  lc.shutdown(0,false);
  // Set brightness to a medium value
  lc.setIntensity(0,8);
  // Clear the display
  lc.clearDisplay(0);
  imageState = 0;
  pinMode(photoResistor, INPUT);
}

void drawFaces(){
  drawSad();
  delay(delaytime);
  
  drawSmiley();
  delay(delaytime);

  drawPacman();
  delay(delaytime);

  drawHeart();
  delay(delaytime);

  drawSkull();
  delay(delaytime);
}

void loop(){
//  drawFaces();
photoValue = analogRead(photoResistor);
if(photoValue > 600)
  imageState = 0;
else{
  imageState = 3;
}
displayImageByState(imageState);
  
Serial.println(photoValue);
delay(delaytime);

}
