#include <SoftwareSerial.h>
#include <PubSubClient.h>
#include <WiFi.h>

const char* ssid = "Pike Network";
const char* pass = "47WestRange47";
const char* mqtt_server = "28e94f03abe74b9d9de34505c36588f8.s2.eu.hivemq.cloud";
const int mqtt_port = 8883;
const char* mqtt_username = "ledmatrixteam";
const char* mqtt_password = "HivePassForL&J2023";
const char* mqtt_client_id = "matrix1";

const char* mqtt_topic_pub = "Test/Message";
const char* mqtt_topic_sub = "Test/Message";

SoftwareSerial espSerial(2, 3);  // RX, TX pins for ESP-01 module
WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

void setup() {
  Serial.begin(9600);     // initialize the serial communication on the Arduino board
  espSerial.begin(9600); // initialize the serial communication on the ESP-01 module

  mqttClient.setServer(mqtt_server, 8883); // set the MQTT server and port
  mqttClient.setCallback(mqttCallback);          // set the callback function for MQTT events
}

void loop() {
  if (!mqttClient.connected()) { // check if not connected to MQTT server
    reconnectMQTT();            // attempt to reconnect
  }
  mqttClient.loop();             // handle MQTT events

  // publish a message to the MQTT topic
  mqttClient.publish(mqtt_topic_pub, "Hello, MQTT from Arduino!");

  delay(5000);                   // wait 5 seconds before publishing the next message
}

void mqttCallback(char* topic, byte* payload, unsigned int length) {
  // handle incoming MQTT message
  Serial.println("Received message from MQTT server:");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void reconnectMQTT() {
  // attempt to connect to MQTT server
  while (!mqttClient.connected()) {
    if (mqttClient.connect(mqtt_client_id, mqtt_username, mqtt_password)) {
      Serial.println("Connected to MQTT server");
      mqttClient.subscribe(mqtt_topic_sub); // subscribe to MQTT topic
    } else {
      Serial.println("Failed to connect to MQTT server, retrying in 5 seconds...");
      delay(5000);
    }
  }
}
