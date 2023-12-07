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
            this.field = field;
        }

    print() {
        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(''));
        }
    }
}

console.log('Welcome to Find Your Hat!');
console.log('Your hat is represented by the symbol ^');
console.log('Avoid the holes, represented by the symbol O');
console.log('Navigate the field with the arrow keys');
console.log('Press q to quit');

const myGame = new Game();
//Obtaining user input for rows, columns, and percentage
let validRows = false;
let rows;
while (!validRows) {
    try {
        rows = prompt('How many rows would you like?');
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
        columns = prompt('How many columns would you like?\n');
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

const percentage = prompt('What percentage of the field should be holes?');
myGame.generateField(rows, columns, percentage);

myGame.print();
prompt('What direction would you like to move?');
