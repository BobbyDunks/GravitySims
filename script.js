// TODO
// - make collision physics
//    - make collisions reuslt in combined mass.
// - make collision with walls.
//    - OR make screen draggable by repositioning all 
//      planets when mouse drag.
// - make setup randomiser.


var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

//style canvas

var mousex = 100;
var mousey = 98;
var gravity = 1;
var mousedown = false;
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

    if ( deltax == NaN && deltay == NaN){
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
    // returns unit vector
    // of given vector.
    if (sameArray(vector, [0,0]) || sameArray(vector, [NaN, NaN])){
        return [0,0];
    };
    var returner = []
    var mag = Mag(vector)
    for(var i =0 ; i < 2; i++){
        returner.push(vector[i]/mag)
    };
    return returner
};

function vectorSum(vectorList){
    var xSum = 0;
    var ySum = 0;
    for(var i = 0; i < vectorList.length; i++){
        xSum += vectorList[i][0];
        ySum += vectorList[i][1];
    }
    return [xSum,ySum]
};

function sameArray(vector1,vector2){
    // returns true if vectors are the same
    // otherwise returns false
    if (vector1.length != vector2.length){
        return false
    };
    for (var i = 0 ; i <= vector1.length; i ++){
        if (vector1[i] != vector2[i]){
            return false
        };
    return true
    }
};



function Ball(x, y, dx, dy, radius = 10, color = 'green', outline = 'black',) {
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
    this.mass = Math.pow(radius,3);
	this.color = color;

	this.update = function() {
        /*
            -if other planets exist, attract to location of that planet
            -if not, do nothing.
        */
        if (!(mousedown)){

            var vectorDeck = [];
            for(var i = 0; i<planetDeck.length;i++){
                /*
                - for loop iterates through planet deck
                - aquires the vectors for all planets that arent this planet
                - aquires magnitude and unit vector
                - calculates gravity modifier
                - multiplies unit vector by gravity modifier
                - pushes to vector deck.
                */
                var pathVector = vectorFinder(
                    this.x,
                    this.y,
                    planetDeck[i].x,
                    planetDeck[i].y, 
                    );

                var pathMag = Mag(pathVector);
                var pathUnitVec = unitVector(pathVector);
                if (sameArray(pathUnitVec,[0,0])){
                    // if unit vector is zero, push zero (vector is pointing from current planet to itself)
                    vectorDeck.push(pathUnitVec);
                }else{
                    // else multiply my gravity modifier and push.
                    var gravityMod = (-gravity/Math.pow(pathMag,2));
                    // consider mass of planet
                    var gravityMod = gravityMod * planetDeck[i].mass;
                    var pathForceVector = pathUnitVec.map(function(x){return x * gravityMod});
                    vectorDeck.push(pathForceVector);
                };
                
            }

            // vectorDeck now holds all relevant vectors.
            // do this for every vector below
            // sum all force vectors to make master vector.
            var masterVec = vectorSum(vectorDeck)

            this.dx += masterVec[0];
            this.dy += masterVec[1];

            this.x += this.dx;
            this.y += this.dy;
        }else{
            this.x
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
    var inputSize = document.getElementById('massSlide').value
    var initialDirectionVector = AngleTranslator(inputAngle); 
    
    planetDeck.push(
        new Ball(
            x = startX, 
            y = startY, 
            dx = initialDirectionVector.x*initialVel, 
            dy = -(initialDirectionVector.y*initialVel),
            radius = inputSize, 
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
        // START HERE
        // need to make a set of vectors for each planet
        // recording relative position to mouse
        // for each planet, maintain that vector to the mouse,
        // will require looping through all planets to make vector
        // planet.x = mouse.x + locatorx
        // planet.y = mouse y + locatory

    };
})

addEventListener("mousedown", function(e){
    mousedown = true;
});

addEventListener("mouseup", function(e){
    mousedown = false;
})

function init() {

}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
    console.log(mousedown);
    c.clearRect(0, 0, canvas.width, canvas.height);
    // planet update loop
    var i = 0;
    for (i; i< planetDeck.length; i++){
        planetDeck[i].update();
    };

    
    
}

init();
animate();