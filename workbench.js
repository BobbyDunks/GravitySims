function pathFinder(x1,y1,x2,y2, topSpeed){
    dx = x1-x2;
    dy = y1-y2;
    speedModifier = (topSpeed**2)/((dx**2)+(dy**2));
    return {
        pathDirectionX: (speedModifier * dx),
        pathDirectionY: (speedModifier * dy)
    };
}