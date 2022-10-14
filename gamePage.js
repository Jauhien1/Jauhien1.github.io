const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        const basketWidth = 60;
        let basketX = (canvas.width-basketWidth)/2;
        const basketHeight = 70;
        let score = 0;
        const ballRadius = 15;
        const scoreAudio = new Audio();
        const gameOverAudio = new Audio();
        scoreAudio.src = "audio/score.mp3";
        scoreAudio.autoplay;
        gameOverAudio.src = "audio/gameOver.mp3";
        gameOverAudio.autoplay;
        
        document.addEventListener("mousemove", mouseMoveHandler, false);
        function mouseMoveHandler(e) {
            let relativeX = e.clientX - canvas.offsetLeft;
            if(relativeX > 0 && relativeX < canvas.width) {
            basketX = relativeX - basketWidth/2;
            }
        }

        const color = ['#DC143C', '#FFD700', '#32CD32', '#191970', '#800080', '#8B4513'];
        

        const ball = [];
        ball[0] = {
            x : Math.floor(Math.random() * (canvas.width-4*ballRadius)),
            y : -20,
            randomColor: '#DC143C'
        }
        // let noColor = '';
        function drawBall() {
            
            for(let i = 0; i < ball.length; i++) {
                ctx.beginPath();
                ctx.arc(ball[i].x, ball[i].y, ballRadius, 0, Math.PI*2);
                ctx.fillStyle = ball[i].randomColor;
                ctx.fill();
                ctx.closePath();
                ball[i].y++;
            
                if(ball[i].y == 80) {
                    ball.push({
                    x : Math.floor(Math.random() * (canvas.width-4*ballRadius)),
                    y : -20,
                    randomColor: color[Math.floor(Math.random()*color.length)]
                    });
                }

                if((ball[i].y >= canvas.height-basketHeight+ballRadius && ball[i].y <= canvas.height-ballRadius)&&
                    (ball[i].x >= (basketX + ballRadius) &&
                    ball[i].x <= (basketX + basketWidth - ballRadius)) &&
                    ball[i].randomColor == randomBasketColor) {
                    score += 1;
                    ball.splice(i,1);
                    scoreAudio.play();
                } 

                if((ball[i].y == canvas.height-ballRadius && ball[i].randomColor == randomBasketColor)||
                (ball[i].y == (canvas.height-basketHeight+ballRadius) &&
                    (ball[i].x >= basketX &&
                    ball[i].x <= (basketX + basketWidth)) &&
                    ball[i].randomColor != randomBasketColor)){
                    alert('Game over! Your score: '+score);
                    document.location.reload();
                    // renderGameoverPage();
                }

                if (ball[i].y >= canvas.height-basketHeight && ball[i].randomColor == randomBasketColor
                && (ball[i].x >= basketX+basketWidth*3 || ball[i].x <= basketX-basketWidth*3)) {
                    ball[i].randomColor = color[Math.floor(Math.random()*color.length)];
                }
                // if (ball[i].y == canvas.height-basketHeight*2) {
                //     noColor = ball[i].randomColor;
                // }
            }
            
        }

        // export const renderGameoverPage = () => {
        //     gameOverAudio.play();
        //     return `
        //     <span>Вы проиграли!</span>
        //     <span>Ваш результат:</span>+${score}$
        //     <input type="button" class="start_button" value="Старт" onclick="switchToGamePage()">
        //     <input type="button" class="start_button" value="Главная" onclick="switchToStartScreen()">
        //     <input type="button" class="start_button" value="Выход" onclick="switchToExitPage()">
        //   `  
        // }


        function drawBasket() {
            ctx.beginPath();
            ctx.rect(basketX, canvas.height-basketHeight, basketWidth, basketHeight);
            ctx.fillStyle = randomBasketColor;
            ctx.fill();
            ctx.closePath();
        }

        let randomBasketColor = '#DC143C';
        function changeBusketColor(){
            // let newColorArr = color.slice(0);
            // for (j=0; j<=newColorArr.length; j++) {
            //     if(noColor == newColorArr[j]){
            //         newColorArr.splice(j,1);
            //     }
            randomBasketColor = color[Math.floor(Math.random()*color.length)];
            }
        

        setInterval(changeBusketColor,7000);
        
        function drawScore() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#0095DD";
            ctx.fillText("Score: "+score, 8, 20);
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBall();
            drawBasket();
            drawScore();
        }

setInterval(draw, 10);