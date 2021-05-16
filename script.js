
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

function AngleTranslator(angle){
    /*
    Takes a bearing value and returns
    corresponding x and y vector components
    */
    var Quadrant = 1;
    while (angle > 90){
        angle -= 90;
        Quadrant += 1;
    };

    var angleRadians = angle*Math.PI/180;
    var x = Math.sin(angleRadians);
    var y = Math.cos(angleRadians);

    if(Quadrant == 1){
        return{
            x: x,
            y: y
        };
    };
    
    if(Quadrant ==  2){
        return{
            x: y,
            y: -x
        };
    };

    if(Quadrant == 3){
        return{
            x: -x,
            y: -y
        }
    }

    if(Quadrant == 4){
        return{
            x: -y,
            y: x
        }
    }

};

function pathFinder(x1,y1,x2,y2, topSpeed){
    /*
    Takes two points on the canvas and returns a 
    set of variables describing the connecting vector.
    X, Y and the distance in pixels. 
    */
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

function Ball(x, y, dx, dy, radius = 10, color = 'green', outline = 'black', fixed = false) {
    /*
    Creates an empty object called ball.
    object is constantly updates to
    be directed to the centre of the canvas.

    */
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

function Spawn(startX = canvas.width/2,startY = 100) {
    //spawns a ball.

    var inputAngle = document.getElementById('angle').value;
    var initialVel = (document.getElementById('velSlide').value)/5;
    var initialDirectionVector = AngleTranslator(inputAngle); 
    
    console.log(initialDirectionVector.x + ', ' + initialDirectionVector.y)
    planetDeck.push(
        new Ball(
            x = startX, 
            y = startY, 
            dx = initialDirectionVector.x*initialVel, 
            dy = -(initialDirectionVector.y*initialVel),
            radius = 10, 
            color = 'green', 
            outline = 'black',
            fixed = false
            )
    );
   
}

//listeners
addEventListener("mousemove", function(event){
    mousex = event.clientX;
    mousey = event.clientY;
})

addEventListener('mousedown', function(event){
    Spawn(mousex, mousey)
}
);

var planetDeck = [];
var character;
var blackHole;
function init() {

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

}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);

	c.clearRect(0, 0, canvas.width, canvas.height);
    // planet update loop
    var i = 0;
    for (i; i< planetDeck.length; i++){
        planetDeck[i].update();
    };
    blackHole.update();

    
    
}

init();
animate();