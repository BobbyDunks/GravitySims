
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

//style canvas

var mousex = 100;
var mousey = 98;
var gravity = 1000;
var planetDeck = [];
var character;

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
    Takes two points on the canvas and returns the distance between
    the points as well as the unit vector direction from point A to B
    
    */
    deltax = x1-x2;
    deltay = y1-y2;
    distance = Math.sqrt(deltax**2 + deltay**2);
    speedModifier = Math.sqrt((topSpeed**2)/((deltax**2)+(deltay**2)));
    
    if ( deltax == NaN || deltay == NaN){
        //if the path is to the current location, return a 0 vector
        return {
            pathDirectionX: 0,
            pathDirectionY: 0,
            pathDistance: 0
        };

    }else{
        return {
            pathDirectionX: -(speedModifier * deltax),
            pathDirectionY: -(speedModifier * deltay),
            pathDistance: distance
        };
    }
};

function vectorFinder(x1,y1,x2,y2){
    /*
    Takes two points on the canvas and returns a 
    set of variables describing the connecting vector. 
    */
    deltax = x1-x2;
    deltay = y1-y2;;

    if ( deltax == NaN || deltay == NaN){
        //if the path is to the current location, return a 0 vector
        return [0,0]

    }else{
        return [deltax,deltay];
    };
};

function Mag(vector){
    //returns magnitude of a 2d vector
    return Math.sqrt(Math.pow(vector[0],2)+Math.pow(vector[1],2))
};

function unitVector(vector){
    var returner = []
    var mag = Mag(vector)
    for(var i =0 ; i < 2; i++){
        returner.push(vector[i]/mag)
    };
    return returner
};


function Ball(x, y, dx, dy, radius = 10, color = 'green', outline = 'black') {
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
        /*attracted to centre sceen
            -if other planets exist, attract to location of that planet
            -if not, do nothing.
        */
        if(planetDeck.length > 1){
            /*
            - iterate through planet deck
            - aquire the vectors for all planets that arent this planet
            - vector for this planet will come back as NaN, could just output zero
            */
            var pathVector = vectorFinder(
                this.x,
                this.y,
                planetDeck[0].x,
                planetDeck[0].y, 
                );

            var pathMag = Mag(pathVector);
            var pathUnitVector = unitVector(pathVector);


            var gravityMod = -gravity/(pathMag)**2;

            if (pathMag > this.radius){
                this.dx += gravityMod*pathUnitVector[0];
                this.dy += gravityMod*pathUnitVector[1];
            }
        }
        //otherwise, continue as normal.
            this.x += this.dx;
            this.y += this.dy;
        
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

addEventListener("keydown", function(e){
    if (e.keyCode === 83){
        Spawn(mousex,mousey);

    };
})

function init() {

}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);

    //c.clearRect(0, 0, canvas.width, canvas.height);
    // planet update loop
    var i = 0;
    for (i; i< planetDeck.length; i++){
        planetDeck[i].update();
    };

    
    
}

init();
animate();