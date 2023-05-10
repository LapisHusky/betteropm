(() => {
    function install() {
        const I = [[[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]],
            J = [[[1, 0, 0], [1, 1, 1], [0, 0, 0]], [[0, 1, 1], [0, 1, 0], [0, 1, 0]], [[0, 0, 0], [1, 1, 1], [0, 0, 1]], [[0, 1, 0], [0, 1, 0], [1, 1, 0]]],
            L = [[[0, 0, 1], [1, 1, 1], [0, 0, 0]], [[0, 1, 0], [0, 1, 0], [0, 1, 1]], [[0, 0, 0], [1, 1, 1], [1, 0, 0]], [[1, 1, 0], [0, 1, 0], [0, 1, 0]]],
            O = [[[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]],
            S = [[[0, 1, 1], [1, 1, 0], [0, 0, 0]], [[0, 1, 0], [0, 1, 1], [0, 0, 1]], [[0, 0, 0], [0, 1, 1], [1, 1, 0]], [[1, 0, 0], [1, 1, 0], [0, 1, 0]]],
            T = [[[0, 1, 0], [1, 1, 1], [0, 0, 0]], [[0, 1, 0], [0, 1, 1], [0, 1, 0]], [[0, 0, 0], [1, 1, 1], [0, 1, 0]], [[0, 1, 0], [1, 1, 0], [0, 1, 0]]],
            Z = [[[1, 1, 0], [0, 1, 1], [0, 0, 0]], [[0, 0, 1], [0, 1, 1], [0, 1, 0]], [[0, 0, 0], [1, 1, 0], [0, 1, 1]], [[0, 1, 0], [1, 1, 0], [1, 0, 0]]];

        const ROW = 20;
        const COL = COLUMN = 10;
        const VACANT = [255, 255, 255];
        let TetroX = -16;
        let TetroY = 16;

// draw a square
        function drawSquare(x, y, color) {
            OWOP.net.protocol.placeBucket.canSpend(0);
            if(OWOP.net.protocol.placeBucket.allowance > 1) OWOP.world.setPixel(TetroX + x, TetroY + y, color);
            else setTimeout(() => {
                OWOP.world.setPixel(TetroX + x, TetroY + y, color);
            }, 41);
        }

// create the board

        let board = [];

// draw the board
        function drawBoard() {
            for (r = 0; r < ROW; r++) {
                for (c = 0; c < COL; c++) {
                    if((c !== scorePixels.x || r != scorePixels.y) ||
                        (board[r][c][0] !== 255 && board[r][c][1] == 255 && board[r][c][2] !== 255)) drawSquare(c, r, board[r][c]);
                    else if(board[r][c][0] === 255 && board[r][c][1] === 255 && board[r][c][2] === 255 && score >= 10)
                        drawSquare(c, r, [220,220,220]);
                }
            }
            for (let i = 0; i < ROW; i++) OWOP.world.setPixel(TetroX-1, TetroY + i, [0, 0, 0]);
            for (let i = 0; i < ROW; i++) OWOP.world.setPixel(TetroX + COL, TetroY + i, [0, 0, 0]);
            for (let i = -1; i <= COL; i++) OWOP.world.setPixel(TetroX + i, TetroY + ROW, [0, 0, 0]);
        }

// the pieces and their colors

        const PIECES = [
            [Z, [255, 0, 0], "Z"],
            [S, [0, 255, 0], "S"],
            [T, [128, 0, 255], "T"],
            [O, [255, 255, 0], "O"],
            [L, [255, 128, 0], "L"],
            [I, [0, 255, 255], "I"],
            [J, [0, 0, 255], "J"]
        ];

// generate random pieces

        function randomPiece() {
            let r = randomN = Math.floor(Math.random() * PIECES.length); // 0 -> 6
            return new Piece(PIECES[r][0], PIECES[r][1], PIECES[r][2]);
        }

        let p = randomPiece();
        let pNext = randomPiece();

// The Object Piece

        function Piece(tetromino, color, name) {
            this.tetromino = tetromino;
            this.color = color;
            this.name = name;

            this.tetrominoN = 0; // we start from the first pattern
            this.activeTetromino = this.tetromino[this.tetrominoN];

            // we need to control the pieces
            this.x = 3;
            this.y = -2;
        }

// fill function

        Piece.prototype.fill = function (color) {
            drawBoard();
            for (r = 0; r < this.activeTetromino.length; r++) {
                for (c = 0; c < this.activeTetromino.length; c++) {
                    // we draw only occupied squares
                    if (this.activeTetromino[r][c]) {
                        drawSquare(this.x + c, this.y + r, color);
                    }
                }
            }
        };

// draw a piece to the board

        Piece.prototype.draw = function () {
            this.fill(this.color);
        };

// undraw a piece


        Piece.prototype.unDraw = function () {
            this.fill(VACANT);
        };

// move Down the piece

        Piece.prototype.moveDown = function () {
            if (!this.collision(0, 1, this.activeTetromino)) {
                this.unDraw();
                this.y++;
                this.draw();
            } else {
                // we lock the piece and generate a new one
                this.lock();
                p = pNext;
                pNext = randomPiece();
                document.getElementById("nexttetro").innerText = `Next tetromino: ${pNext.name}`;
                document.getElementById("nexttetro").style.color = String("rgb("+pNext.color+")")
            }

        };
        Piece.prototype.moveHardDown = function () {
            this.unDraw();
            while(!this.collision(0, 1, this.activeTetromino)) {
                this.y++;
            }
            this.draw();
            // we lock the piece and generate a new one
            this.lock();
            p = pNext;
            pNext = randomPiece();
            document.getElementById("nexttetro").innerText = `Next tetromino: ${pNext.name}`;
            document.getElementById("nexttetro").style.color = String("rgb("+pNext.color+")")

        };

// move Right the piece
        Piece.prototype.moveRight = function () {
            if (!this.collision(1, 0, this.activeTetromino)) {
                this.unDraw();
                this.x++;
                this.draw();
            }
        };

// move Left the piece
        Piece.prototype.moveLeft = function () {
            if (!this.collision(-1, 0, this.activeTetromino)) {
                this.unDraw();
                this.x--;
                this.draw();
            }
        };

// rotate the piece
        Piece.prototype.rotate = function (counter) {
            let nextPattern;
            if(!counter)
                nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
            else 
                nextPattern = this.tetromino[Math.abs(this.tetrominoN - 1) % this.tetromino.length];
            let kick = 0;

            if (this.collision(0, 0, nextPattern)) {
                if (this.x > COL / 2) {
                    // it's the right wall
                    kick = -1; // we need to move the piece to the left
                } else {
                    // it's the left wall
                    kick = 1; // we need to move the piece to the right
                }
            }

            if (!this.collision(kick, 0, nextPattern)) {
                this.unDraw();
                this.x += kick;
                this.tetrominoN = !counter ? (this.tetrominoN + 1) % this.tetromino.length : Math.abs(this.tetrominoN - 1) % this.tetromino.length; // (0+1)%4 => 1
                this.activeTetromino = this.tetromino[this.tetrominoN];
                this.draw();
            }
        };

        let score = 0;
        let scorePixels = {x:0, y:0};
        let combo = 1;

        Piece.prototype.lock = function () {
            for (r = 0; r < this.activeTetromino.length; r++) {
                for (c = 0; c < this.activeTetromino.length; c++) {
                    // we skip the vacant squares
                    if (!this.activeTetromino[r][c]) {
                        continue;
                    }
                    // pieces to lock on top = game over
                    if (this.y + r < 0) {
                        // stop request animation frame
                        gameOver = true;
                        break;
                    }
                    // we lock the piece
                    board[this.y + r][this.x + c] = this.color;
                }
            }
            // remove full rows
            for (r = 0; r < ROW; r++) {
                let isRowFull = true;
                for (c = 0; c < COL; c++) {
                    isRowFull = isRowFull && (board[r][c] != VACANT);
                }
                if (isRowFull) {
                    // if the row is full
                    // we move down all the rows above it
                    for (y = r; y > 1; y--) {
                        for (c = 0; c < COL; c++) {
                            board[y][c] = board[y - 1][c];
                        }
                    }
                    // the top row board[0][..] has no row above it
                    for (c = 0; c < COL; c++) {
                        board[0][c] = VACANT;
                    }
                    // increment the score
                    score += 10*combo;
                    if(score > 10) scorePixels.x += combo;
                    if(scorePixels.x >= COL) {
                        scorePixels.x = scorePixels.x-COL;
                        scorePixels.y++;
                    }
                    sec -= 13;
                    document.getElementById("score").innerText = `Score: ${score}.`;
                    combo++;
                } else combo = 1;
            }
            // update the board
            drawBoard();
        };

// collision fucntion

        Piece.prototype.collision = function (x, y, piece) {
            for (r = 0; r < piece.length; r++) {
                for (c = 0; c < piece.length; c++) {
                    // if the square is empty, we skip it
                    if (!piece[r][c]) {
                        continue;
                    }
                    // coordinates of the piece after movement
                    let newX = this.x + c + x;
                    let newY = this.y + r + y;

                    // conditions
                    if (newX < 0 || newX >= COL || newY >= ROW) {
                        return true;
                    }
                    // skip newY < 0; board[-1] will crush our game
                    if (newY < 0) {
                        continue;
                    }
                    // check if there is a locked piece alrady in place
                    try {
                        if (board[newY][newX] != VACANT) {
                            return true;
                        }
                    } catch(e) {}
                }
            }
            return false;
        };

// CONTROL the piece

        document.addEventListener("keydown", CONTROL);

        function CONTROL(event) {
            if(gameOver) return;
            if (event.key === "a" || event.key === "ф") {
                p.moveLeft();
                dropStart = Date.now();
            } else if (event.key === "w" || event.key === "W" || event.key === "ц" || event.key === "Ц") {
                if(event.shiftKey) p.rotate(true);
                else p.rotate();
                // dropStart = Date.now();
            } else if (event.key === "d" || event.key === "в") {
                p.moveRight();
                dropStart = Date.now();
            } else if (event.key === "s" || event.key === "S" || event.key === "ы" || event.key === "Ы") {
                if(event.shiftKey) p.moveHardDown();
                else p.moveDown();
            }
        }


        let dropStart = Date.now();
        let gameOver = false;
        let sec = 1000;

        function drop() {
            let now = Date.now();
            let delta = now - dropStart;
            if (delta > sec) {
                p.moveDown();
                dropStart = Date.now();
            }
            if (!gameOver) {
                document.getElementById("gameovertext").innerText = "Game running.";
                requestAnimationFrame(drop);
            } else {
                document.getElementById("gameovertext").innerText = "Game over!";
            }
        }

        OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("Tetris", {}, win => {
            let inpX = document.createElement("input");
            let inpY = document.createElement("input");
            inpX.placeholder = "X";
            inpY.placeholder = "Y";

            let startButton = document.createElement("button");
            let stopButton = document.createElement("button");
            let scoreText = document.createElement("span");
            scoreText.id = "score";
            scoreText.innerText = "Score: 0.";
            startButton.innerText = "Start";
            stopButton.innerText = "Stop";
            let nextTetro = document.createElement("span");
            nextTetro.id = "nexttetro";
            nextTetro.innerText = "Next tetromino: null";
            inpX.onchange = () => TetroX = parseInt(inpX.value);
            inpY.onchange = () => TetroY = parseInt(inpY.value);
            startButton.onclick = () => {
                p = randomPiece();
                pNext = randomPiece();
                nextTetro.innerText = `Next tetromino: ${pNext.name}`;
                nextTetro.style.color = "rgb("+String(pNext.color)+")";
                scoreText.innerText = "Score: 0.";
                scorePixels = {x:0, y:0};
                score = 0;
                gameOver = false;
                board = [];
                sec = 1000;
                for (r = 0; r < ROW; r++) {
                    board[r] = [];
                    for (c = 0; c < COL; c++) {
                        board[r][c] = VACANT;
                    }
                }
                drawBoard();
                dropStart = Date.now();
                drop();
                startButton.blur();
            };
            stopButton.onclick = () => { gameOver = true; stopButton.blur() };
            let gameOverText = document.createElement("span");
            gameOverText.id = "gameovertext";
            gameOverText.innerText = "Not started";
            win.addObj(document.createTextNode("Created by dimden (discord.gg/k4u7ddk). WASD to control."));
            win.addObj(document.createElement("br"));
            win.addObj(inpX);
            win.addObj(inpY);
            win.addObj(document.createElement("br"));
            win.addObj(startButton);
            win.addObj(stopButton);
            win.addObj(document.createElement("br"));
            win.addObj(gameOverText);
            win.addObj(document.createElement("br"));
            win.addObj(scoreText);
            win.addObj(document.createElement("br"));
            win.addObj(nextTetro);
        }).move(window.innerWidth - 500, 100));
    };
    return {
        install: install,
        uninstall: () => {
            OWOP.windowSys.windows.Tetris.close();
        }
    };
})();
