let higitasOutput = document.getElementById('higitas-output');
let fokolasOutput = document.getElementById('fokolas-output');
let keveresOutput = document.getElementById('keveres-output');

/* higitas */

function validateQuantity(event) {
    const decimalPattern = /^[0-9]*[.,]?[0-9]*$/;
    const input = event.target.value;

    if (!decimalPattern.test(input)) {
        event.target.value = input.slice(0, -1); // Remove the last character (which is invalid)
    }

    event.target.value = event.target.value.replace(/^00+/, '0'); // remove leading zeros (except 1)
}

function validatePercent(event) {
    const decimalPattern = /^[0-9]*[.,]?[0-9]*$/;
    const input = event.target.value;

    if (!decimalPattern.test(input)) {
        event.target.value = input.slice(0, -1); // Remove the last character (which is invalid)
    }

    event.target.value = event.target.value.replace(/^00+/, '0'); // remove leading zeros (except 1)

    // replace value to 100, if bigger than 100
    if (parseFloat(event.target.value) > 100) {
        event.target.value = 100;
    }
}

function calclulatehigitas() {

    let qt = parseFloat(document.getElementById('quantity').value);
    let pct = parseFloat(document.getElementById('percentage').value);
    let dpct = parseFloat(document.getElementById('desiredPercentage').value);

    if (isNaN(qt)) {
        qt = 0;
    }

    let innerHtmlAlc;
    
    if (qt == 0) {
        innerHtmlAlc = 'Nem higithatsz 0 mennyiségű alkoholt.';
    } else {

        if (isNaN(pct)) {
            pct = 0;
        }
        if (isNaN(dpct)) {
            dpct = 0;
        }
        
        if (pct < dpct) {
            innerHtmlAlc = 'Nem higítható töményebbre, mint ami alapból volt.';
            // legyen-e benne tomenyites is?
        } else if (pct == dpct) {
            if (pct == 0) {
                innerHtmlAlc = 'Bármennyi folyadékot hozzaadhatsz, hogy a 0%-os alkohol 0%-os maradjon.';
            } else {
                innerHtmlAlc = 'Hogy ha ugyan olyan töményre akarod, mint alapból, akkor nem kell folyadékot hozzáadni.';
            }
        } else {
            if (dpct > 0) {
                const folyadek = pct * qt / dpct;
                const plusszFolyadek = folyadek - qt;
                innerHtmlAlc = `
                <div id="LeftRes" class="result-container"><span>Mennyiség: </span><span id="resultQuantity-higitas">${folyadek}</span><button onclick="copyText('resultQuantity-higitas')">Copy</button></div>
                <hr id="sep">
                <div id="RigthRes" class="result-container"><span>Hozzáadandó mennyiség: </span><span id="resultQuantityPlus">${plusszFolyadek}</span><button onclick="copyText('resultQuantityPlus')">Copy</button></div>
                `;
            } else {
                if (pct == 0) {
                    innerHtmlAlc = 'Bármennyi folyadékot hozzaadhatsz, hogy a 0%-os alkohol 0%-os maradjon.';
                } else {
                    innerHtmlAlc = 'Nem allithato 0%-os alkohol nem 0%-os alkoholból.';
                }
            }
        }
    }

    higitasOutput.innerHTML = innerHtmlAlc;
    higitasOutput.style.display = 'block';
}

/* fokolas */

const minAlcoholSzazalek = 10;
const maxAlcoholSzazalek = 98;

const minHomerseklet = 5;
const maxHomerseklet = 30;

function validatePercent(event) {
    const decimalPattern = /^[0-9]*[.,]?[0-9]*$/;
    const input = event.target.value;

    if (!decimalPattern.test(input)) {
        event.target.value = input.slice(0, -1); // Remove the last character (which is invalid)
    }

    event.target.value = event.target.value.replace(/^00+/, '0'); // remove leading zeros (except 1)

    // replace value to 100, if bigger than 100
    if (parseFloat(event.target.value) > 100) {
        ////////////////////
    }
}

function interpolate2DArray(data, x, y) {
    //bilinear interpolation, maybe switch to bicubic interpolation
    // Get the indices of the surrounding values
    const x0 = Math.floor(x);
    const x1 = Math.ceil(x);
    const y0 = Math.floor(y);
    const y1 = Math.ceil(y);

    // Get the values at the corners of the rectangle
    const topLeft = data[x0][y0];
    const topRight = data[x1][y0];
    const bottomLeft = data[x0][y1];
    const bottomRight = data[x1][y1];

    // Interpolate along the x-axis first
    const top = topLeft + (topRight - topLeft) * (x - x0);
    const bottom = bottomLeft + (bottomRight - bottomLeft) * (x - x0);

    // Interpolate along the y-axis
    const interpolatedValue = top + (bottom - top) * (y - y0);

    return interpolatedValue;
}

function mapRange(value, inputMin, inputMax, outputMin, outputMax) {
    return ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin;
}

const alc = 'az hofok';
const szaz = 'az alkoholszázalék';

const low = 'tul kicsi';
const big = 'tul nagy'

function higitasHandler(data, x, y, minX, maxX, minY, maxY) {
    
    let alcError = '';
    let xError = true;
    if (x < minX) {
        alcError = low + ' ' + alc;
    } else if (x > maxX) {
        alcError = big + ' ' + alc;
    } else {
        xError = false;
    }

    let szazError = '';
    let yError = true;
    if (y < minY) {
        szazError = low + ' ' + szaz;
    } else if (y > maxY) {
        szazError = big + ' ' + szaz;
    } else {
        szazError = false;
    }

    if (alcError && szazError) {
        //capitalize sentence with css
        return alcError + ' és ' + szazError + '!';
    }

    if (alcError) {
        return alcError + '!';
    }

    if (szazError) {
        return szazError + '!';
    }

    const x0 = mapRange(x, minX, maxX, 0, data.length);
    const y0 = mapRange(y, minY, maxY, 0, data[0].length);

    return interpolate2DArray(data, x0, y0);
}

function calculateFokolas() {
    let homerseklet = parseFloat(document.getElementById('measuredTemp').value);
    let mert_alkoholszazalek = parseFloat(document.getElementById('measuredQuantity').value);

    let res = higitasHandler(corretionTable, homerseklet, mert_alkoholszazalek, minHomerseklet, maxHomerseklet, minAlcoholSzazalek, maxAlcoholSzazalek);
    fokolasOutput.innerHTML = res;
    fokolasOutput.style.display = 'block';
    console.log(res);
}

/* keveres */

function validateQuantity(event) {
    const decimalPattern = /^[0-9]*[.,]?[0-9]*$/;
    const input = event.target.value;

    if (!decimalPattern.test(input)) {
        event.target.value = input.slice(0, -1); // Remove the last character (which is invalid)
    }

    event.target.value = event.target.value.replace(/^00+/, '0'); // remove leading zeros (except 1)
}

function validatePercent(event) {
    const decimalPattern = /^[0-9]*[.,]?[0-9]*$/;
    const input = event.target.value;

    if (!decimalPattern.test(input)) {
        event.target.value = input.slice(0, -1); // Remove the last character (which is invalid)
    }

    event.target.value = event.target.value.replace(/^00+/, '0'); // remove leading zeros (except 1)

    // replace value to 100, if bigger than 100
    if (parseFloat(event.target.value) > 100) {
        event.target.value = 100;
    }
}

let i = 2; // unique for each field
let number_of_fields = 2;

function addAlcohol() {
    // add separator line
    /*
    let sepline = document.createElement('li');
    sepline.className = 'sepHold';
    sepline.innerHTML = `
    <hr class="sep">
    `;
    document.getElementById('alcohols').appendChild(sepline);*/

    // add new field
    let newItem = document.createElement('li');
    newItem.id = `alcohol_${i}`;
    newItem.className = 'alcoholField';
    newItem.innerHTML = `
    <div>
        <input type="text" class="quantity" placeholder="0" name="quantity_${i}" id="quantity_${i}" inputmode="decimal" oninput="validateQuantity(event)">
        <button onclick="pasteText('quantity_${i}')">beillesztés</button>
    </div>
    <div>
        <input type="text" class="percentage" placeholder="0" name="percent_${i}" id="percent_${i}" inputmode="decimal" oninput="validatePercent(event)">
        <button onclick="pasteText('percent_${i}')">beillesztés</button>
    </div>
    `;
    document.getElementById('alcohols').appendChild(newItem);
    ++i;
    ++number_of_fields;

    // allow deleting fields if there are more than 2 (mixing only has purpose with at least 2 components, so we can not delete component, if we only have 2)
    if (number_of_fields > 2) {
        let fields = document.getElementsByClassName('alcoholField');
        for (let field of fields) {
            let existingChild = field.querySelector('.delBtn');
            if (!existingChild) {
                let delBtn = document.createElement('button');
                delBtn.className = 'sideBtn delBtn';
                delBtn.setAttribute("aria-label", "alkohol törlése");
                delBtn.innerHTML = '<span class="bar"></span><span class="bar"></span>';
                delBtn.onclick = function () { deleteField(field.id); };
                field.appendChild(delBtn);
            }
        }

        let elems = document.getElementsByClassName('placeholder');

        let elemArray = Array.from(elems);

        elemArray.forEach( function(element) {
            element.remove();
        });
    }
}

function deleteField(n) {
    document.getElementById(n).remove(); // remove from webpage
    --number_of_fields;
    // prohibit deleting fileds if there are 2 or less than 2 (mixing only has purpose with at least 2 components, so we can not delete component, if we only have 2)
    if (number_of_fields <= 2) {
        // Get all elements with the given class name
        let elements = document.getElementsByClassName('delBtn');
        
        // Convert the HTMLCollection to an array to use forEach
        let elementsArray = Array.from(elements);

        // Remove delete buttons
        elementsArray.forEach(function(element) {
            element.remove(element);
        });

        // generate placeholder div
        let placeholder = document.createElement('div');
        placeholder.className = 'placeholder';
        placeholder.innerHTML = '&nbsp';

        // get list of input fields
        /*elements = document.getElementsByClassName('alcoholField');
        Array.from(elements).forEach(function(element) {
            element.appendChild(placeholder).cloneNode(true);
            console.log(element);
        });*/

        let alcoholFields = document.getElementsByClassName('alcoholField');
        for (let i = 0; i < alcoholFields.length; i++) {
            alcoholFields[i].appendChild(placeholder.cloneNode(true)); // clone the placeholder to avoid moving the same element multiple times
            //console.log(alcoholFields[i]);
        }
    }
}

function calclulateKeveres() {

    const alcohols = document.getElementsByClassName('alcoholField');
    let liquid = 0;
    let alcohol = 0;
    for (let alc of alcohols) {
        let qt = parseFloat(alc.querySelector('.quantity').value);
        let pct = parseFloat(alc.querySelector('.percentage').value);

        if (isNaN(qt)) {
            qt = 0;
        }
        if (isNaN(pct)) {
            pct = 0;
        }

        liquid += qt;
        alcohol += (pct / 100) * qt;
    }

    let resultAlcoholPercent = 0;
    if (liquid > 0) { // divide only with non 0
        resultAlcoholPercent = (alcohol / liquid) * 100;
    }

    keveresOutput.innerHTML = `
<div id="LeftRes" class="result-container"><span>Mennyiség:</span><span id="resultQuantity">${liquid}</span><button onclick="copyText('resultQuantity')">Copy</button></div>
<hr id="sep">
<div id="RightRes" class="result-container"><span>Alkoholszázalék:</span><span id="resultPercentage">${resultAlcoholPercent}</span><button onclick="copyText('resultPercentage')">Copy</button></div>`;
    keveresOutput.style.display = 'block';
}

/* resetters */

function reset_fokolas() {
    document.getElementById('measuredQuantity').value = '';
    document.getElementById('measuredTemp').value = '';

    fokolasOutput.innerHTML = '';
    fokolasOutput.style.display = 'none';
}

function reset_keveres() {
    document.getElementById('alcohols').innerHTML = `
  <li class="alcoholField-header">
    <span>Mennyiség</span>
    <span>Alkoholszázalék</span>
  </li>
  <!--initial 2 fields-->
  <li id="alcohol_0" class="alcoholField">
    <div>
      <input type="text" class="quantity" placeholder="0" name="quantity_0" id="quantity_0" inputmode="decimal" oninput="validateQuantity(event)">
      <button onclick="pasteText('quantity_0')">beillesztés</button>
    </div>
    <div>
      <input type="text" class="percentage" placeholder="0" name="percent_0" id="percent_0" inputmode="decimal" oninput="validatePercent(event)">
      <button onclick="pasteText('percent_0')">beillesztés</button>
    </div>
  </li>
  <li id="alcohol_1" class="alcoholField">
    <div>
      <input type="text" class="quantity" placeholder="0" name="quantity_1" id="quantity_1" inputmode="decimal" oninput="validateQuantity(event)">
      <button onclick="pasteText('quantity_1')">beillesztés</button>
    </div>
    <div>
      <input type="text" class="percentage" placeholder="0" name="percent_1" id="percent_1" inputmode="decimal" oninput="validatePercent(event)">
      <button onclick="pasteText('percent_1')">beillesztés</button>
    </div>
  </li>
    `;

    keveresOutput.innerHTML = '';
    keveresOutput.style.display = 'none';
}

function reset_higitas() {
    document.getElementById('quantity').value = '';
    document.getElementById('percentage').value = '';
    document.getElementById('desiredPercentage').value = '';

    higitasOutput.innerHTML = '';
    higitasOutput.style.display = 'none';
}

// make a localstorage based clipboard and use that instead of the actual one

function copyText(id) {
    let text = document.getElementById(id).innerText;

    // Store text in localStorage
    localStorage.setItem('copiedText', text);
  
    console.log("Text copied to localStorage: " + text);
}

function pasteText(id) {
    // Retrieve text from localStorage
    let text = localStorage.getItem('copiedText');
  
    // If text exists, set it to the element
    if (text !== null) {
        let element = document.getElementById(id);
        element.value = text;
        element.dispatchEvent(new Event('input')); // trigger an input event, so oninput will call validator function, so percentage and other values get validated just like when you input them by hand or from the real keyboard
        console.log("Text pasted from localStorage: " + text);
    } else {
        console.error('No text found in localStorage.');
    }
}