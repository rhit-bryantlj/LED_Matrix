#include <WiFiEsp.h>
#include <WiFiEspClient.h>
#include <WiFiEspUdp.h>
#include <SoftwareSerial.h>
#include <PubSubClient.h>

void reconnect_mqtt();

// WiFi
const char *ssid = "network name";
const char *password = "network pass";
int status = WL_IDLE_STATUS;

// setup the esp8266
const byte rxPin = 2; // Wire this to Tx Pin of ESP8266
const byte txPin = 3; // Wire this to Rx Pin of ESP8266
// We'll use a software serial interface to connect to ESP8266
SoftwareSerial esp8266 (rxPin, txPin);

// MQTT Broker setup
const char *mqtt_broker = "28e94f03abe74b9d9de34505c36588f8.s2.eu.hivemq.cloud";
const char *topic = "LEDDevice1/test";
const char *mqtt_username = "ledmatrixteam";
const char *mqtt_password = "HivePassForL&J2023";
const int mqtt_port = 8883;

WiFiEspClient  espClient;
PubSubClient client(espClient);

void setup() {
  // Initialize serial
  Serial.begin(9600);
  // Initialize serial for ESP module
  esp8266.begin(9600);

  // initialize esp module
  WiFi.init(&esp8266);

//  if(WiFi.status() == WL_NO_SHIELD){
//    Serial.println("WiFi shield not present");
//    // dont continue
//    while(1);
//  }

  // attempt to connect to wifi network
  while( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to WPA SSID: ");
    Serial.println(ssid);
    // try to connect
    status = WiFi.begin(ssid,password);
  }

  Serial.println("Connected to wifi");

  client.setServer(mqtt_broker, mqtt_port); 
  client.setCallback(callback);

}

void callback(char *topic, byte *payload, unsigned int length) {
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
      Serial.print((char) payload[i]);
  }
  Serial.println();
  Serial.println("-----------------------");
}

void loop() {
  if(!client.connected()){
    reconnect_mqtt();
  }
  client.loop();
}

void reconnect_mqtt() {
  while (!client.connected()) {
    String client_id = "esp8266-ledmatrix-test1";
    Serial.println("Attempting MQTT connection...");
    if(client.connect(client_id.c_str(),mqtt_username, mqtt_password)){
      Serial.println("MQTT connected");
    }
  }
  // publish and subscribe
  client.publish(topic, "hello hivemq");
  client.subscribe(topic);
}
