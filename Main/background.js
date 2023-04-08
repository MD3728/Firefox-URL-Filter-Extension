//
//Basic Word URL Checking Program
//

// List with blocked words and phrases
let wordBlockList = [

  // Insert most recent words that need to be blocked
  // Format should be: ["word1", "word2"] etc.
  "Someword",
  "Some other word",
  "etc."

];

// Timing Methods
let unblockedTime = [[8,40,8,50]];//8:40 -> 8:50 (Not inclusive at end point but inclusive at starting point)
let canCurrentlyBlock = true;

function parseTime(){
  let currentTime = new Date(new Date().getTime()).toLocaleTimeString().split(":");
  let currentHour = parseInt(currentTime[0]);
  let currentMinute = parseInt(currentTime[1]);
  let currentSecond = parseInt(currentTime[2].slice(0,2));
  if (currentTime[2][3] === "P"){
    currentHour += 12;
  }
  // console.log("Current Hour: " + currentHour)
  // console.log("Current Time: " + currentTime);
  for (let unblockFrame of unblockedTime){
    if ((parseInt(currentHour) >= unblockFrame[0])&&(parseInt(currentHour) <= unblockFrame[2])
    &&(parseInt(currentMinute) >= unblockFrame[1])&&(parseInt(currentMinute) < unblockFrame[3])){
      return true; // Within Time Period
    }
  }
  return false; // Outside of Time Period
}

setInterval(parseTime, 2000);


// URL Checking Methods
let currentURL = "";

function checkURL(currentWord, tabs){
  if ((currentURL.includes(currentWord))&&(canCurrentlyBlock === true)){
    console.log(`Page Blocked Due To Word: ${currentWord}`);//Redirect
    let updating = browser.tabs.update(tabs[0].id, {
      active: true,
      url: "https://www.google.com/"
    });
    canCurrentlyBlock = false;
    setTimeout(() => {canCurrentlyBlock = true;},800);
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

// Browser Activation Methods
browser.tabs.onActivated.addListener(() => {
  //console.log("onActivated Listener Running");
  if ((!parseTime())&&(canCurrentlyBlock === true)){
    browser.tabs.query({active: true, currentWindow: true}, function(tabs){
      console.log(tabs[0].url);
      currentURL = tabs[0].url.toLowerCase().replace(/[^a-zA-Z]/gi, '');
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
    });
  }
});

browser.tabs.onUpdated.addListener(() => {
  //console.log("onUpdated Listener Running");
  if ((!parseTime())&&(canCurrentlyBlock === true)){
    browser.tabs.query({active: true, currentWindow: true}, function(tabs){
      console.log(tabs[0].url);
      currentURL = tabs[0].url.toLowerCase().replace(/[^a-zA-Z]/gi, '');
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
    });
  }
});

