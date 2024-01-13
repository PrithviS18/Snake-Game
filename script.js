//game variables
let speed=10;
let board=document.getElementById("board");
let first=document.getElementById("first");

let score=0;

//Starting direction variable (This will be updated on every keypress)
let direction={x:0,y:0};

//Food postion
let food= {x:6,y:7};

//Position of each element of the snake
let snakeArr= [{x:13,y:15}];

let lasttime=0;

//game functions
function main(timestamp){
    //Now we perfrom the game function everytime
    window.requestAnimationFrame(main);
    if ((timestamp-lasttime)/1000 < 1/speed){
        return;
    }
    console.log("hello");
    lasttime=timestamp;
    gamefunction();
    //We use this method as an infinite recursion (know as Game Loop)
}

function gamefunction(){
    //Part1 Updating snake array and food:

    //first we check for the collision of the snake
    if (isCollide(snakeArr)){
        direction={x:0,y:0};
        snakeArr= [{x:13,y:15}];
        food={x:6,y:7};
        score=0;
    }

    //Next we update the snake and Food accordingly
    else {
        if (food.x==snakeArr[0].x && food.y==snakeArr[0].y){
            snakeArr.unshift({x:snakeArr[0].x+direction.x,y:snakeArr[0].y+direction.y});
            food={x:Math.round(1+(15)*Math.random()),y:Math.round(1+(15)*Math.random())};
            score++;
        }
        else {
            for (let i=snakeArr.length-2;i>=0;i--){
                //We should use the spread operator to create a new object
                snakeArr[i+1]={...snakeArr[i]};
            }
            snakeArr[0].x+=direction.x;
            snakeArr[0].y+=direction.y;
        }
    }

    //Part2 Display the snake array and food:

    //Everytime the function runs board should be clean else the previous snake will also exist
    board.innerHTML="";
    first.innerHTML="Score: "+ score;
    //Adding the snake and food element to the board (Displaying)
    snakeArr.forEach((e,index)=>{
        snakeElement= document.createElement('div');

        //Setting the position of the snake elements
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;

        //Adding the class head and body for the Elements
        snakeElement.classList.add("head");

        //Appending it into the board
        board.appendChild(snakeElement);
    })

    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add("food");
    board.append(foodElement);
}

//collide function
function isCollide(arr){
    for (let i=1;i<arr.length;i++){
        if (arr[i].x==arr[0].x && arr[i].y==arr[0].y){
            return true;
        }
    }
    if (arr[0].x<0 || arr[0].x>18 || arr[0].y<0 || arr[0].y>18)return true;
    return false;
}


//game loop using requestAnimationFrame
window.addEventListener('keydown', e=>{
    direction={x:0,y:1};
    switch (e.key){
        case "ArrowUp":
            direction={x:0,y:-1};
            break;
            
        case "ArrowRight":
            direction={x:1,y:0};
            break;
            
        case "ArrowLeft":
            direction={x:-1,y:0};
            break;

        case "ArrowDown":
            direction={x:0,y:1};
            break;

        default:
            break;
    }
})
window.requestAnimationFrame(main)


//To be done :
//Use setInterval for the same instead of requestAnimatinFrame
//Why to use {...snake[i]} - spread operator