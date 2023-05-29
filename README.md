# Block Word URL Extension - Firefox
<strong>Version 1.0.1</strong>     
<strong>Last Updated: 5/28/2023</strong>       

# Description
A simple web extension that blocks the words in the url set by the first array inside the program.          
<strong>This version is only for Firefox Developer Edition, Nightly, or ESR versions</strong>

# Purpose 
Program can block words in web page URLs listed inside of the background.js file    
Blocked pages with these words will be redirected to <a href="url">https://www.google.com/</a>    

# Usage
Edit the list inside of background.js to manage which words are blocked    
Load Extension as Unpacked into Firefox browser for testing   
Extension will block automatically and cannot be stopped unless it is disabled   
Force install the extension if necessary using policies.json (Example is in the root directory) inside of the distribution folder in Program Files/Firefox

# Issues
As of now, keywords with more than 13 characters will generate too many combinations, but program still runs fine as no combinations appears to be missing. 


