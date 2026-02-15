import { Game } from "./game.js";

window.onload = () => {

    const buttons = document.querySelectorAll("#menu button");
    const menu = document.getElementById("menu");
    const gameContainer = document.getElementById("gameContainer");
    const score = document.getElementById("score");

    buttons.forEach(button => {
        button.addEventListener("click", () => {

            const size = button.dataset.size;

            menu.style.display = "none";
            gameContainer.style.display = "flex";
            score.style.display = "block";

            const game = new Game(size);
            game.start();
        });
    });

};
