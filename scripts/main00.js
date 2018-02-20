// Charles Goodwin | cgoodwin2127@gmail.com | hangman-HW3 | PennCodingBootCampJan18

var wordList = ["skinny", "rematch", "heavyweight", "dimensional", "bleeding", "guerilla", "addiction", "fantastic", "aerodynamic", "gossip", "regret", "pyramid", "audacity", "protest", "computer", "flirtation", "foreign", "parade", "royalty", "proven", "possess", "initial", "crunch", "amateur", "ambition", "handlebars", "distillery", "wolves", "harmless", "anything", "direction", "billionaire", "queen", "armchair", "cognitive", "crayon", "crawler", "twisted", "accommodation", "soul", "prophetic", "commando", "bewitching", "mongrel", "bribery", "engine", "dismemberment", "brutish", "apparition", "sparkle", "bumper", "undersea", "agonizing", "downward", "crimson", "extravagant", "dazzling", "freewill", "glumly", "hermit", "encounter", "jackknife", "cardinal", "obsession", "godless", "founder", "expansion", "glandular", "eternal", "someone", "deformity", "escape", "cannibalism", "wartime", "feature", "eyetooth", "extortion", "massacre", "generation", "council", "riddle", "carnal", "crater", "consultant", "cybernetic", "lavender", "heartsick", "sextile", "unquiet", "incognito", "canvass", "physics", "javascript", "altgeld", "retinue", "esquire", "arsenal", "chaufer", "repulse", "leftist", "acerbic", "bristle", "dentate", "concert"]
var badGuesses = 0;
var numGuesses = 10;
var remainingGuesses = numGuesses;

var musicTheme = new Audio("sounds/music_zapsplat_trick_or_treat.mp3")


function chooseWord() {
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function genKeyBoardHTML() {
    var topRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
    var middleRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
    var bottomRow = ["z", "x", "c", "v", "b", "n", "m"];

    var qwertyKeyboard = [topRow, middleRow, bottomRow];

    var outHTML = '<div id="theKeyboard">';
    var keyboardRow = '<div class="keyboardRow">'

    for (i=0; i < qwertyKeyboard.length; i++) {

        for (j = 0; j < qwertyKeyboard[i].length; j++) {
            newString = '<button type="button" id="' + qwertyKeyboard[i][j] + '" class="keyboardKey" onclick="kbdClick(this.id)">' + qwertyKeyboard[i][j] + '</button>';
            keyboardRow += newString;
        }

        keyboardRow += '</div>';
        outHTML += keyboardRow;
        keyboardRow = '<div class="keyboardRow">';
    }
    return outHTML;
}

function kbdClick(where) {
    console.log(where)
    console.log(charFoundAt(secretWord, where, 0))
}

function charFoundAt(inString, searchChar, startWhere) {
    var returnList = [];
    for (i = 0; i < inString.length; i++) {
        if (inString[i] === searchChar) {
            returnList.push(i); 
        }
    }
    if (returnList.length != undefined) {
        return returnList
    } else {
        return -1;
    }

}

function replaceCharAt(str,index,chr) {
    if(index > str.length-1) {
        return str
    };
    return str.substr(0,index) + chr + str.substr(index+1)
}




