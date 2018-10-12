function moveDown(animal, numberOfPixels) {
    animal.css("top", animal.offset().top + numberOfPixels);
}

function bringToTop(animal){
    var board = $("#big");
    var leftSideOfBoard = board.offset().left;
    var topOfBoard = board.offset().top;
    var animalImages= [
        "https://www.shareicon.net/data/256x256/2015/11/01/665241_horse_512x512.png",
        "http://icons.iconarchive.com/icons/icons8/windows-8/256/Animals-Pig-2-icon.png",
    ];
    var newAnimalImage = animalImages[1]; 
    
    //$("#animal").show();
    animal.attr("src", newAnimalImage); 
    animal.css("top", topOfBoard); 

    var width = 500; 
    var leftValue = (Math.random() * (width - 70) + 10) ;// 0.2423423 
    console.log(leftValue);
    animal.css("left",leftValue);
    }

// setInterval takes two arguments
// argument1: function
// argument2: time (millaseconds)
var speed = 20;
function dropAnimals() {
    setInterval(function(){
        var animal = $("#animal");
        var maxTopOffset = animal.offset().top;
        var animalIsAboveBottom = maxTopOffset < 460;        
        var numPixelsToMove = 3;
        var didCatchAnimal = isCollisionHorizontal() && isCollisionVertical(); 
    
        if (didCatchAnimal) {
            aPointIsScored();
            bringToTop(animal);
        } else if (animalIsAboveBottom) {
            moveDown(animal, numPixelsToMove);
        } else { // If animal has hit the bottom of the screen
            bringToTop(animal);
           // $("#animal").hide();  
        } 
    
    
    }, speed);
}

// THIS IS WHERE THE GAME STARTS 
dropAnimals(); 


//bar function
$("body").keydown(function(event){


    var left = 37;
    var right = 39; 
    var keyDirection = event.which;
    
   
    if (keyDirection === left) {
        if ($("#small").offset().left > 19){
            $("#small").css("left", $("#small").offset().left - 10);
        }
    }
    else if (keyDirection === right) {
        if ($("#small").offset().left<410){
        $("#small").css("left", $("#small").offset().left + 10);
        }
    }
});



//checks if the bar touched the animal
function isCollisionVertical() {
    var bartop = $("#small").offset().top;
    var animaltop = $("#animal").offset().top;
    var animalbottom = animaltop + $("#animal").height();

    if(animalbottom > bartop) {
        return true;
    }
    else {
        return false;
        
    }
}



function isCollisionHorizontal() {
    
    var barLeft = $("#small").offset().left;
    var animalLeft = $("#animal").offset().left;
    var barRight = barLeft + $("#small").width();
    var animalRight = animalLeft + $("#animal").width();
    
    if (barRight > animalLeft&& barLeft<animalRight){
        return true;
    }
    else {
        return false;
    }
} 

function aPointIsScored (){
    
    console.log("itworks");
    var score = $("#score");
    var originalPoints = score.text();
    console.log('originalPoints', originalPoints);
    
    var newPoints = Number(originalPoints) + 1;
    score.text(newPoints);
    // Here we want to update the scoreboard's points to newPoints
    console.log('newPoints', newPoints);
    
    var animal = $("#animal");
    var board = $("#big");
    var topOfBoard = board.offset().top;
    
    animal.css("top", topOfBoard);     
 }



