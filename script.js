/* global p5 */

/**
  TO DO
  * text blurbs
  
  level 0 - school background
  "Welcome to college Sammie, it's Syllabus Week!
  Make sure to get the syllabus for each of your classes"
  
  level 1 - dorm room background
  "Oh no! Sammie slept through his alarm and missed all of
  his classes. He swore the sound was only in his dreams."
  
  level 2 - hallway background
  "Sammie went to go take a shower and he forgot his shower shoes!
  That is an infection waiting to happen"
  
  level 3 - town background
  "Sammie hit the town and decided to buy some new things.
  Unfortunately, when Sammie check his credit card account, he nearly
  spent all of his credit line!"
  
  level 4 - restaurant (chairs) background
  "Sammie decided to pick up some food with the small amount of
  cash he had on him. Sadly, his meal did not include any vegetables"
  
  level 5 - office
  "Sammie received an angry phone call from his boss. He realized that
  he did not put his important presentation on his calendar."
  
  Don't be like Sammie. This is luckily just a game and hopefully
  college isn't anything like this.
  
  
  
  
  
  


**/

// DO NOT EDIT THE FOLLOWING LINE
let p = new p5(() => {});

// used to determine which screen to change to
let mode;

//backgrounds
let bkgd;
let bkgd0;
let startBkgd;
let gameOverBkgd;
let howToPlayBkgd;

// back button on howToPlay screen
let backBtn;

let player;
let score;

//level design
let currentLevel;
let levels = []; //array to hold all of our game levels
let platforms = [];
let ladders = [];
let goal;
let obstacles = new Array(10);

// coins
let coins;
let numCoins;
let numPlatforms;
let coinCount;
let coinImg;
let level0CoinImg;

// for obstacle positions
let pos = [];
let posCount;
let obstacleX;

// obstacle types
let alarm;
let flipflops;
let creditcard;
let carrot;
let calendar;

//constants:
const TILE_SIZE = 50;
const NUM_TILES_PER_ROW = 10, NUM_TILES_PER_COL = 10;
const EMPTY = 0, PLATFORM = 1, LADDER = 2, GOAL = 3;

p.setup = function () {
  p.createCanvas(TILE_SIZE * 10, TILE_SIZE * 10); //500 * 500
  
  // to determine screen backgrounds
  mode = 0;

  // a work in progress
  // to work, uncomment score in draw loop under obstacle collisions
  score = 0;
  
  numPlatforms = 0;

  initImages();
  initLevelLoadData();
  currentLevel = 0; //CHANGE STARTING LEVEL HERE
  initGame(currentLevel); 
  
}

function getPlayerStartPosition(levelNumber) {
  let playerPosition = {
    "x" : 0,
    "y" : 0,
  };
  
  if(levelNumber == 0) {
    playerPosition.x = 9;
    playerPosition.y = 7; 
    
  } else if (levelNumber == 1) {
    playerPosition.x = 0;
    playerPosition.y = 7; 
    
  } else if (levelNumber == 2) {
    playerPosition.x = 0;
    playerPosition.y = 0;
    
  } else if (levelNumber == 3) {
    playerPosition.x = 5;
    playerPosition.y = 8; 
    
  } else if (levelNumber == 4) {
    playerPosition.x = 7;
    playerPosition.y = 7; 
    
  } else if (levelNumber == 5) {
    playerPosition.x = 2;
    playerPosition.y = 1; 
    
  } 
  
  return playerPosition;
}

function initGame(levelNumber) {
  platforms = [];
  ladders = [];
  coins = [];
  obstacles = new Array(10);
  player = new Player(getPlayerStartPosition(levelNumber));
  if(levelNumber < levels.length) {
    loadLevel(levelNumber);  
  }
  currentLevel = levelNumber; //WHEN YOU CHANGE THE LEVEL IN THE FUTURE, BE SURE TO UPDATE THIS VAR
  initObstacles();
  
  if (levelNumber == 0) {
    /**
      Welcome to college Sammie!
    **/
    bkgd = p.loadImage("https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2FcollegeBuilding%202.jpg?v=1596136666358");
  } else if (levelNumber == 1) {
    bkgd = p.loadImage("https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2FdormBackground.jpg?v=1595991679836");
  } else if (levelNumber == 2) {
    bkgd = p.loadImage("https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2Fhallway.jpg?v=1596139322222");
  } else if (levelNumber == 3) {
    bkgd = p.loadImage("https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2FtownCentre%20(2).jpg?v=1596138576580");
  } else if (levelNumber == 4) {
    bkgd = p.loadImage("https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2Ffoodplace%20(2).jpg?v=1596140016681");
  } else if (levelNumber == 5) {
    bkgd = p.loadImage("https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2Foffice%20(2).jpg?v=1596140571324");
  } else {
    // default to scenery background
    bkgd = p.loadImage("https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2Fbackground.png?v=1595990581962");
  }
  


}

function initImages() {
  //obstacle images:
  alarm = p.loadImage("https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2Fsquarealarm2.png?v=1596046443588");
  flipflops = p.loadImage("https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2Fflipflops.png?v=1596076154294");
  creditcard = p.loadImage("https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2Fcredit.png?v=1596078029082");
  carrot = p.loadImage("https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2Fcarrot%20(2).png?v=1596078712919");
  calendar = p.loadImage("https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2Fcalendar%20(2).png?v=1596080320578");
  
  coinImg = p.loadImage("https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2Fcoin%20(3).png?v=1596077461252");
  level0CoinImg = p.loadImage("https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2Fpaperstack.png?v=1596141024229");
  
  backBtn = p.loadImage("https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2Fclock%20(2).png?v=1596132394293");
  
  // dorm room background
  //bkgd = p.loadImage("https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2FdormBackground.jpg?v=1595991679836");
  // school building background
  //bkgd0 = p.loadImage("https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2FschoolBuilding.jpg?v=1596134987557");
  
  //start screen background
  startBkgd = p.loadImage("https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2Fstartscreen.png?v=1595996122193");
  //game over screen background
  gameOverBkgd = p.loadImage("https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2Fgameoverscreen.png?v=1596078219325");
  //how to play background
  howToPlayBkgd = p.loadImage("https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2Fhow%20to%20play.png?v=1596082392022");
}

/*
loads each level array with 0's, 1's, and 2's which represent
empty cells, platforms, and ladders, respectively.
*/
function initLevelLoadData() {
  
  // level1 = [
  //   [0, 0, 0, 0, 0, 0, 0, 0 ,0, 0],
  //   [1, 1, 1, 1, 2, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 1, 1, 1, 1, 2, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
  //   [0, 0, 2, 1, 1, 1, 1, 1, 1, 0],
  //   [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
  //   [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  // ];
  
  /** ↑ how you want it to appear onscreen
      vs
      ↓ how you need to write to make it appear
      
      ↓ is the inverse of ↑
  **/
  let level0 = [
    [0, 0, 0, 0, 0, 0, 0, 3, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
  ];
  
  let level1 = [
    [3, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 2, 2, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 2, 2, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 2, 2, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  
  let level2 = [
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 2, 2, 2, 1],
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 2, 2, 2, 1, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 1, 0, 3, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  
  let level3 = [
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 2, 2, 2, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 2, 2, 2, 2, 1],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 3, 1, 0],
    [0, 0, 0, 0, 0, 2, 2, 2, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  
  let level4 = [
    [0, 0, 2, 2, 2, 1, 0, 3, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 3, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 2, 2, 2, 2, 2, 2, 1, 0]
  ];
  
  let level5 = [
    [0, 0, 2, 2, 1, 0, 0, 3, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 2, 2, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 2, 2, 2, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 2, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 2, 2, 2, 2, 2, 2, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
  ];

  levels = [level0, level1, level2, level3, level4, level5];
  
}

/*
takes a LEVEL (levels[0] for example) as a parameter
translates each level's numbers into their corresponding objects
(ie: 1 = a platform).
*/
function loadLevel(levelNumber) {
  for(let i = 0; i < levels[levelNumber].length; i ++) {
    for(let j = 0; j < levels[levelNumber].length; j ++) {
      let currLevel = levels[levelNumber];
      let cellType = currLevel[i][j]; //for some reason this had to be inverted
      
      switch(cellType) {
        case EMPTY:
          break;
          
        case PLATFORM:
          let p = new Platform(i, j, PLATFORM);
          //console.log("IS PLATFORM AT " + i + ", " + j);
          platforms.push(p);
          
          // track number of walkable platforms 
          numPlatforms++;
          // numPlatforms/2 rounded == number of coins in level
          // 
          break;
          
        case LADDER:
          let l = new Platform(i, j, LADDER);
          //console.log("IS LADDER AT " + i + ", " + j);
          platforms.push(l);
          
          // track number of walkable platforms
          numPlatforms++;
 
          break;
          
        case GOAL:
          goal = new Platform(i, j, GOAL);
          
          break;
        
      }
    }
  }
  initCoins(levelNumber);
} // end of loadLevel function

function initObstacles() {
  obstacleX = TILE_SIZE/2;
  for (let i = 0; i < obstacles.length; i++) {
    // obstacleX determines x val for obstacles
    // 2nd param determines type of obstacle
    obstacles[i] = new Obstacle(obstacleX, currentLevel);
    obstacleX += TILE_SIZE;
  }
  
  // handles position of obstacles in columns
  posCount = 0;
  for (let i = 0; i < (p.width); i+=25) {
    if (i%50 != 0) {
      pos[posCount] = i;
      // console.log("I: " + i);
      // console.log("J: " + posCount)
      posCount++;
    }
  }
}

function initCoins(levelNumber) {
  
  coinCount = 0;
  // number of coins based on walkable platforms
  // number of coins btw 7 and num of platforms
  numCoins = p.round(p.random(7, numPlatforms));
  
  if (numCoins%2 == 1) {
    // if odd take a coin away
    numCoins--;
    // console.log("NUM COINS WAS ODD. ITS NOW: " + numCoins);
  }
  console.log("NUMBER OF COINS: " + numCoins);
  coins = new Array(numCoins);
  
  // bc loadLevel doesnt like me
  for(let i = 0; i < levels[levelNumber].length; i ++) {
    for(let j = 0; j < levels[levelNumber].length; j ++) {
      let cellType = levels[levelNumber][i][j]; //for some reason this had to be inverted
      
      switch(cellType) {
        case EMPTY:
          break;
          
        case PLATFORM:
          if (coinCount < coins.length/2){
            console.log("COIN COUNT:  " + coinCount);
            let c = new Coin(i, j);
            coins.push(c);
            //coinCount++;
          }
          break;
          
        case LADDER:
          if (coinCount > coins.length/2){
            console.log("COIN COUNT LADDER:  " + coinCount);
            let c = new Coin(i, j);
            coins.push(c);
            //coinCount++;
          }
          break;
          
      }
      
    }
    
  } // end for i loop
  
  
  //console.log("FIN COIN COUNT: " + coinCount);
  
  // if numCoins > amt of coins created, remove empty from coins array
  coins.splice(0, numCoins);
  
  /**
  //do not draw random coins on the screen
//   let randNum = [];
//   let rand1 = p.round(p.random(3, coins.length));
//   let rand2 = p.round(p.random(3, coins.length));
//   let rand3 = p.round(p.random(3, coins.length));
//   let rand4 = p.round(p.random(3, coins.length));
//   let rand5 = p.round(p.random(3, coins.length));
  
//   randNum.push(rand1);
//   while (rand2 == rand1) {
//     rand2 = p.round(p.random(3, coins.length));
//   }
//   randNum.push(rand2);
//   while(rand3 == rand1 || rand3 == rand2) {
//     rand3 = p.round(p.random(3, coins.length));
//   }
//   randNum.push(rand3);
//   while (rand4 == rand1 || rand4 == rand2 || rand4 == rand3) {
//     rand4 = p.round(p.random(3, coins.length));
//   }
//   randNum.push(rand4);
//   while (rand5 == rand1 || rand5 == rand2 || rand5 == rand3 || rand5 == rand4) {
//     rand5 = p.round(p.random(3, coins.length));
//   }
//   randNum.push(rand5);
  
//   console.log(randNum);
//   //coins[rand].isCollected = true;
  
//   for (let i = 0; i < randNum.length; i++) {
//     coins[i].isCollected = true;
//   }
  **/
}

// ----------- D R A W L O O P ------------------ bc i can never find it (hey, me too!)
p.draw = function () {
  
  // background image
  p.background(bkgd);
  
  // if mode is 0, show start screen
  if (mode === 0) {
    startScreen();
  } else if(mode === -1) {
    howToPlayAndCredits();
  } else if (mode === 1) {
    showTextBlurb(currentLevel);
    //DRAW LEVEL
    for(let i = 0; i < platforms.length; i ++) {
      platforms[i].draw();
    }

    for(let i = 0; i < ladders.length; i ++) {
      ladders[i].draw();
    }
    
    goal.draw();

    //draw player
    player.draw();

    // draw obstacles
    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].draw();
    }
    
    // draw coins
    for (let i = 0; i < coins.length; i++) {
      if (!coins[i].isCollected) {
        coins[i].draw();
      } else if (coins[i].isCollected && !coins[i].awarded) {
        if (currentLevel == 0) {
          score += 0;
        } else {
          score += 25;
        }
        coins[i].awarded = true;
      }
      if (coins[i].checkCollision()) {
        coins[i].isCollected = true;
      }
      
    }

    // if obstacle is thrown, move it
    for (let i = 0; i < obstacles.length; i++) {
      if (obstacles[i].isThrown) {

        // random speed 1 thru 10
        obstacles[i].y += p.random(1, 10);

        // if collision is true, respawn obstacle
        if (obstacles[i].checkCollision()) {
          obstacles[i].isThrown = false;
          obstacles[i].y = p.random(-(p.width/2), -this.size-1);;
          score -= 25;

        }

        // if past height, respawn
        if (obstacles[i].y >= p.height) {
          obstacles[i].isThrown = false;
          obstacles[i].y = p.random(-(p.width/2), -this.size-1);;
        }

      }
    }
    
    if (currentLevel == 0) {
      p.fill(255, 255, 255);
      p.stroke(255, 255, 255);
    } else {
      p.fill(0);
      p.stroke(0);
    }
    p.strokeWeight(1);
    p.textSize(20);
    if (currentLevel == 4) {
      p.text("Score: " + score, p.width - 150, p.height - 25);
    } else {
      p.text("Score: " + score, 10, p.height - 25);
    }
    
  } // end of else statement 
  
  //show mouse Position
  //p.text(p.round(p.mouseX) + ", " + p.round(p.mouseY), p.mouseX, p.mouseY);
  
  //CHECK FOR LEVEL UP
  if(player.hasCollidedWith(goal)) {
    console.log("COLLISION WITH GOAL");
    currentLevel ++;
    //console.log("current level: " + currentLevel);
    //mode = 2;
    initGame(currentLevel);
  }
  
  //CHECK FOR GAME OVER
  if(currentLevel >= levels.length) {
    endScreen();
    mode = 2;
  }
  

} // end of draw loop

function keyPressed() {
  //if (player.isValidMove(player.row, player.col)) {
    player.move(currentLevel);
  
    //console.log("map value: " + map[player.row][player.col]);
  //}
  
  if (p.keyCode === p.ENTER) {
    mode = 1;
  }

}

function startScreen() {
  //console.log("OUT IF MODE ===" + mode);
  // IF RESETTING FROM END SCREEN
  if (mode === 2) {
    mode = 0;
    currentLevel = 0;
    initGame(currentLevel);
    // start game again
    p.loop();
    
    //console.log("IN IF MODE == " + mode);
  } else {
    // first loop in start screen
    mode = 0;
  }
  //console.log("after if start screen");
  // change bkgd
  p.background(startBkgd);
  
}

function endScreen() {
  p.noLoop();
  p.background(gameOverBkgd);
  p.image(backBtn, p.width - 55, 5, 50, 50);
}

function howToPlayAndCredits() {
  p.background(howToPlayBkgd);
  // back button rectancle
  // make back button a clock bc time flies by so fast
  p.image(backBtn, p.width - 55, 5, 50, 50);
  
  
  //p.rect(p.width - 100, 0, 100, 25);
  //p.fill(255, 255, 255);
  //p.text("How to play and credits", 100, 100);
}

p.mousePressed = function() {
  
  if (((p.mouseX >= 15 && p.mouseX <= 105) &&
       p.mouseY >= 400 && p.mouseY <= 490) && 
      (mode === 0)) {
    console.log("in toggle bars");
    
    // goes to how to play screen
    mode = -1;
  }
  
  if (((p.mouseX >= 395 && p.mouseX <= 485) &&
        p.mouseY >= 400 && p.mouseY <= 490) &&
       (mode === 0)) {
    console.log("in start button");
    // starts level 1 (aka: enters the game screen)
    mode = 1;
  }
  
  if ((p.mouseX >= 445 && p.mouseX <= 495) &&
       (p.mouseY >=   5 && p.mouseY <=  50) &&
      (mode === -1)) {
    // back to start screen from how to play screen
    mode = 0;
  }
  
  if ((p.mouseX >= 445 && p.mouseX <= 495) &&
       (p.mouseY >=   5 && p.mouseY <=  50) &&
      (mode === 2)) {
    // back to start screen from end screen
    
    //mode = 0;
    //startScreen();
    
    console.log("start back up");
    //mode = 0;
    //p.loop();
    //mode = 0;
    startScreen();
  }
  
}

//---------------------------------------------------------------------------------------------------------------------------------
class Platform {
  //maybe eventually have different types of platforms (appearance wise)
  constructor(row, col, type) {
    this.row = row;
    this.col = col;
    this.size = TILE_SIZE; //width/height
    this.type = type;
    if(this.type == PLATFORM) {
      this.image = p.loadImage('https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2Fwoodplatform1.png?v=1595990956654');
    } else if(this.type == LADDER) {
      this.image = p.loadImage('https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2Fladder.png?v=1595992386162'); 
    } else if(this.type == GOAL) {  //it's the goal (door to next level)
      this.image = p.loadImage('https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2Fdoor.png?v=1596069021859');
    }
    
  }
  
  draw() { 
    p.image(this.image, this.row * this.size, this.col * this.size);
  }
  
}



//---------------------------------------------------------------------------------------------------------------------------------
class Player {
  
  constructor(position) {
    this.row = position.x;
    this.col = position.y;
    //console.log("Player start position: [" + this.row + ", " + this.col + "]");
    this.size = TILE_SIZE;
    this.images = [p.loadImage('https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2Fplayer_right.gif?v=1595990170716'),
                   p.loadImage('https://cdn.glitch.com/7b292f88-601f-4c9d-af20-0eca719d500f%2Fplayer_left.gif?v=1595990170669')];
    this.currImage = this.images[1]; //left-facing
    this.count = 0;
  }
  
  draw() {
    //red
    //p.fill(255, 0, 0);
    //p.rect(this.row * this.size, this.col * this.size, this.size, this.size);
    p.image(this.currImage, this.row * this.size, this.col * this.size);
  }
  
  move(levelNumber) {    
    if (this.canMoveUp(levels[levelNumber])) {
      this.col --;
      // track when obstacles will fall
      this.count++;    
      throwObstacles(this.count);
      
    } else if (this.canMoveDown(levels[levelNumber])) {
      this.col ++;
      // track when obstacles will fall
      this.count++;    
      throwObstacles(this.count);
      
    } else if (this.canMoveRight(levels[levelNumber])) {
      this.row ++;
      this.currImage = this.images[0];
      // track when obstacles will fall
      this.count++;    
      throwObstacles(this.count);
      
    } else if (this.canMoveLeft(levels[levelNumber])) {
      this.row --;
      this.currImage = this.images[1];
      // track will obstacles will fall
      this.count++;
      throwObstacles(this.count); 
    }
    
    //console.log("[" + this.row + "] [" + this.col + "]");

  }
  
  canMoveUp(currLevel) {
    let moveUp = (p.keyIsDown(p.UP_ARROW) 
            && this.isValidMove(this.row, this.col - 1) 
            && (currLevel[this.row][this.col - 1] == LADDER
            || currLevel[this.row][this.col] == LADDER));
    //debugging
    //console.log("MOVE UP:");
    //console.log("is valid move? " + (this.isValidMove(this.row, this.col - 1)));
    //console.log("is there a ladder above me? " + (currLevel[this.col - 1][this.row] == LADDER));
    //console.log("am I currently standing in front of a ladder? " + (currLevel[this.col][this.row] == LADDER));
    //console.log("overall, can I move up? " + moveUp);
    //console.log("---------------------------------");
    return moveUp;
  }
  
  canMoveDown(currLevel) {
    return (p.keyIsDown(p.DOWN_ARROW) 
            && this.isValidMove(this.row, this.col + 1) 
            && currLevel[this.row][this.col + 1] != PLATFORM);
  }
  
  canMoveRight(currLevel) {
    let moveRight = (p.keyIsDown(p.RIGHT_ARROW) 
            && this.isValidMove(this.row + 1, this.col) 
            && currLevel[this.row + 1][this.col] != PLATFORM //next block directly to right
            && currLevel[this.row + 1][this.col + 1] != EMPTY); //next block underneath is a platform or ladder (PS: no idea why the row/col flipped here!)
    //debugging
    //console.log("MOVE RIGHT:");
    //console.log("is valid move? " + this.isValidMove(this.row + 1, this.col));
    //console.log("if I step to the right, I won't crash into a platform? " + (currLevel[this.row + 1][this.col] != PLATFORM));
    //console.log("there will be either a ladder or platform underneath me if I step to the right? " + (currLevel[this.col + 1][this.row + 1] != EMPTY));
    //console.log("overall, can I move to the right? " + moveRight);
    //console.log("the square to the right of me is: " + currLevel[this.row + 1][this.col]);
    return moveRight;
  }
  
  canMoveLeft(currLevel) {
    let moveLeft = (p.keyIsDown(p.LEFT_ARROW) 
            && this.isValidMove(this.row - 1, this.col) 
            && currLevel[this.row - 1][this.col] != PLATFORM //next block directly to left
            && currLevel[this.row - 1][this.col + 1] != EMPTY); //next block underneath is a platform or ladder (PS: no idea why the row/col flipped here!)
    //console.log("can move left? " + moveLeft);
    return moveLeft;
  }

  isValidMove(row, col) {
    return (row >= 0 && col >= 0 && row <= NUM_TILES_PER_ROW - 1 && col <= NUM_TILES_PER_COL - 1);
  }
  
  hasCollidedWith(goal) {
    return (this.row == goal.row && this.col == goal.col);
  }
  
}

//------ O B S T A C L E   C L A S S---------------------------------------------------------------------------------------------------------------------------
class Obstacle {
  /***
    TO DO YESSS \^u^/
    * add differnt types of obstacles
      - obstacle images dependant on type
          o start w different color squares (YES)
          
    * find way to track obstacle's x value
      - "fly" over to x value and then fall? or just fall like rain
  
    DONE
    * collisions
    * respawn obstacles past p.height and if collision
    * different color obstacles if specified
      - NOW add obstacle images
  ***/
  
  constructor (x, level) {
    this.size = TILE_SIZE/2;
    this.x = x - (this.size/2);
    // easier to change type of obstacle if different level
    this.level = level;
    
    // hide obstacles by assigning -(this.size/2)
    // change y reset when collision or out of height range
    this.y = p.random(-(p.width/2)-10, -this.size-1);
    
    // dependant on how many moves the player makes
    this.isThrown = false;
    this.collide = false;
  }
  
  draw() {  
    // types will be dependent on levels 
    // will result in different obstacle images
    // alarm clock, flip flops, credit card, carrot, calendar
    if (this.level === 1) {
      //alarm clock obstacle
      p.image(alarm, this.x, this.y, this.size, this.size);
      
    } else if (this.level === 2) {
      // flip flops obstacle
      p.image(flipflops, this.x, this.y, this.size, this.size);
      
    } else if (this.level === 3) {
      // credit card obstacle
      p.image(creditcard, this.x-10, this.y, this.size+10, this.size);
      
    } else if (this.level === 4) {
      // carrot obstacle
      p.image(carrot, this.x, this.y, this.size-5, this.size+15);
      
    } else if (this.level === 5){
      // calendar obstacle
      p.image(calendar, this.x, this.y, this.size, this.size);
    } // no default else
      
    //p.stroke(0);
    
    
   }
  
  checkCollision() {
    
    return (p.collideRectRect((player.row*player.size), (player.col*player.size), player.size, player.size,
                          this.x, this.y, this.size, this.size)) 
  }
  
}

// if player's movement count is >= #, an obstacle will fall
function throwObstacles(count) {
  // no obstacles on level 0
  if (count >= 3 && currentLevel != 0) {
    
    //pick random object in obstacles to throw
    let rand = p.round(p.random(0, obstacles.length-1));
    
    while(obstacles[rand].isThrown) { //generate new numbers until you get an obstacle that hasn't already been thrown
      rand = p.round(p.random(0, obstacles.length-1));
    }
    
    obstacles[rand].isThrown = true;
    // (check x value just cuz) console.log("obstacleX value: " + obstacles[rand].x);
    //(check length before) console.log("START ARR: " + obstacles.length);
    console.log("thrown obstacle #" + rand);
    
    // (check length after) console.log("NEW ARR: " + obstacles.length);
    player.count = 0;
    
  }
}

function showTextBlurb(currentLevel) {
  p.strokeWeight(0.1);
  p.stroke(0);
  p.fill("rgba(255, 255, 255, 0.7)");
  p.textFont("Courier New");
  p.textSize(19);
  
  if (currentLevel == 0) {
    //console.log("blurb " + currentLevel);
    // p.noStroke();
    // p.fill("rgba(255, 255, 255, 0.7)");
    //p.rect(x, y, width, height, topLeft, topRight, bottomRight, bottomLeft)
    p.rect(10, 10, p.width - 20, 100, 30, 30, 0, 30);
    
    p.fill(0);
    p.noStroke();
    p.text("Welcome to college Sammie!\nIt's Syllabus Week! Make sure to get\nthe syllabus for each of your classes.", 
           40, 40);
    
  } else if (currentLevel == 1) {
    //console.log("blurb " + currentLevel);
    
    p.rect(210, 355, 280, 95, 30, 30, 0, 30);
    
    p.fill(0);
    p.noStroke();
    p.text("Oh no! Sammie slept\nthrough his alarm and\nmissed all of his\nclasses.",
          230, 375);    
    
  } else if (currentLevel == 2) {
    //console.log("blurb " + currentLevel);
    
    p.rect(160, 5, 330, 95, 25, 25, 0, 25);
    p.fill(0);
    p.noStroke();
    p.text("Sammie went to go take a\nshower and realized that he\nforgot to wear his shower\nshoes!", 
          175, 21);
    
  } else if (currentLevel == 3) {
    //console.log("blurb " + currentLevel);
    
    p.rect(255, 5, 235, 190, 30, 30, 0, 30);
    p.fill(0);
    p.noStroke();
    p.text("Sammie hit the town\nand decided to buy\nsome new things.\nUnfortunately, when\nSammie checked his\ncredit card account,\nhe nearly spent all\nof his credit line!", 
          260, 25);
    
  } else if (currentLevel === 4) {
    //console.log("blurb " + currentLevel);
    
    p.rect(10, 345, 320, 145, 30, 30, 30, 0);
    p.fill(0);
    p.noStroke();
    p.text("Sammie decided to order\nsome food with the small\namount of cash he had on\nhim. Sadly, his meal\ndid not include any\nvegetables.",
          20, 365);
    
    
  } else if (currentLevel === 5) {
    //console.log("blurb " + currentLevel);
    p.rect(150, 10, 340, 90, 30, 30, 0, 30);
    
    p.fill(0);
    p.noStroke();
    p.text("Sammie forgot to mark\nhis important presentation\non his calendar.",
          165, 30);
   
    
  }
  
}

//---------------------------------------------------------------------------------------------------------------------------------
class Coin {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.d = TILE_SIZE/2;
    this.collected = false;
    this.awarded = false;
    coinCount++;
  }
  
  draw() {
    if (!this.collected) {
      if (currentLevel === 0) {
        p.image(level0CoinImg, this.x*TILE_SIZE + (this.d/2), this.y*TILE_SIZE - (this.d), this.d, this.d);
      } else {
        p.image(coinImg, this.x*TILE_SIZE + (this.d/2), this.y*TILE_SIZE - (this.d), this.d, this.d);
      }
    }
  }
  
  checkCollision() {
    return p.collideRectCircle((player.row*player.size), (player.col*player.size), player.size, player.size,
                                this.x*TILE_SIZE + this.d, this.y*TILE_SIZE - this.d, this.d);
  }
  
  
  
}



