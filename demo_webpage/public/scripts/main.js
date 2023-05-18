// client = new Paho.MQTT.Client("28e94f03abe74b9d9de34505c36588f8.s2.eu.hivemq.cloud", Number(8884),"demopage");
client = new Paho.MQTT.Client("broker.hivemq.com", 8884, "javascriptdemopageforledmatrix");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

var image = "Smiley";
var matrixEnabled = true;
var currentLight = 200;
var threshold = 400;

function main(){
    initializeDots();
    MQTTconnect();
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
    client.subscribe("Devices/matrix1/image");
    client.subscribe("Devices/matrix1/threshold");
    client.subscribe("Devices/matrix1/curLight");
    client.subscribe("Devices/matrix1/status");
  }
  
  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }
  
  // called when a message arrives
  function onMessageArrived(message) {
    console.log("Topic: " + message.destinationName);
    console.log("Message Arrived: "+message.payloadString);
  
    if(message.destinationName === "Devices/matrix1/image"){
        if(message.payloadString === "Smiley"){
            image = "Smiley";
            if(matrixEnabled && currentLight<threshold)
                smileyMatrix();
        }
        if(message.payloadString === "Frowny"){
            image = "Frowny";
            if(matrixEnabled && currentLight<threshold)
                frownyMatrix();
        }
        if(message.payloadString === "Pacman"){
            image = "Pacman";
            if(matrixEnabled && currentLight<threshold)
                pacmanMatrix();
        }
        if(message.payloadString === "Heart"){
            image = "Heart";
            if(matrixEnabled && currentLight<threshold)
                heartMatrix();
        }
        if(message.payloadString === "Skull"){
            image = "Skull";
            if(matrixEnabled && currentLight<threshold)
                skullMatrix();
        }
    } else if(message.destinationName === "Devices/matrix1/curLight"){
        if(Number(message.payloadString) == NaN){
            console.log("Bad message received from mqtt: not a number format for data");
          } else{
            currentLight = Number(message.payloadString);
            if(currentLight < threshold)
                turnOnMatrixWithImage(image, matrixEnabled);
            if(currentLight > threshold)
                clearbackgroundColors();
          }
    } else if(message.destinationName === "Devices/matrix1/threshold"){
        if(Number(message.payloadString) == NaN){
            console.log("Bad message received from mqtt: not a number format for data");
          } else{
            threshold = Number(message.payloadString);
            if(currentLight<threshold)
                turnOnMatrixWithImage(image, matrixEnabled);
            if(currentLight>threshold)
                clearbackgroundColors();
          }
    }else if(message.destinationName === "Devices/matrix1/status"){
        if(message.payloadString === "Enable"){
            matrixEnabled = true;
            if(currentLight > threshold){
                turnOnMatrixWithImage(image, matrixEnabled);
            }
        } else if( message.payloadString === "Disable"){
            matrixEnabled = false;
            clearbackgroundColors();
        }
    } else {
      console.log("Topic does not exist for this webpage");
    }
  }

  main();