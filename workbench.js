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
    // the above speed modifier is the factor by which the 
    // components need to be multiplied to normalise the length of the vector
    // if that makes sense. SO it should be unnecessary, just include the distance by
    // not normalising the vectore components
    
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
}
//start here, get working vector and unit vector functions
//Once that is done, move on to vector addition loop in planet.update

function vectorFinder(x1,y1,x2,y2, topSpeed){
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





var unitV = unitVector([3,5]);
console.log(unitV)
console.log(Mag(unitV));