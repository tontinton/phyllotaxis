/* jshint esversion: 6 */
function Circle(angle, color) {
    this.angle = angle;
    this.color = color;
    this.r = 0;
    this.speed = 0.2;
    this.size = 10;
}

const angleSpeed = 0.075;
const acceleration = 0.05;
const timeBetweenCircles = 0.1;
let circleRadius = 20;
var circles = [];
var frames = 0;
var framesGone = 0;

function setup() {
    createCanvas(1920, 1080);
    translate(width / 2, height / 2);
}

function draw() {
    // ---------------------------- Canvas section ----------------------------
    background(51);
    noStroke();
    fill(255, 0, 100); // rgb(255, 0, 100)
    textSize(32);
    text("Phyllotaxis, Made by Tony Solomonik \nF11 for full screen!", -width / 2 + width / 150, -height / 2 + height / 30);

    // ---------------------------- Update section ----------------------------
    frames++;
    framesGone++;
    circleRadius = max(sin(abs(framesGone / 20)) * 30, 30);
    if (frames > timeBetweenCircles * 60) {
        circles.push(new Circle(0, {
            red: 159,
            green: 255,
            blue: 125
        })); // rgb(159, 255, 125)
        circles.push(new Circle(PI / 2, {
            red: 255,
            green: 107,
            blue: 87
        })); // rgb(255, 107, 87)
        circles.push(new Circle(PI, {
            red: 129,
            green: 187,
            blue: 255
        })); // rgb(129, 187, 255)
        circles.push(new Circle(PI * 3 / 2, {
            red: 241,
            green: 254,
            blue: 93
        })); // rgb(241, 254, 93)
        frames = 0;
    }
    for (let i = 0; i < circles.length; i++) {
        let c = circles[i];
        let x = cos(c.angle) * c.r;
        let y = sin(c.angle) * c.r;
        if (x - circleRadius / 2 > width / 2 ||
            x + circleRadius / 2 < -width / 2 ||
            y - circleRadius / 2 > height / 2 ||
            y + circleRadius / 2 < -height / 2) {
            circles.splice(i, 1);
        } else {
            fill(c.color.red, c.color.green, c.color.blue);
            ellipse(x, y, circleRadius, circleRadius);
            c.angle += angleSpeed;
            c.r += c.speed;
            c.speed += acceleration;
        }
    }
}
