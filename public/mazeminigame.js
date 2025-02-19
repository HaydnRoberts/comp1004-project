const maze_output = document.querySelector('#maze-game-output');

let score = 0;

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
  }

// defines a 17x17 2D maze array

function initialiseMaze(){
	let maze = new Array(17).fill(null).map(() => new Array(17).fill(0));
    for (let i = 0; i < 17; i++) {
        for (let j = 0; j < 17; j++) {
            maze[i][j] = 1;
        }
    }

}
initialiseMaze();
/*
for (let i = 0; i < 17; i++) {
    for (let j = 0; j < 17; j++) {
        if (i == 0 || i == 16 || j == 0 || j == 16) {
            maze[i][j] = 1;
        }
    }
}*/

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = getRandomInt(i + 1);
        [array[i], array[j]] = [array[j], array[i]]; // Proper swap
    }
}


function carveMaze(x, y){
	let dir = [0, 1, 2, 3];
	maze[y][x] = 0;
	for (let i=0;i<4;i++){
		let j = getRandomInt(4-i) + i;
		shuffleArray(dir);
	}
	for (let d of dir) {
		let newX = x;
		let newY = y;
		switch(d){
			case 0:
				newX += 2;
				break;
			case 1:
				newX -= 2;
				break;
			case 2:
				newY += 2;
				break;
			case 3:
				newY -= 2;
				break;
		}
		if (newY > 0 && newY < 16 && newX > 0 && newX < 16 && maze[newY][newX] == 1){
			maze[y+(newY-y)/2][x+(newX-x)/2]=0;
			carveMaze(newX, newY);
		}
	}
}


carveMaze(1,1);
maze[1][1]=2; // starting point
maze[16][15]=3 // end point


function renderMaze(){
	let mazeValue = "<pre style='font-size: 18px; line-height: 1; letter-spacing: 2px;'>";
	mazeValue += "Score: ";
	mazeValue += score;
	mazeValue += "<br>";


	for (let i = 0; i < 17; i++) {
		for (let j = 0; j < 17; j++) {
			if (maze[i][j] === 1) {
				mazeValue += "⬛"; // Wall
			} else if (maze[i][j] === 0) {
				mazeValue += "⬜"; // Walkable path
			} else if (maze[i][j] === 2) {
				mazeValue += "🚶"; // Player
			}else if (maze[i][j] === 3) {
				mazeValue += "🚪"; // Exit
			}
		}
		mazeValue += "<br>";
	}
	mazeValue += "</pre>";
	if (maze[16][15] === 2){
		mazeValue += "<br> YOU WIN!"
	}
	maze_output.innerHTML = mazeValue;
	
}
renderMaze();


function upMaze(){
	for (let i = 0; i < 17; i++) {
		for (let j = 0; j < 17; j++) {
			if (maze[i][j] === 2) {
				if(maze[i-1][j] === 0){
					maze[i][j] = 0;
					maze[i-1][j]=2;
				}
				renderMaze();
				return;
			}
		}
	}
	
}
function leftMaze(){
	for (let i = 0; i < 17; i++) {
		for (let j = 0; j < 17; j++) {
			if (maze[i][j] === 2) {
				if(maze[i][j-1] === 0){
					maze[i][j] = 0;
					maze[i][j-1]=2;
				}
				renderMaze();
				return;
			}
		}
	}
}
function rightMaze(){
	for (let i = 0; i < 17; i++) {
		for (let j = 0; j < 17; j++) {
			if (maze[i][j] === 2) {
				if(maze[i][j+1] === 0){
					maze[i][j] = 0;
					maze[i][j+1]=2;
				}
				renderMaze();
				return;
			}
		}
	}
}
function downMaze(){
	for (let i = 0; i < 17; i++) {
		for (let j = 0; j < 17; j++) {
			if (maze[i][j] === 2) {
				if(maze[i+1][j] === 0){
					maze[i][j] = 0;
					maze[i+1][j]=2;
				} else if (maze[i+1][j] === 3){
					maze[i][j] = 0;
					maze[i+1][j]=2;
				}
				renderMaze();
				return;
			}
			
		}
	}
}