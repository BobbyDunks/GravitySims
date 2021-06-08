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

function Mag(vector){
    //returns magnitude of a 2d vector
    return Math.sqrt(Math.pow(vector[0],2)+Math.pow(vector[1],2))
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

// delete an indexed item from a list.

var testDeck = ['apple','pear','orange','banana'];

testDeck.splice(1,2);

console.log(testDeck)