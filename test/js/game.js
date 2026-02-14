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
0       // add some inner walls
        this.map[3][3] = 1;
        this.map[3][4] = 1;
        this.map[4][3] = 1;
        // player position
        this.player = {
            x: 1,
            y: 1
        };
        // listen for keyboard input
        window.addEventListener("keydown", (e) => this.handleInput(e));
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
    }



    start() {
        this.drawGrid();
        this.drawPlayer();
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
        this.drawPlayer();
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
