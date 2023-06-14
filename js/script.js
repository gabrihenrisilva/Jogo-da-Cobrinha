// Criar elemento que irá rodar o jogo
let canvas = document.getElementById("gamesnake");
let context = canvas.getContext("2d");
let box = 32;

//Criar cobrinha como vetor, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos.
let snake = [];

//Início da Cobrinha
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

//Direção
let direction = "right";

//Comida
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
}

//Função para criar o Background
function criarBG(){
    context.fillStyle = "lightblue";
    //Desenha o retangulo usando x e y e a largura e altura setadas
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//Função para criar a Cobrinha
function criarCobrinha(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "#0d0d3f";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//Função para desenhar a comida
function drawFood(){
    context.fillStyle = "rgb(49, 120, 126)";
    context.fillRect(food.x, food.y, box, box);
}

//Quando acontece um evento, detecta e chama a opção update
document.addEventListener('keydown', update);

function update(event){
    console.log
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

//Função Principal
function iniciarJogo(){
    if(snake[0].x > 15*box && direction == "right"){
        snake[0].x = 0;
    }
    if(snake[0].x < 0 && direction == 'left'){
        snake[0].x = 16 * box;
    }
    if(snake[0].y > 15*box && direction == "down"){
        snake[0].y = 0;
    }
    if(snake[0].y < 0 && direction == 'up'){
        snake[0].y = 16 * box;
    }
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert ('Game Over :(');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead ={
        x: snakeX,
        y: snakeY
    }

    //método unshift adiciona como primeiro quadradinho da cobrinha
    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);