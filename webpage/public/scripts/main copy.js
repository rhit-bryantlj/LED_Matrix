var rhit = rhit || {};
const guessUrl = "http://localhost:3000/api/guess/";
const gameStateUrl = "http://localhost:3000/api/gameState";
const resetGameUrl = "http://localhost:3000/api/random";
const gameOverUrl = "http://localhost:3000/api/gameOver"

rhit.PageController = class {
	
	constructor() {
		//TODO: Update this when the game is over
		this.gameOver = false;
		this.shipSunk = "None";
		this.guesses = 0;

		const squares = document.querySelectorAll(".square");
		for (const square of squares) {
			square.onclick = (event) => {
				const buttonIndex = parseInt(square.dataset.buttonIndex);
				this.pressedButtonAtIndex(buttonIndex);
				this.updateView();
			};
		}
		document.querySelector("#newGameButton").onclick = (event) => {
			console.log( "New Game Button Clicked!"  );
			this.shipSunk = "None";
			this.gameOver = false;
			fetch(resetGameUrl,
				{method: "DELETE"}
			).then(() => {
				this.updateView();
			}).catch(err =>{
				console.log(err);
			});
		};
		this.updateView();
	}

	updateView() {
		const squares = document.querySelectorAll(".square");

		let temporaryGameState = {};
		fetch(gameStateUrl)
		.then(response => response.json())
		.then(data =>{
			temporaryGameState = data.gameState;
			
			for (let i = 0; i < squares.length; i++) {
				let row = Math.floor( i / 5 );
				let col = Math.floor( i % 5 );
				let value = temporaryGameState[row][col];
				squares[i].innerHTML = value;
			}

			if(this.gameOver){
				document.querySelector("#gameStateText").innerHTML = `Victory in ${this.guesses} guesses`;
			}
			else if(this.shipSunk != "None"){
				document.querySelector("#gameStateText").innerHTML = `You sunk the ${this.shipSunk}!`;
			} else{
				document.querySelector("#gameStateText").innerHTML = `Click to fire!`;
			}
		});

	}

	pressedButtonAtIndex(buttonIndex) {
		console.log( "Button Pressed: " + buttonIndex );
		if(!this.gameOver){
			let fetchUrl = guessUrl + `${Math.floor( buttonIndex/ 5)}/${Math.floor(buttonIndex % 5)}`;
			fetch(fetchUrl, {
				method: "POST",
				headers: {"Content-Type": "application/json"},
			}).then(response=> response.json())
			.then(data =>{
				this.shipSunk = data.ship_sunk;
				this.checkForGameOver();
				this.updateView();
			})
			.catch(err =>{
				console.log(err);
			});
		}
	}

	checkForGameOver() {
		fetch(gameOverUrl)
		.then(response => response.json())
		.then(data =>{
			this.gameOver = data.gameOver;
			this.guesses = data.guesses;
		});
	}


};

rhit.main = function () {
	console.log("Ready");
	new rhit.PageController();

};

rhit.main();