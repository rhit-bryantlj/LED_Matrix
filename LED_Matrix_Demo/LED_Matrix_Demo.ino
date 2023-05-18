#include <SoftwareSerial.h>
#include <WiFiEsp.h>
#include <PubSubClient.h>
#include "MyLED.h"

// setup the Wifi Module
SoftwareSerial esp8266Serial(2, 3); // RX, TX pins for ESP8266 module
WiFiEspClient espClient;
PubSubClient client(espClient);
char numberArray[20];

const char* ssid = "Pike Network";
const char* password = "47WestRange47";
const char* mqtt_server = "broker.hivemq.com";
const int port = 1883;
const char *topic = "Devices/matrix1/image";


// setup the photoResistor
const int photoResistor = A5;
unsigned int photoValue;
unsigned long currentMillis;
unsigned long photoDelay = 2000;

void setup() {
  Serial.begin(9600);
  esp8266Serial.begin(9600);
  lc.shutdown(0,false);
  lc.clearDisplay(0);

  pinMode(photoResistor, INPUT);

  // initialize ESP8266 module
  WiFi.init(&esp8266Serial);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Connecting to WiFi...");
    WiFi.begin(ssid, password);
    delay(2000);
  }

  // connect to MQTT broker
  client.setServer(mqtt_server, port);
  client.setCallback(mqttCallback);
}

void loop() {
  if(!client.connected()){
    connectToMQTT();
  } 

  if(millis() - currentMillis > photoDelay){
    // publish photoresistor data to the MQTT broker
    photoValue = analogRead(photoResistor);
    itoa(photoValue, numberArray, 10);
    if(photoValue < 600){
      drawSmiley();
    } else{
      lc.clearDisplay(0);
    }
    client.publish("Devices/matrix1/curLight", numberArray);
  }
      
    // handle MQTT messages
    client.loop();
}

void connectToMQTT(){
  Serial.println("Connecting to MQTT broker...");
    if (client.connect("led-matrix-arduino")) {
      Serial.println("Connected to MQTT broker");
      client.setCallback(mqttCallback);
      // subscribe to a topic on the MQTT broker
      if(client.subscribe(topic)){
        Serial.print("Client subscribed to : ");
        Serial.println(topic);
      }
    } else {
      Serial.print("Failed to connect to MQTT broker, rc=");
      Serial.println(client.state());
      delay(5000);
    }
}

void mqttCallback(char* topic, byte* payload, unsigned int length){
  // handle incoming MQTT message
  client.publish("Devices/matrix1/curLight", "30");
  Serial.println("Received message from MQTT server:");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}
