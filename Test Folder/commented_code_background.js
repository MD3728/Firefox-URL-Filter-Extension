//Contains formerly commented out code inside of background.js

// Fully functional way to send messages
// browser.tabs.sendMessage(tabs[0].id, {text: 'test'}, (response) => {
//   let websiteData = response.toString().toLowerCase();
//   for (let currentWord of wordBlockList){
//     if (websiteData.includes(currentWord)){
//       console.log(`Page Blocked Due To Word: ${currentWord}`);
//       let updating = browser.tabs.update(tabs[0].id, {
//         active: true,
//         url: "https://www.google.com/"
//       });
//       canCurrentlyBlock = false;
//       setTimeout(() => {canCurrentlyBlock = true;},800);
//       break;
//     }
//   }
// });

//
// onReplaced Currently Not Functional
//

// browser.tabs.onReplaced.addListener(() => {
//   console.log("onReplaced Listener Running");
//   browser.tabs.query({active: true, currentWindow: true}, function(tabs){
//     //console.log(tabs);
//     browser.tabs.sendMessage(tabs[0].id, {text: 'test'}, (response) => {
//       let websiteData = response.toString().toLowerCase();
//       for (let currentWord of wordBlockList){
//         if (websiteData.includes(currentWord)){
//           console.log(`Page Blocked Due To Word: ${currentWord}`);
//           let updating = browser.tabs.update(tabs[0].id, {
//             active: true,
//             url: "https://www.google.com/"
//           });
//         }
//       }
//     });
//   });
// });


//
// Partially Functional Information Getter
//

// (async () => {
//   const [tab] = await browser.tabs.query({active: true, currentWindow: true});
//   let result;
//   try {
//     [{result}] = await browser.scripting.executeScript({
//       target: {tabId: tab.id},
//       func: () => document.documentElement.innerText,
//     });
//   } catch (e) {
//     document.body.textContent = 'Cannot access page';
//     return;
//   }
//   // process the result
//   document.body.textContent = result;
// })();

//
// Working Example (Redirects and gets proper queries)
//

// (async () => {
//   const [tab] = await browser.tabs.query({active: true, currentWindow: true});
//   let result;
//   try {
//     [{result}] = await browser.scripting.executeScript({
//       target: {tabId: tab.id},
//       func: () => document.documentElement.innerText,
//     });
//   } catch (e) {
//     document.body.textContent = 'Cannot access page';
//     return;
//   }
//   // process the result
//   document.body.textContent = result;
//   let updating = browser.tabs.update(tab.id, {
//     active: true,
//     url: "https://developer.mozilla.org"
//   });
// })();



//
// Non-Functional Write to Text File Code
//

/* Attempt 1: Regular Fetch and Write */

//const url = browser.runtime.getURL('Data/suhm.txt');

// fetch(url)
//     .then((response) => response.text()) //assuming file contains json
//     .then((parsedResponse) => console.log(parsedResponse))

//     .then()
//     .catch((response) => console.log(response));


// fetch(url, {method:'POST', body:"RK Nordchina"})
//   .then (response => response.text())
//   .then(newResponse => console.log(newResponse))


/* Attempt 2: Advanced Fetch */ 

// const formData = new FormData();
// const fileField = document.querySelector('input[type="file"]');
  
// formData.append("username", "abc123");
// formData.append("avatar", fileField.files[0]);

// fetch(url, {
//   method: "PUT",
//   body: formData,
// })
//   .then((response) => response.text())
//   .then((result) => {
//     console.log("Success:", result);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

/* Attempt 3: The Chrome Method */
  
// async function writeToFileInExtensionDirectory(data) {
//   let extDir = await browser.runtime.getPackageDirectoryEntry();
//   let file = await extDir.getFile("hahha.txt", {create: true});
//   await file.createWriter().write(new Blob(["data123232322"], {type: "text/plain"}));
// }

// writeToFileInExtensionDirectory("lol not usedf");


/* Attempt 4: Strange Things */

// let { OS } = window.QueryInterface(Ci.nsIInterfaceRequestor)
//   .getInterface(Ci.nsIWebNavigation)
//   .QueryInterface(Ci.nsIDocShellTreeItem)
//   .rootTreeItem
//   .QueryInterface(Ci.nsIInterfaceRequestor)
//   .getInterface(Ci.nsIDOMWindow).QueryInterface(Ci.nsIInterfaceRequestor)
//   .getInterface(Ci.nsICommandLine);

// let file = OS.Path.join(OS.Constants.Path.profileDir, "extensions", "your_extension_id@your_domain.com", "data", "example.txt");

// OS.File.writeAtomic(file, "Hello, world!", { encoding: "utf-8" });


/* Attempt 5: Components (Deprecated) */

// const { OS } = Components.utils.import("resource://gre/modules/osfile.jsm", {});
// const filePath = OS.Path.join(OS.Constants.Path.profileDir, "extensions", "<extension_id>", "file.txt");
// const encoder = new TextEncoder();
// const text = "Hello, world!";
// const array = encoder.encode(text);
// OS.File.writeAtomic(filePath, array, { encoding: "utf-8" });

/* Attempt 6: Components Advanced (Deprecated) */

// var txt = "my file contents";

//     var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD",  Components.interfaces.nsIFile);
//     file.append("myfile.txt");
//     var fs = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);
//     fs.init(file, 0x02 | 0x08 | 0x20, 0664, 0); // write, create, truncate
//     fs.write(txt, txt.length);
//     fs.close();

/* Attempt 6: Extremely Weird Method */

// var {Cc,Ci,Cu}=require("chrome");  //for jetpack sdk.
// Cu.import("resource://gre/modules/NetUtil.jsm");  
// Cu.import("resource://gre/modules/FileUtils.jsm"); 
// var localFile = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
// var data="test file content";

//   //localFile.initWithPath("D:\\temp-directory\\temp-file.txt");  //full path is okay if directory exists

// localFile.initWithPath("C:\\Users\\mdong\\Downloads");                 //otherwise specifiy directory, create it if necessary, and append leaf.
// if(!localFile.exists()){
//     localFile.create(localFile.DIRECTORY_TYPE,FileUtils.PERMS_DIRECTORY);
// }
// localFile.append("temp-file.txt");

//   //localFile.createUnique(localFile.NORMAL_FILE_TYPE,FileUtils.PERMS_FILE);  //optional: create a new unique file.

// asyncSave(localFile,data,onDone);

// function asyncSave(file,data,callbackDone){    
//       // file is nsIFile, data is a string, optional: callbackDone(path,leafName,statusCode)    
//       // default flags:  FileUtils.openSafeFileOutputStream(file, FileUtils.MODE_WRONLY | FileUtils.MODE_CREATE | FileUtils.MODE_TRUNCATE);  
//     var ostream = FileUtils.openSafeFileOutputStream(file); 
//     var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);  
//     converter.charset = "UTF-8";  
//     var istream = converter.convertToInputStream(data);  

//       // optional: callbackSaved(status).  
//     NetUtil.asyncCopy(istream, ostream, callbackSaved); 
//     function callbackSaved (status) {     
//         if(callbackDone){
//             if(status===0)callbackDone( file.path, file.leafName, status);  //sucess.
//             else callbackDone( null, null, status); //failure.
//         }; 
//     }
// }
// function onDone(path,leafName,statusCode){
//     console.log([statusCode===0?"OK":"error",path,leafName].join("\n"));
// }

