function AngleTranslator(angle){
    var Quadrant = 1;
    while (angle > 90){
        angle -= 90;
        Quadrant += 1;
    };

    var angleRadians = angle*Math.PI/180;
    var x = Math.sin(angleRadians);
    var y = Math.cos(angleRadians);

    if(Quadrant % 2 != 0){
        return{
            xDirection: Math.floor(x*100),
            yDirection: Math.floor(y*100)
        };
    }else{
        return{
            xDirection: Math.floor(y*100),
            yDirection: Math.floor(x*100)
        };
    }
};


console.log(AngleTranslator(30));