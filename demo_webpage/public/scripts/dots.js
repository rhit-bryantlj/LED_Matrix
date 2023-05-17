var dots = [];

function initializeDots() {
    let container = document.querySelector("#row1");
    let row = container.querySelectorAll("span");
    dots.push(row);
    container = document.querySelector("#row2");
    row = container.querySelectorAll("span");
    dots.push(row);
    container = document.querySelector("#row3");
    row = container.querySelectorAll("span");
    dots.push(row);
    container = document.querySelector("#row4");
    row = container.querySelectorAll("span");
    dots.push(row);
    container = document.querySelector("#row5");
    row = container.querySelectorAll("span");
    dots.push(row);
    container = document.querySelector("#row6");
    row = container.querySelectorAll("span");
    dots.push(row);
    container = document.querySelector("#row7");
    row = container.querySelectorAll("span");
    dots.push(row);
    container = document.querySelector("#row8");
    row = container.querySelectorAll("span");
    dots.push(row);
}

function smileyMatrix() {
    clearbackgroundColors();
    // row 1
    dots[0][2].style.backgroundColor = "red";
    dots[0][3].style.backgroundColor = "red";
    dots[0][4].style.backgroundColor = "red";
    dots[0][5].style.backgroundColor = "red";
    //row2
    dots[1][1].style.backgroundColor = "red";
    dots[1][6].style.backgroundColor = "red";
    //row3
    dots[2][0].style.backgroundColor = "red";
    dots[2][2].style.backgroundColor = "red";
    dots[2][5].style.backgroundColor = "red";
    dots[2][7].style.backgroundColor = "red";
    //row4
    dots[3][0].style.backgroundColor = "red";
    dots[3][7].style.backgroundColor = "red";
    //row5
    dots[4][0].style.backgroundColor = "red";
    dots[4][2].style.backgroundColor = "red";
    dots[4][5].style.backgroundColor = "red";
    dots[4][7].style.backgroundColor = "red";
    //row6
    dots[5][0].style.backgroundColor = "red";
    dots[5][3].style.backgroundColor = "red";
    dots[5][4].style.backgroundColor = "red";
    dots[5][7].style.backgroundColor = "red";
    //row7
    dots[6][1].style.backgroundColor = "red";
    dots[6][6].style.backgroundColor = "red";
    //row8
    dots[7][2].style.backgroundColor = "red";
    dots[7][3].style.backgroundColor = "red";
    dots[7][4].style.backgroundColor = "red";
    dots[7][5].style.backgroundColor = "red";
}

function frownyMatrix(){
    clearbackgroundColors();
    //row1
    dots[0][2].style.backgroundColor = "red";
    dots[0][3].style.backgroundColor = "red";
    dots[0][4].style.backgroundColor = "red";
    dots[0][5].style.backgroundColor = "red";
    //row2
    dots[1][1].style.backgroundColor = "red";
    dots[1][6].style.backgroundColor = "red";
    //row3
    dots[2][0].style.backgroundColor = "red";
    dots[2][2].style.backgroundColor = "red";
    dots[2][5].style.backgroundColor = "red";
    dots[2][7].style.backgroundColor = "red";
    //row4
    dots[3][0].style.backgroundColor = "red";
    dots[3][7].style.backgroundColor = "red";
    //row5
    dots[4][0].style.backgroundColor = "red";
    dots[4][3].style.backgroundColor = "red";
    dots[4][4].style.backgroundColor = "red";
    dots[4][7].style.backgroundColor = "red";
    //row6
    dots[5][0].style.backgroundColor = "red";
    dots[5][2].style.backgroundColor = "red";
    dots[5][5].style.backgroundColor = "red";
    dots[5][7].style.backgroundColor = "red";
    //row7
    dots[6][1].style.backgroundColor = "red";
    dots[6][6].style.backgroundColor = "red";
    //row8
    dots[7][2].style.backgroundColor = "red";
    dots[7][3].style.backgroundColor = "red";
    dots[7][4].style.backgroundColor = "red";
    dots[7][5].style.backgroundColor = "red";
}

function pacmanMatrix(){
    clearbackgroundColors();
    //row1
    //row2
    dots[1][2].style.backgroundColor = "red";
    dots[1][3].style.backgroundColor = "red";
    dots[1][4].style.backgroundColor = "red";
    //row3
    for(let i = 1; i <= 5; i++){
        dots[2][i].style.backgroundColor = "red";
    }
    //row4
    for(let i = 0; i <= 4; i++){
        dots[3][i].style.backgroundColor = "red";
    }
    //row5
    for(let i = 0; i <= 7; i++){
        if(i != 4 && i != 5){
            dots[4][i].style.backgroundColor = "red";
        }
    }
    //row6
    for(let i = 0; i <= 4; i++){
        dots[5][i].style.backgroundColor = "red";
    }
    //row 7
    for(let i = 1; i <= 5; i++){
        dots[6][i].style.backgroundColor = "red";
    }
    //row8
    dots[7][2].style.backgroundColor = "red";
    dots[7][3].style.backgroundColor = "red";
    dots[7][4].style.backgroundColor = "red";
}

function heartMatrix(){
    clearbackgroundColors();
    //row1
    //row2
    dots[1][1].style.backgroundColor = "red";
    dots[1][2].style.backgroundColor = "red";
    dots[1][4].style.backgroundColor = "red";
    dots[1][5].style.backgroundColor = "red";
    //row3
    for(let i = 0; i <= 6; i++){
        dots[2][i].style.backgroundColor = "red";
    }
    //row4
    for(let i = 0; i <= 6; i++){
        dots[3][i].style.backgroundColor = "red";
    }
    //row5
    for(let i = 0; i <= 6; i++){
        dots[4][i].style.backgroundColor = "red";
    }
    //row6
    for(let i = 1; i <= 5; i++){
        dots[5][i].style.backgroundColor = "red";
    }
    //row7
    for(let i = 2; i <= 4; i++){
        dots[6][i].style.backgroundColor = "red";
    }
    //row8
    dots[7][3].style.backgroundColor = "red";
}

function skullMatrix(){
    clearbackgroundColors();
    let i;
    //row 1 & 2
    for(i = 0; i < 2; i++){
        for(let j = 0; j < 8; j++){
            dots[i][j].style.backgroundColor = "red";
        }
    }
    //row3
    dots[2][0].style.backgroundColor = "red";
    dots[2][3].style.backgroundColor = "red";
    dots[2][4].style.backgroundColor = "red";
    dots[2][7].style.backgroundColor = "red";
    //row4
    dots[3][0].style.backgroundColor = "red";
    dots[3][3].style.backgroundColor = "red";
    dots[3][4].style.backgroundColor = "red";
    dots[3][7].style.backgroundColor = "red";
    //row5
    for(i = 0; i <= 7; i++){
        if(i != 3 && i != 4){
            dots[4][i].style.backgroundColor = "red";
        }
    }
    //row6
    dots[5][1].style.backgroundColor = "red";
    dots[5][2].style.backgroundColor = "red";
    dots[5][5].style.backgroundColor = "red";
    dots[5][6].style.backgroundColor = "red";
    //row 7 & 8
    for(i = 6; i <= 7; i++){
        for(let j = 2; j <= 5; j++){
            dots[i][j].style.backgroundColor = "red";
        }
    }
}

function clearbackgroundColors() {
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            dots[i][j].style.backgroundColor = "gray";
        }
    }
}

function turnOnMatrixWithImage(image, matrixEnabled){
    if(image === "Smiley"){
        if(matrixEnabled)
            smileyMatrix();
    }
    if(image === "Frowny"){
        if(matrixEnabled)
            frownyMatrix();
    }
    if(image === "Pacman"){
        if(matrixEnabled)
            pacmanMatrix();
    }
    if(image === "Heart"){
        if(matrixEnabled)
            heartMatrix();
    }
    if(image === "Skull"){
        if(matrixEnabled)
            skullMatrix();
    }
}