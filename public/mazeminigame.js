const maze_output = document.querySelector('#maze-game-output');

// defines a 17x17 2D maze array
let maze = new Array(17).fill(null).map(() => new Array(17).fill(0));
function initialiseMaze(){
    for (let i = 0; i < 17; i++) {
        for (let j = 0; j < 17; j++) {
            if (i == 0 || i == 16 || j == 0 || j == 16) {
                maze[i][j] = 1;
            }
        }
    }

}

for (let i = 0; i < 17; i++) {
    for (let j = 0; j < 17; j++) {
        if (i == 0 || i == 16 || j == 0 || j == 16) {
            maze[i][j] = 1;
        }
    }
}

/* c++ maze code to help with logical creation of maze generation, depth first search algorithm 

int dir[] = {0,1,2,3};
maze[y][x] = 1;

for (int i = 0; i < 4; ++i) {
	int j = rand() % (4 - i) + i;
	swap(dir[i], dir[j]);
}
for (int d : dir) {
	int nx = x;
	int ny = y;
	switch (d) {
	case 0:
		nx += 2;
		break;
	case 1:
		nx -= 2;
		break;
	case 2:
		ny += 2;
		break;
	case 3:
		ny -= 2;
		break;
	}
	if (ny > 0 && ny < height - 1 && nx > 0 && nx < width - 1 && maze[ny][nx] == 0) { // if the new x and y is inside the maze and is a wall and both nx and ny are valid indices 
		maze[y + (ny - y) / 2][x + (nx - x) / 2] = 1;
		carveMaze(nx, ny);
	}
}
*/









let mazeValue = "";
for (let i = 0; i < 17; i++) {
    for (let j = 0; j < 17; j++) {
        mazeValue += maze[i][j] + "  ";    
    }
    mazeValue += "<br>";
}
maze_output.innerHTML = mazeValue;