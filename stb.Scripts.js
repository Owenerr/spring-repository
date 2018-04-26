// global variables initiated
var rand1, rand2, total, selectCount=0, player=1, games=0, previousTotal;

//making new arrays to hold total tile value and score of leftover tiles
tileTotal = new Array();
currentTiles = new Array(1,2,3,4,5,6,7,8,9);
//rolling the dice
function roll(){
    $("#die1").toggleClass("spin");
    $("#die2").toggleClass("spinlong");

   
    rand1= Math.floor((Math.random() * 6) + 1);
    rand2 = Math.floor((Math.random() * 6) + 1);
    
    //img = document.getElementById("die1")
    path1='dice/d'+rand1+'.JPG';
    path2='dice/d'+rand2+'.JPG';
    document.images["die1"].src = path1;
    document.images["die2"].src = path2;
    
    //get new totals of dice
    total = rand1+rand2;
    document.getElementById("leftside").style.visibility="hidden";


};

function select (obj) {
	if (document.getElementById("leftside").style.visibility=="visible") {return}
	// sum current tiles
    var tempTotal=0;
    var img = document.getElementById(obj);
    tileTotal[selectCount]=obj;
    for (var i=0; i<tileTotal.length; i++) {
        tempTotal += tileTotal[i];
    };
    console.log(tempTotal, total);

    if (tempTotal<total) {
        flip(obj);

        //change the array holding current tiles
        // to input a zero for the original value
        currentTiles.splice(obj-1,1,0);
        
        //increase selectCount which tracks how many tiles are selected
        selectCount ++;
    }
    else if (tempTotal==total) {
        //show roll button in leftside div.
        document.getElementById("leftside").style.visibility="visible";
        flip(obj);

        //change the array holding current tiles
        // to input a zero for the original value
        currentTiles.splice(obj-1,1,0);

        //make our temporary tileTotal back to empty and reset selectCount to zero. 
        tileTotal = Array();
        selectCount=0;
        getScore();

    }
       
    else    {alert(tempTotal+" is a total beyond your roll.")};

	
	
	
}

function flip (obj ){ 
	$(`#${obj}`).animate ({
		marginLeft: 100/2,
		marginRight: 100/1.7,
		width: 0
		
	})
}
function flipback (obj ){ 
	$(`#${obj}`).animate ({
		marginLeft:0,
		marginRight:0,
		width: 100
		
	})
}

  // get the current score, make sure we add 'score' to var list at top!
function getScore() {
    score=0;
    
    //loops through array and adds each element
    for (var i = 0; i < currentTiles.length; i++) {
        score += currentTiles[i];
       
    };

   $("#score").text(score);
       $("#die1").toggleClass("spin");
        $("#die2").toggleClass("spinlong");
};

                //reset tiles and clear array
function reset(){
    for (var i = 0; i < tileTotal.length; i++) {
        c=tileTotal[i];
        flipback(c);
        currentTiles.splice(c-1,1,c);
    };
    tileTotal = Array();
    selectCount=0;
};
//player scores will be kept in scoreboard div using new arrays
allScoresP1 = new Array();
allScoresP2 = new Array();
function endGame () {
    //put score in games paragraph depending on player 0 or 1
    //add player to var list at top set to 1 to start
    if (player==1){
        games ++;
        allScoresP1[games-1]=score;
        $("#p1Games").text(allScoresP1);
        player=2;
    }
    else {
        allScoresP2[games-1]=score;
        $("#p2Games").text(allScoresP2);
        player=1;
   doccuments.getElementById("p2t").style.fontWeight="bold";
    }

        
    // hid the reset button and end button and show all tiles
    //$("#reset").hide();
    //$("#endBtn").hide();
    currentTiles = Array(1,2,3,4,5,6,7,8,9);

    for (var i = 0; i < currentTiles.length; i++) {
        c=currentTiles[i];
        flipback(c);
    }

    //reset temporary tile total array and show roll button div
    tileTotal = Array();
    document.getElementById("leftside").style.visibility="visible";

    //I suggest to reset total to 0 and score to 45

score=45;
$("#score").text(score);
    // as well as the dice images and #score text for new player
 //total the player scores for both conditionals
        // change #p1 to #p2 and allScoresP1[i] to allScoresP2[i] if player=2
        if (player==1) {
	       	var temp=0;
	        for (var i = 0; i < games; i++) {
	            temp += allScoresP1[i];
	        };
	        $("#p1").text(temp);
}
else {
        var temp=0;
        for (var i = 0; i < games; i++) {
            temp += allScoresP2[i];
        };
        $("#p2").text(temp);
    }
            
}  // end of endGame()        
