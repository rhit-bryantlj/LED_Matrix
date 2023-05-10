#include <SoftwareSerial.h>
#include <WiFiEsp.h>
#include <PubSubClient.h>
//#include<WiFiEspClient.h>

SoftwareSerial esp8266Serial(2, 3); // RX, TX pins for ESP8266 module
WiFiEspClient espClient;
PubSubClient client(espClient);

const char* ssid = "Pike Network";
const char* password = "47WestRange47";
const char* mqtt_server = "broker.hivemq.com";
const int port = 1883;
//const char* mqtt_user = "ledmatrixteam";
//const char* mqtt_pass = "HivePassForL&J2023";

void setup() {
  Serial.begin(9600);
  esp8266Serial.begin(9600);

  // initialize ESP8266 module
  WiFi.init(&esp8266Serial);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Connecting to WiFi...");
    WiFi.begin(ssid, password);
    delay(5000);
  }

  // connect to MQTT broker
  client.setServer(mqtt_server, port);
  client.setCallback(mqttCallback);
  while (!client.connected()) {
    Serial.println("Connecting to MQTT broker...");
    if (client.connect("arduino")) {
      Serial.println("Connected to MQTT broker");
    } else {
      Serial.print("Failed to connect to MQTT broker, rc=");
      Serial.println(client.state());
      delay(5000);
    }
  }
}

void loop() {
  // publish a message to the MQTT broker
//  client.publish("LEDmatrix/Test/pub", "Hello, world!");

  // subscribe to a topic on the MQTT broker
  client.subscribe("LEDmatrix/Test/sub");

  // handle MQTT messages
  client.loop();
}

void mqttCallback(char* topic, byte* payload, unsigned int length) {
  // handle incoming MQTT message
  Serial.println("Received message from MQTT server:");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}
