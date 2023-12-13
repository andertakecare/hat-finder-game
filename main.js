const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Game {
        constructor() {
        this.field = null;
        this.pX = 0;
        this.pY = 0;
    }

    generateField(rows, columns, percentage) {
            let field = [];
            for (let i = 0; i < rows; i++) {
                field.push([]);
                for (let j = 0; j < columns; j++) {
                    if ((Math.random() * 100) < percentage) {
                        field[i].push(hole);
                    } else {
                        field[i].push(fieldCharacter);
                    }
                }
            }
            // Set the "hat" location
            const hatLocation = {
                x: Math.floor(Math.random() * columns),
                y: Math.floor(Math.random() * rows)
            };
            // Make sure the "hat" is not at the starting point
            while (hatLocation.x === 0 && hatLocation.y === 0) {
                hatLocation.x = Math.floor(Math.random() * columns);
                hatLocation.y = Math.floor(Math.random() * rows);
            }
            field[hatLocation.y][hatLocation.x] = hat;

            // Set the starting point
            field[0][0] = pathCharacter;

            this.field = field;
        }

    print() {
        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(''));
        }
    }

    play() {
        let playing = true;
        while (playing) {
            this.print();
            this.askQuestion();
            if (!this.isInBounds()) {
                console.log('Out of bounds instruction!');
                playing = false;
                break;
            } else if (this.isHole()) {
                console.log('Sorry, you fell down a hole!');
                playing = false;
                break;
            } else if (this.isHat()) {
                console.log('Congrats, you found your hat!');
                playing = false;
                break;
            }
            // Update the current location on the map
            this.field[this.pY][this.pX] = pathCharacter;
        }
    }

    askQuestion() {
        const answer = prompt('Which way? (Enter U, D, L or R.)').toUpperCase();
        switch (answer) {
            case 'U':
                this.pY -= 1;
                break;
            case 'D':
                this.pY += 1;
                break;
            case 'L':
                this.pX -= 1;
                break;
            case 'R':
                this.pX += 1;
                break;
            case 'Q':
                this.terminate();
                break;
            default:
                console.log('Enter U, D, L or R.');
                this.askQuestion();
                break;
        }
    }

    isInBounds() {
        return (
            this.pY >= 0 &&
            this.pX >= 0 &&
            this.pY < this.field.length &&
            this.pX < this.field[0].length
        );
    }

    isHat() {
        return this.field[this.pY][this.pX] === hat;
    }

    isHole() {
        return this.field[this.pY][this.pX] === hole;
    }

    terminate() {
        console.log('Thanks for playing!');
        process.exit();
    }
}

console.log('Welcome to Find Your Hat!');
console.log('You are represented by the symbol *');
console.log('Your hat is represented by the symbol ^');
console.log('Avoid the holes, represented by the symbol O');
console.log('Avoid going out of bounds');
console.log('Navigate the field with U, D, L or R.');
console.log('Press q to quit');

// Create a new instance of the Game class
const myGame = new Game();
//Obtaining user input for rows, columns, and percentage
let validRows = false;
let rows;
while (!validRows) {
    try {
        rows = prompt('How many rows would you like?');
        console.log("\n");
        if(rows === 'q') {
            myGame.terminate();
        }
        if (!isNaN(rows) && rows > 0 && rows <= 100) {
            validRows = true;
        }
        else {
            throw new Error('Please enter a number between 1 and 100');
        }
    } catch (e) {
        console.log(e.message);
    }
}


let validColumns = false;
let columns;
while (!validColumns) {
    try {
        columns = prompt('How many columns would you like?');
        if(columns === 'q') {
            myGame.terminate();
        }
        if (!isNaN(columns) && columns > 0 && columns <= 100) {
            validColumns = true;
        }
        else {
            throw new Error('Please enter a number between 1 and 100');
        }
    } catch (e) {
        console.log(e.message);
    }
}

let validPercentage = false;
let percentage;
while (!validPercentage) {
    try {
        percentage = prompt('What percentage of the field should be holes?');
        if(percentage === 'q') {
            myGame.terminate();
        }
        if (!isNaN(percentage) && percentage > 0 && percentage <= 100) {
            validPercentage = true;
        }
        else {
            throw new Error('Please enter a number between 1 and 100');
        }
    } catch (e) {
        console.log(e.message);
    }
}
myGame.generateField(rows, columns, percentage);
myGame.play();

// myGame.print();
// prompt('What direction would you like to move?');
