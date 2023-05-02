var imageText = "";
var curentLight = 0;

function main(){
    console.log("Ready");

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
            document.querySelector("#lightThresholdVal").innerHTML = thresholdNum;
        }
    };
}

function updateImageText(){
    document.querySelector("#matrixImage").innerHTML = imageText;
}

main();