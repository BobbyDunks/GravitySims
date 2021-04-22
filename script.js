
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

//style canvas

var mousex = 100;
var mousey = 98;

var gravity = 10;

function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function pathFinder(x1,y1,x2,y2, topSpeed){
    deltax = x1-x2;
    deltay = y1-y2;
    distance = Math.sqrt(deltax**2 + deltay**2);
    speedModifier = Math.sqrt((topSpeed**2)/((deltax**2)+(deltay**2)));
    return {
        pathDirectionX: -(speedModifier * deltax),
        pathDirectionY: -(speedModifier * deltay),
        pathDistance: distance
    };
}

function Ball(x, y, dx, dy, radius, color, outline, fixed) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;

	this.update = function() {
        var path = pathFinder(
            this.x,
            this.y,
            canvas.width/2,
            canvas.height/2, 
            5);

        if(fixed == false){
            var gravityMod = gravity/(path.pathDistance/10)**2;
            console.log(path.pathDistance);
            if (path.pathDistance > this.radius){
                this.dx += gravityMod*path.pathDirectionX;
                this.dy += gravityMod*path.pathDirectionY;
            }
                this.x += this.dx;
                this.y += this.dy;
        }
        this.draw();
	};

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = this.color;
		c.fill();
        c.strokeStyle = outline;
        c.stroke();
		c.closePath();
	};
}

//listener
addEventListener("mousemove", function(event){
    mousex = event.clientX;
    mousey = event.clientY;
})




var character;
var blackHole;
function init() {

	//planet
    var radi = randomIntFromRange(8, 20);
    var x = canvas.width/2
    var y = 100
    var dx = 1.6

    var dy = 0
    character = new Ball(
        x, 
        y, 
        dx, 
        dy, 
        10, 
        'green',
        'black',
        false);

    //black hole
    blackHole = new Ball(
        canvas.width/2, 
        canvas.height/2, 
        0, 
        0, 
        20, 
        'black',
        'white', 
        true);

    console.log(character);
    console.log(blackHole);
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);

	//c.clearRect(0, 0, canvas.width, canvas.height);
    //commit test
	character.update();
    blackHole.update();

}

init();
animate();