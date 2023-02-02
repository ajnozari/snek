import './style.css';

document.addEventListener('DOMContentLoaded', snek);

type Segment = { x: number; y: number };
function snek() {
    let canvas = <HTMLCanvasElement>document.getElementById('snek');
    let fps = 1;
    let ctx = canvas.getContext('2d')!;
    ctx.strokeStyle = 'green';
    canvas.width = canvas.getBoundingClientRect().width;
    canvas.height = canvas.getBoundingClientRect().height;
    let previousTimestamp = 0;
    let size = 10;
    let foodCoords: Segment | null = null!;
    let segments: Segment[] = [
        { x: canvas.width / 2, y: canvas.height / 2 },
        { x: canvas.width / 2, y: canvas.height / 2 + size },
        { x: canvas.width / 2, y: canvas.height / 2 + size * 2 },
    ];
    let speedY = -10; //current Y speed
    let speedX = 0; //current X speed
    let speed = 10; //base speed

    addEventListener('keydown', (e) => {
        console.log('key', e);
        switch (e.key) {
            case 'ArrowRight':
                speedX = speed;
                speedY = 0;
                break;
            case 'ArrowLeft':
                speedX = -speed;
                speedY = 0;
                break;
            case 'ArrowUp':
                speedX = 0;
                speedY = -speed;
                break;
            case 'ArrowDown':
                speedX = 0;
                speedY = speed;
                break;
        }
    });

    function drawFood() {
        if (!foodCoords)
            foodCoords = { x: getRandomIntInclusive(1, canvas.width), y: getRandomIntInclusive(1, canvas.height) };
        ctx.beginPath();
        ctx.rect(foodCoords.x, foodCoords.y, 10, 10);
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'red';
        ctx.stroke();
    }

    function checkFoodCollision() {
        if (
            ((segments[0].x >= foodCoords.x && segments[0].x <= foodCoords.x + size) ||
                (foodCoords.x >= segments[0].x && foodCoords.x <= segments[0].x + size)) &&
            ((segments[0].y >= foodCoords.y && segments[0].y <= foodCoords.y + size) ||
                (foodCoords.y >= segments[0].y && foodCoords.y <= segments[0].y + size))
        )
            foodCoords = null;
    }

    function drawSegment() {
        for (let i = 0; i < segments.length; i++) {
            ctx.beginPath();
            i === 0 ? (ctx.strokeStyle = 'green') : (ctx.strokeStyle = 'red');
            ctx.rect(segments[i].x, segments[i].y, 10, 10);
            ctx.stroke();
        }
    }

    function moveSegments() {
        let update: Segment[] = [];
        for (let i = 0; i < segments.length; i++) {
            let currX = segments[i].x;
            let currY = segments[i].y;

            if (i === 0) {
                currX += speedX;
                currY += speedY;

                if (currY > canvas.height) currY = 0;
                if (currY < 0) currY = canvas.height;
                if (currX > canvas.width) currX = 0;
                if (currX < 0) currX = canvas.width;
            } else {
                currX = segments[i - 1].x;
                currY = segments[i - 1].y;
            }
            update.push({ x: currX, y: currY });
        }
        segments = update;
    }

    function loop(timestamp: DOMHighResTimeStamp) {
        //FPS Limiter
        requestAnimationFrame(loop);
        if (timestamp - previousTimestamp < Math.ceil(1000 / fps)) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveSegments();
        drawSegment();
        drawFood();
        console.log(checkFoodCollision());
        previousTimestamp = timestamp;
    }

    function getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }

    requestAnimationFrame(loop);
}
