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
var path = pathFinder(10,5,10,5, 5)
console.log(path.pathDirectionX, path.pathDirectionY)