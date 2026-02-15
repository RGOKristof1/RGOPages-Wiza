export class Game {
    constructor(size) {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        if (size === "small") {
            this.tileSize = 50;
            this.rows = 10;
            this.cols = 10;
        }
        else if (size === "medium") {
            this.tileSize = 25;
            this.rows = 20;
            this.cols = 20;
        }
        else {
            this.tileSize = 20;
            this.rows = 25;
            this.cols = 25;
        }

        this.map = [];
        for (let y = 0; y < this.rows; y++) {
            let row = [];
            for (let x = 0; x < this.cols; x++) {
                if (y === 0 || y === this.rows - 1 || x === 0 || x === this.cols - 1) {
                    row.push(1);
                } else {
                    row.push(0);
                }
            }
            this.map.push(row);
        }

        let wallCount;
        if (this.tileSize === 50) wallCount = Math.floor(Math.random() * 10) + 10;
        else if (this.tileSize === 25) wallCount = Math.floor(Math.random() * 25) + 25;
        else wallCount = Math.floor(Math.random() * 50) + 50;

        for (let i = 0; i < wallCount; i++) {
            let wallX, wallY;
            do {
                wallX = Math.floor(Math.random() * (this.cols - 2)) + 1;
                wallY = Math.floor(Math.random() * (this.rows - 2)) + 1;
            } while (
                this.map[wallY][wallX] === 1 ||
                (wallX <= 3 && wallY <= 3)
            );
            this.map[wallY][wallX] = 1;
        }

        this.player = { x: 1, y: 1 };
        this.score = 0;
        this.scoreElement = document.getElementById("score");

        this.generateGoal();
        this.updateScore();

        window.addEventListener("keydown", (e) => this.handleInput(e));

        this.wallImage = new Image();
        this.wallImage.src = "img/texture/walls/wall1.jpg";

        this.wallImage.onload = () => {
            this.redraw();
        };

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

        if (this.player.x === this.goal.x && this.player.y === this.goal.y) {
            this.score++;
            this.updateScore();
            this.generateGoal();
            this.redraw();
        }
    }

    isWalkable(x, y) {
        if (x < 0 || x >= this.cols) return false;
        if (y < 0 || y >= this.rows) return false;
        return this.map[y][x] === 0;
    }

    generateGoal() {
        let x, y;
        do {
            x = Math.floor(Math.random() * (this.cols - 2)) + 1;
            y = Math.floor(Math.random() * (this.rows - 2)) + 1;
        } while (
            this.map[y][x] === 1 ||
            (x === this.player.x && y === this.player.y)
        );
        this.goal = { x, y };
    }

    updateScore() {
        if (this.scoreElement) {
            this.scoreElement.textContent = "Score: " + this.score;
        }
    }

    start() {
        this.drawGrid();
        this.drawGoal();
        this.drawPlayer();
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
        this.drawGoal();
        this.drawPlayer();
    }

    drawGrid() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.map[y][x] === 1) {
                    if (this.wallImage.complete) {
                        this.ctx.drawImage(
                            this.wallImage,
                            x * this.tileSize,
                            y * this.tileSize,
                            this.tileSize,
                            this.tileSize
                        );
                    } else {
                        // fallback ha még nem töltött be
                        this.ctx.fillStyle = "darkred";
                        this.ctx.fillRect(
                            x * this.tileSize,
                            y * this.tileSize,
                            this.tileSize,
                            this.tileSize
                        );
                    }
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

    drawPlayer() {
        this.ctx.fillStyle = "lime";
        this.ctx.fillRect(
            this.player.x * this.tileSize,
            this.player.y * this.tileSize,
            this.tileSize,
            this.tileSize
        );
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
}
