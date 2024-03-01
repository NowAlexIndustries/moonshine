
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
    // add new field
    let newItem = document.createElement('li');
    newItem.id = `alcohol_${i}`;
    newItem.className = 'alcoholField inputBlock';
    newItem.innerHTML = `
    <label for="quantity_${i}">mennyiség</label>
    <input type="text" class="quantity" placeholder="0" name="quantity_${i}" inputmode="decimal" oninput="validateQuantity(event)">
    <label for="percent_${i}">alkoholszázalék</label>
    <input type="text" class="percentage" placeholder="0" name="percent_${i}" inputmode="decimal" oninput="validatePercent(event)">
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
                delBtn.className = 'delBtn';
                delBtn.innerText = 'torol';
                delBtn.onclick = function () { deleteField(field.id); };
                field.appendChild(delBtn);
            }
        }
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
        
        // Iterate over each element and remove it
        elementsArray.forEach(function(element) {
            element.remove(element);
        });
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
        mennyiség: <span id="resultQuantity">${folyadek}</span>
        <br>
        alkoholszázalék: <span id="resultPercentage">${resultAlcoholPercent}</span>
    `;
    document.getElementById('content').appendChild(resultAlcohol);
    isThereResult = true;
}

function reset_page() {
    location.reload(); // reload page
}