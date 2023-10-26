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
console.log(myGame.field);
const rows = prompt('How many rows would you like?');
console.log(rows);
const columns = prompt('How many columns would you like?');
const percentage = prompt('What percentage of the field should be holes?');
myGame.generateField(rows, columns, percentage);

myGame.print();
prompt('What direction would you like to move?');
