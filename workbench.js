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
var vector = AngleTranslator(315);
//START HERE, Incorporate negatives, angles are all coming out in bottom right quadrant, whats with that?
/*
Q1, ++
Q2, +-
Q3, --
Q4, -+
*/
console.log(vector.x + ', ' + vector.y);