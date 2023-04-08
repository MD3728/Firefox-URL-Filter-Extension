// File for testing the URL block algorithm
// File is only for testing, deployment goes to background.js inside of Main folder

let wordBlockList = [

  // Insert most recent words that need to be blocked
  // Format should be: ["word1", "word2"] etc.
  "Someword",
  "Some other word",
  "etc."

];

//Issues: Program cannot properly handle words with more than 13 words (aka >= 3 removals) but produces only extra results (no results are lost)

let totalCounter = 0;
let tabs = [];//Placeholder for actual program tabs
let canCurrentlyBlock = true;  

// URL Checking Methods
let currentURL = "micr0soft".replace(/[^a-zA-Z]/gi, '');
console.log(currentURL);

function checkURL(currentWord, tabs){
  if ((currentURL.includes(currentWord))&&(canCurrentlyBlock === true)){
    console.log(`Page Blocked Due To Word: ${currentWord}`);
    // let updating = browser.tabs.update(tabs[0].id, {
    //   active: true,
    //   url: "https://www.google.com/"
    // });
    // canCurrentlyBlock = false;
    // setTimeout(() => {canCurrentlyBlock = true;},800);
  }
}

// URL Randomization Methods
// Parameters: tabs is simply "tabs" from the browser getting passed on to perform checkURL
function sliceAnother(startingIndex, numIteration, maxIteration, startingWord, wordLength, tabs){
  for (let a = startingIndex - numIteration; a < startingWord.length; a++){//Replace maxIteration numIteration wordLength - maxIteration
    let finalWord = startingWord.slice(0,a) + startingWord.slice(a+1);
    checkURL(finalWord, tabs);
    numIteration++;
    if (numIteration < maxIteration){
      sliceAnother(a+1, numIteration, maxIteration, finalWord, wordLength, tabs);
    }
  }
}

console.time("test")
// Parse all the words
for (let currentWord of wordBlockList){
  // Check the entire word
  checkURL(currentWord.replace(/[^a-zA-Z]/gi, ''), tabs);

  // Check the fragments of the word
  let wordLength = currentWord.length;
  let errorCorrectionNum = Math.floor((currentWord.length-1)/4);
  if (errorCorrectionNum >= 1){
    for (let a = 0; a < wordLength - errorCorrectionNum + 1; a++){
      let finalWord = currentWord.toLowerCase().replace(/[^a-zA-Z]/gi, '');
      finalWord = finalWord.slice(0,a) + finalWord.slice(a+1);
      checkURL(finalWord, tabs);
      if (errorCorrectionNum > 1){
        sliceAnother(a+1, 1, errorCorrectionNum, finalWord, wordLength, tabs);
      }
    }
  } 
}
console.timeEnd("test");
//console.log(totalCounter);


