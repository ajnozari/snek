import './style.css'

document.addEventListener("DOMContentLoaded", snek)

function snek(){
    let canvas = <HTMLCanvasElement>document.getElementById('snek');
    let fps = 70;
    let ctx = canvas.getContext('2d')!;
    ctx.strokeStyle = 'green';
    let posY = canvas.width/2;
    let posX = canvas.width/2;
    let previousTimestamp = 0;
    let lineLength = 10;
    let speedY = -1;
    let speedX = 0;

    addEventListener('keydown', (e) => {
        console.log('key', e)
        switch(e.key){
            case 'ArrowRight':
                speedX = 1;
                speedY = 0;
                break;
            case 'ArrowLeft':
                speedX = -1;
                speedY = 0;
                break;
            case 'ArrowUp':
                speedX = 0;
                speedY = -1;
                break;
            case 'ArrowDown':
                speedX = 0;
                speedY = 1;
                break;
        }
    })

    function drawLine(){
        ctx.beginPath();
        ctx.moveTo(posX, posY);
        ctx.lineTo(speedX ? posX + lineLength : posX, speedY ? posY + lineLength : posY);
        ctx.stroke();
    }

    function moveLine(){
        posY += speedY;
        posX += speedX;
        if(posY > canvas.height)posY = 0;
        if(posY < 0 ) posY = canvas.height;
        if(posX > canvas.width)posX = 0;
        if(posX < 0) posX = canvas.width;

    }

    function loop(timestamp: DOMHighResTimeStamp){
        //FPS Limiter
        requestAnimationFrame(loop)
        if(timestamp - previousTimestamp < Math.ceil(1000/fps)) return;

        ctx.clearRect(0,0,canvas.width, canvas.height);
        moveLine();
        drawLine();
        previousTimestamp = timestamp;

    }

    requestAnimationFrame(loop);

}