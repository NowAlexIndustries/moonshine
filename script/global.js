
/*
function copyText(id) {
    let text = document.getElementById(id).innerText;
  
    // Use the Clipboard API to copy text to clipboard
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log("Text copied to clipboard: " + text);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
}

function pasteText(name) {
    navigator.clipboard.readText()
        .then(text => {
            // Parse and process the clipboard content here
            document.getElementsByName(name)[0].value = text;
        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
}
*/

// make a localstorage based clipboard and use that instead of the actual one

function copyText(id) {
    let text = document.getElementById(id).innerText;

    // Store text in localStorage
    localStorage.setItem('copiedText', text);
  
    console.log("Text copied to localStorage: " + text);
}

function pasteText(name) {
    // Retrieve text from localStorage
    let text = localStorage.getItem('copiedText');
  
    // If text exists, set it to the element
    if (text !== null) {
        let element = document.getElementsByName(name)[0];
        element.value = text;
        element.dispatchEvent(new Event('input')); // trigger an input event, so oninput will call validator function, so percentage and other values get validated just like when you input them by hand or from the real keyboard
        console.log("Text pasted from localStorage: " + text);
    } else {
        console.error('No text found in localStorage.');
    }
}

// update copyright current year when site loaded
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("copyright-year").innerHTML = new Date().getFullYear();
 }, false);