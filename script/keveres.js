// changed my mind yes gpt
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
    <label for="quantity_${i}">Mennyiség</label>
    <input type="text" class="quantity" placeholder="0" name="quantity_${i}" inputmode="decimal" oninput="validateQuantity(event)">
    <label for="percent_${i}">Alkoholszázalék</label>
    <input type="text" class="percentage" placeholder="0" name="percent_${i}" inputmode="decimal" oninput="validatePercent(event)">
    <div class="placeholder">&nbsp</div>
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
                delBtn.innerText = 'X';
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

let isThereResult = false;

function calclulateMix() {

    const alcohols = document.getElementsByClassName('alcoholField');
    let folyadek = 0;
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

        folyadek += qt;
        alcohol += (pct / 100) * qt;
    }

    let resultAlcoholPercent = 0;
    if (folyadek > 0) { // divide only with non 0
        resultAlcoholPercent = (alcohol / folyadek) * 100;
    }

    // only change existing spans content
    if (isThereResult) {
        document.getElementById('resultQuantity').textContent = folyadek;
        document.getElementById('resultPercentage').textContent = resultAlcoholPercent;
        return;
    }

    // if it is the first time getting a result create a div for it and make its content
    let resultAlcohol = document.createElement('div');
    resultAlcohol.id = 'resultAlcohol';
    resultAlcohol.innerHTML = `
        <div id="LeftRes" class="result-container"><span>Mennyiség:</span><span id="resultQuantity">${folyadek}</span></div>
        <hr id="sep">
        <div id="RightRes" class="result-container"><span>Alkoholszázalék:</span><span id="resultPercentage">${resultAlcoholPercent}</span></div>
    `;
    document.getElementById('output').replaceWith(resultAlcohol);
    isThereResult = true;
}

function reset_page() {
    location.reload(); // reload page
}