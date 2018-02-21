// Charles Goodwin | cgoodwin2127@gmail.com | hangman-HW3 | PennCodingBootCampJan18

var famousPirates = ["Barbarossa", "FrancisDrake","CalicoJack", "Blackbeard", "HenryEvery", "WilliamKidd"];

var randomWords = ["skinny", "rematch", "heavyweight", "dimensional", "bleeding", "guerilla", "addiction", "fantastic", "aerodynamic", "gossip", "regret", "pyramid", "audacity", "protest", "computer", "flirtation", "foreign", "parade", "royalty", "proven", "possess", "initial", "crunch", "amateur", "ambition", "handlebars", "distillery", "wolves", "harmless", "anything", "direction", "billionaire", "queen", "armchair", "cognitive", "crayon", "crawler", "twisted", "accommodation", "soul", "prophetic", "commando", "bewitching", "mongrel", "bribery", "engine", "dismemberment", "brutish", "apparition", "sparkle", "bumper", "undersea", "agonizing", "downward", "crimson", "extravagant", "dazzling", "freewill", "glumly", "hermit", "encounter", "jackknife", "cardinal", "obsession", "godless", "founder", "expansion", "glandular", "eternal", "someone", "deformity", "escape", "cannibalism", "wartime", "feature", "eyetooth", "extortion", "massacre", "generation", "council", "riddle", "carnal", "crater", "consultant", "cybernetic", "lavender", "heartsick", "sextile", "unquiet", "incognito", "canvass", "physics", "javascript", "altgeld", "retinue", "esquire", "arsenal", "chaufer", "repulse", "leftist", "acerbic", "bristle", "dentate", "concert"];

var russianWriters = ["Tolstoy", "Dostoyevsky", "Pushkin", "Turgenev", "Nabokov", "Gogol", "Solzhenitsyn", "Gorky", "Pasternak", "Goncharov", "Lermontov", "Chernychevsky", "Bulgakov"];

var worldCities =["Boston", "London", "Rome", "Berlin", "Philadelphia"];


function pickTheme(theTheme) {
  var theWarning = "Changing themes will restart game.\n\nClick OK to start new game with new theme.\n\nClick cancel to keep theme.";
  switch(theTheme) {
      case "famous-pirates":
        if (confirm(theWarning)) {
            document.getElementById("menu-default").innerHTML = "Theme:<br>&nbsp  Famous Pirates  &nbsp";
            myTheme = "famousPirates";
          }
        startGame("famousPirates");
        break;
     case "random-words":
        if (confirm(theWarning)) {
          document.getElementById("menu-default").innerHTML = "Theme:<br>&nbsp  Random Words  &nbsp";
          myTheme = "randomWords";
        }
        startGame("randomWords");
        break;
      case "world-cities":
        if (confirm(theWarning)) {
          document.getElementById("menu-default").innerHTML = "Theme:<br>World Cities";
          myTheme = "worldCities";
        }
        startGame("worldCities");
        break;
      case "russian-novelists":
        if (confirm(theWarning)) {
          document.getElementById("menu-default").innerHTML = "Theme:<br>Russian Novelists";
          myTheme = "russianWriters";
        }
        startGame("russianWriters");
        break;
  }
}



function setIllustration(aNumber) {
  switch(aNumber) {
    case 10:
      document.getElementById("illustration").innerHTML = '<img id ="hanging" src="graphics/stick_figure/10.png" height="600px" alt="hanged man">';
      break;
    case 9:
      document.getElementById("illustration").innerHTML = '<img id ="hanging" src="graphics/stick_figure/9.png" height="600px" alt="hanged man">';
      break;
    case 8:
      document.getElementById("illustration").innerHTML = '<img id ="hanging" src="graphics/stick_figure/8.png" height="600px" alt="hanged man">';
      break;
    case 7:
      document.getElementById("illustration").innerHTML = '<img id ="hanging" src="graphics/stick_figure/7.png" height="600px" alt="hanged man">';
      break;
    case 6:
      document.getElementById("illustration").innerHTML = '<img id ="hanging" src="graphics/stick_figure/6.png" height="600px" alt="hanged man">';
      break;
    case 5:
      document.getElementById("illustration").innerHTML = '<img id ="hanging" src="graphics/stick_figure/5.png" height="600px" alt="hanged man">';
      break;
    case 4:
      document.getElementById("illustration").innerHTML = '<img id ="hanging" src="graphics/stick_figure/4.png" height="600px" alt="hanged man">';
      break;
    case 3:
      document.getElementById("illustration").innerHTML = '<img id ="hanging" src="graphics/stick_figure/3.png" height="600px" alt="hanged man">';
      break;
    case 2:
      document.getElementById("illustration").innerHTML = '<img id ="hanging" src="graphics/stick_figure/2.png" height="600px" alt="hanged man">';
      break;
    case 1:
      document.getElementById("illustration").innerHTML = '<img id ="hanging" src="graphics/stick_figure/1.png" height="600px" alt="hanged man">';
      break;
    case 0:
      document.getElementById("illustration").innerHTML = '<img id ="hanging" src="graphics/stick_figure/0.png" height="600px" alt="hanged man">';
      break;
    // default:
    //   document.getElementById("illustration").innerHTML = "<h1>There's always something wrong,<br>isn't there?";
    //   break;
  }
}

function chooseWord(chosenTheme) {
  switch(chosenTheme) {
    case "famousPirates":
      return famousPirates[Math.floor(Math.random() * famousPirates.length)];
      break; // don't really need this, do we?
    case "randomWords":
      return randomWords[Math.floor(Math.random() * randomWords.length)];
      break; // don't really need this, do we?
    case "russianWriters":
      return russianWriters[Math.floor(Math.random() * russianWriters.length)];
      break;
    case "worldCities":
      return worldCities[Math.floor(Math.random() * worldCities.length)];
      break;
  }
}

function startGame(inTheme) {
  console.log("in theme is"+inTheme)
  secretWord = chooseWord(inTheme);
  guessList = []
  badGuesses = []
  numBadGuesses = 0;
  numGuesses = 10;
  remainingGuesses = numGuesses;
  lettersUnsolved = secretWord.length;
  displayWord = '';
  for (i = 0; i < secretWord.length; i++) {
    displayWord += '_';
  }
  console.log(secretWord)
  initializeDisplay();
}

function initializeDisplay() {
  document.getElementById("remaining-guesses").innerHTML = remainingGuesses;
  document.getElementById("letters-unsolved").innerHTML = secretWord.length;
  document.getElementById("input-panel").innerHTML = genKeyBoardHTML();
  document.getElementById("word-display").innerHTML = displayWord;
  setIllustration(10)
  // document.getElementById("illustration").innerHTML = '<img id ="hanging" src="graphics/stick_figure/6.png" height="600px" alt="hanged man">';
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
  gamesLost++;
  // losingTheme.play();
  if (confirm("You lose!\n\nYour record is now\n\n"+gamesWon+" games won and "+gamesLost+" lost \n\nWanna try this again?")) {
    startGame(myTheme);
  } else {
    alert("Thank you for playing");
  }
}

function youWin() {
  winningTheme.play();
  gamesWon++;
  if (confirm("You won! \n\nWanna try this again?")) {
    startGame(myTheme);
  } else {
    alert("Goodbye");
  }
}

function handleGuess(aGuess) {
  var guessFoundAt = charFoundAt(secretWord, aGuess, 0);
  //first, check for duplicates.
  if (charInString(displayWord.toLowerCase(), aGuess.toLowerCase()) || thingInArray(badGuesses, aGuess) ) {
    alert("You guessed "+aGuess+" already.  Try again!")
  } else {
    if (guessFoundAt != -1) {
      // made a good guess
      guessList[guessList.length] = aGuess;
      for (i = 0; i < guessFoundAt.length; i++) {
        displayWord = replaceCharAt(displayWord, guessFoundAt[i], aGuess);
        lettersUnsolved--;
      }
      if (lettersUnsolved === 0) {
        youWin();
      }
      document.getElementById("word-display").innerHTML = displayWord;
      document.getElementById("letters-unsolved").innerHTML = lettersUnsolved;

    } else {
        //made bad guess ,,,
        badGuesses[badGuesses.length] = aGuess;
        numBadGuesses++;
        remainingGuesses--;
        setIllustration(remainingGuesses);
        document.getElementById("remaining-guesses").innerHTML = remainingGuesses;
        document.getElementById("bad-guesses").innerHTML = badGuesses.sort();
        if (remainingGuesses === 0) {
            youLose();
      }
    }
  }
}  

function playCheer() {
  cheersAudio.play();
}

function playBoo() {
  boosAudio.play();
}

function handleNavMenuEvent(whichButton) {
  switch(whichButton) {
    case "play":
      break;
    case "restart":
      startGame(myTheme);
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
    inString = inString.toLowerCase();
    searchChar = searchChar.toLowerCase();
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


