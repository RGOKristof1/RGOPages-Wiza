export class Game {
    constructor() {

        // map size and walls
        // canvas and context
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        // random tile size and corresponding rows and cols
        const values = [50, 25, 20];
        const randomValue = values[Math.floor(Math.random() * values.length)];
        // tile size
        this.tileSize = randomValue;
        // rows
        if (this.tileSize === 50) {
            this.rows = 10;
        }
        else if (this.tileSize === 25) {
            this.rows = 20;
        }
        else if (this.tileSize === 20) {
            this.rows = 25;
        }

        // cols
        if (this.tileSize === 50) {
            this.cols = 10;
        }
        else if (this.tileSize === 25) {
            this.cols = 20;
        }
        else if (this.tileSize === 20) {
            this.cols = 25;
        }
        // create map with walls around and some inner walls
        this.map = [];
        for (let y = 0; y < this.rows; y++) {
            let row = [];
            for (let x = 0; x < this.cols; x++) {
                if (y === 0 || y === this.rows - 1 || x === 0 || x === this.cols - 1) {
                    row.push(1); // wall
                } else {
                    row.push(0); // floor
                }
            }
            this.map.push(row);
        }

        let wallCount = 0;

        if (this.tileSize === 50) {
            wallCount = Math.floor(Math.random() * 10) + 10;
        }
        else if (this.tileSize === 25) {
            wallCount = Math.floor(Math.random() * 25) + 25;
        }
        else if (this.tileSize === 20) {
            wallCount = Math.floor(Math.random() * 50) + 50;
        }


        for (let i = 0; i < wallCount; i++) {

            let wallX, wallY;

            do {
                wallX = Math.floor(Math.random() * (this.cols - 2)) + 1;
                wallY = Math.floor(Math.random() * (this.rows - 2)) + 1;
            }
            while (
                this.map[wallY][wallX] === 1 ||   // már fal
                (wallX <= 3 && wallY <= 3)       // tiltott 0-5 zóna
            );

            this.map[wallY][wallX] = 1;
        }

        // add some inner walls
        // this.map[3][3] = 1;
        // this.map[3][4] = 1;
        // this.map[4][3] = 1;
        // player position
        this.player = {
            x: 1,
            y: 1
        };
        // listen for keyboard input
        window.addEventListener("keydown", (e) => this.handleInput(e));

        // SCORE
        this.score = 0;

        // GOAL generálás
        this.generateGoal();

        this.scoreElement = document.getElementById("score");
        this.updateScore();

    }


    isWalkable(x, y) {
        if (x < 0 || x >= this.cols) return false;
        if (y < 0 || y >= this.rows) return false;

        return this.map[y][x] === 0;
    }


    drawPlayer() {
        this.ctx.fillStyle = "lime";
        this.ctx.fillRect(
            this.player.x * this.tileSize,
            this.player.y * this.tileSize,
            this.tileSize,
            this.tileSize
        );
    }

    handleInput(e) {
        let newX = this.player.x;
        let newY = this.player.y;

        if (e.key === "ArrowUp") newY--;
        if (e.key === "ArrowDown") newY++;
        if (e.key === "ArrowLeft") newX--;
        if (e.key === "ArrowRight") newX++;

        if (this.isWalkable(newX, newY)) {
            this.player.x = newX;
            this.player.y = newY;
            this.redraw();
        }
        if (this.player.x === this.goal.x &&
            this.player.y === this.goal.y) {

            this.score++;
            this.generateGoal();
        }
        if (this.player.x === this.goal.x &&
    this.player.y === this.goal.y) {

    this.score++;
    this.updateScore();
    this.generateGoal();
    this.redraw();
}


    }


    generateGoal() {
        let x, y;

        do {
            x = Math.floor(Math.random() * (this.cols - 2)) + 1;
            y = Math.floor(Math.random() * (this.rows - 2)) + 1;
        }
        while (
            this.map[y][x] === 1 ||               // ne legyen fal
            (x === this.player.x && y === this.player.y) // ne player alatt legyen
        );

        this.goal = { x, y };
    }

    drawGoal() {
        this.ctx.fillStyle = "gold";
        this.ctx.fillRect(
            this.goal.x * this.tileSize,
            this.goal.y * this.tileSize,
            this.tileSize,
            this.tileSize
        );
    }

    updateScore() {
    this.scoreElement.textContent = "Score: " + this.score;
}

    start() {
        this.drawGrid();
        this.drawPlayer();
        this.drawGoal();
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
        this.drawPlayer();
        this.drawGoal();

    }


    drawGrid() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {

                if (this.map[y][x] === 1) {
                    this.ctx.fillStyle = "darkred";
                    this.ctx.fillRect(
                        x * this.tileSize,
                        y * this.tileSize,
                        this.tileSize,
                        this.tileSize
                    );
                }

                this.ctx.strokeStyle = "gray";
                this.ctx.strokeRect(
                    x * this.tileSize,
                    y * this.tileSize,
                    this.tileSize,
                    this.tileSize
                );
            }
        }
    }



}
