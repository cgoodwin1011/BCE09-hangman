// Charles Goodwin | cgoodwin2127@gmail.com | hangman-HW3 | PennCodingBootCampJan18

var wordList = ["skinny", "rematch", "heavyweight", "dimensional", "bleeding", "guerilla", "addiction", "fantastic", "aerodynamic", "gossip", "regret", "pyramid", "audacity", "protest", "computer", "flirtation", "foreign", "parade", "royalty", "proven", "possess", "initial", "crunch", "amateur", "ambition", "handlebars", "distillery", "wolves", "harmless", "anything", "direction", "billionaire", "queen", "armchair", "cognitive", "crayon", "crawler", "twisted", "accommodation", "soul", "prophetic", "commando", "bewitching", "mongrel", "bribery", "engine", "dismemberment", "brutish", "apparition", "sparkle", "bumper", "undersea", "agonizing", "downward", "crimson", "extravagant", "dazzling", "freewill", "glumly", "hermit", "encounter", "jackknife", "cardinal", "obsession", "godless", "founder", "expansion", "glandular", "eternal", "someone", "deformity", "escape", "cannibalism", "wartime", "feature", "eyetooth", "extortion", "massacre", "generation", "council", "riddle", "carnal", "crater", "consultant", "cybernetic", "lavender", "heartsick", "sextile", "unquiet", "incognito", "canvass", "physics", "javascript", "altgeld", "retinue", "esquire", "arsenal", "chaufer", "repulse", "leftist", "acerbic", "bristle", "dentate", "concert"]
var russianWriters = ["Tolstoy", "Dostoyevsky", "Pushkin", "Turgenev", "Nabokov", "Gogol", "Solzhenitsyn", "Gorky", "Pasternak", "Goncharov", "Lermontov", "Chernnychevsky", "Bulgakov"]



function chooseWord(chosenTheme) {
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
    console.log(where);
    console.log(charFoundAt(secretWord, where, 0));
    handleGuess(where);

}

function isAlpha(chr) {
    return typeof chr === "string" && chr.length === 1 && /[A-Za-z]/.test(chr);
}


function countChar(inString, inChar) {
    var returnValue = 0;
    for (i = 0; i < inString; i++) {
        if (inString[i] === inChar) {
            returnValue++;
        }
    }
    return returnValue;
}

function youLose() {
  losingTheme.play();
  confirm("You lose! \n\nWanna try this again?");
}

function youWin() {
  winningTheme.play();
  if (confirm("You won! \n\nWanna try this again?")) {
    window.location.reload(false);
  } else {
    alert("Goodbye");
  }
}

function handleGuess(aGuess) {
  var guessFoundAt = charFoundAt(secretWord, aGuess, 0);
  // console.log("arrived at handleGuess with a '"+aGuess+"'")
  // console.log("at we found this letter at locations: "+guessFoundAt)
  //first, check for duplicats.  
  if (charInString(targetWord, aGuess) || thingInArray(badGuesses, aGuess) ) {
    alert("You guessed "+aGuess+" already.  Try again!") 
  } else { 
    if (guessFoundAt != -1) {
      // made a good guess
      guessList[guessList.length] = aGuess;
      console.log("guess found at "+guessFoundAt)
      console.log("number of unsolved letters is"+lettersUnsolved)
            for (i = 0; i < guessFoundAt.length; i++) {
        targetWord = replaceCharAt(targetWord, guessFoundAt[i], aGuess);
        lettersUnsolved--;
      } 
      if (lettersUnsolved === 0) {
        youWin();
      }
      // console.log("number of unsolved letters is"+lettersUnsolved)
      document.getElementById("word-display").innerHTML = targetWord;
      document.getElementById("letters-unsolved").innerHTML = lettersUnsolved;
    
    } else {
        //made bad guess ,,,
        // console.log("that was wrong")
        badGuesses[badGuesses.length] = aGuess;
        // console.log("bad guesses are"+badGuesses.toString());
        numBadGuesses++;
        remainingGuesses--;
        document.getElementById("remaining-guesses").innerHTML = remainingGuesses;
        document.getElementById("bad-guesses").innerHTML = badGuesses.sort();
        if (remainingGuesses === 0) {
            youLose();
        }
      }
    }        
  }
        
function handleNavMenuEvent(whichButton) {
  switch(whichButton) {
    case "play":
      break;
    case "restart":
      break;
    case "get-hint":
      var hint = secretWord[Math.floor(Math.random() * secretWord.length)];
      var hintMessage = "The secret word contains the letter "+hint;
      alert(hintMessage);
      break;
    case "solve-word":
      document.getElementById("word-display").innerHTML = secretWord;
      break;
    case "instructions":
      var theInstructions = "Really?\nTry to guess the secret word by guessing letters.\nPick a letter to guess either on your keyboard or by clicking the on-screen keyboard.\nIf your letter is in the secret word, it will replace a blank.\nIf the guess is wrong, you have ten guesses before you lose.";
      alert(theInstructions);
    }
}


function charFoundAt(inString, searchChar, startWhere) {
    var returnList = [];
    for (i = 0; i < inString.length; i++) {
        if (inString[i] === searchChar) {
            returnList.push(i); 
        }
    }
    if (returnList.length != 0) {
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

function charInString(inString, inChar) {
  if (inString.search(inChar) === -1) {
    return false;
  } else {
    return true;
  }
}

function thingInArray(anArray, aThing) {
  for (i=0; i<anArray.length; i++) {
    if (anArray[i] === aThing) {
      return true;
    }
  }
  return false;
}


