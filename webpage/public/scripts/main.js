var imageText = "";
var curentLight = 0;

// Create a client instance
client = new Paho.MQTT.Client("28e94f03abe74b9d9de34505c36588f8.s2.eu.hivemq.cloud", Number(8884),"javascriptwebpages");
// client = new Paho.MQTT.Client("broker.hivemq.com", 8000, "clientid123456");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

function main(){
    console.log("Ready");

    MQTTconnect();

    document.querySelector("#smileyButton").onclick = (event) =>{
        console.log("publish smiley")
        imageText = "Smiley";
        updateImageText();
    };

    document.querySelector("#frownyButton").onclick = (event) =>{
        console.log("publish frowny")
        imageText = "Frowny";
        updateImageText();
    };

    document.querySelector("#pacmanButton").onclick = (event) =>{
        console.log("publish pacman")
        imageText = "Pacman";
        updateImageText();
    };

    document.querySelector("#heartButton").onclick = (event) =>{
        console.log("publish heart")
        imageText = "Heart";
        updateImageText();
    };

    document.querySelector("#skullButton").onclick = (event) =>{
        console.log("publish skull")
        imageText = "Skull";
        updateImageText();
    };

    document.querySelector("#thresholdUpdateButton").onclick = (event) =>{
        let thresholdNum = document.querySelector("#thresholdInput").value;
        if(thresholdNum > 0 && thresholdNum < 1024){
            message = new Paho.MQTT.Message(thresholdNum);
            message.destinationName = "Devices/matrix1/threshold";
            client.send(message);
            document.querySelector("#lightThresholdVal").innerHTML = thresholdNum;
        }
    };
}

// connect the client
function MQTTconnect(){
  client.connect({onSuccess:onConnect,
                  userName : "ledmatrixteam",
                  password : "HivePassForL&J2023",
                  useSSL : true
  });
}

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("Connection successful, will now subscribe to topics");
  client.subscribe("Devices/matrix1/status");
  client.subscribe("Devices/matrix1/curLight");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("Message Arrived: "+message.payloadString);
  console.log("Topic: " + message.destinationName);
}

function updateImageText(){
    message = new Paho.MQTT.Message(imageText);
    message.destinationName = "Devices/matrix1/image";
    client.send(message);
    document.querySelector("#matrixImage").innerHTML = imageText;
}

main();