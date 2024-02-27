
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

function outputHtml(givenId, text) {
    // check if exists
    let element = document.getElementById(givenId);
    if (element) {
        element.innerHTML = text;
    } else {
        // create if it doesnt exist
        let resultAlcohol = document.createElement('div');
        resultAlcohol.id = givenId;
        resultAlcohol.innerHTML = text;
        document.getElementById('content').appendChild(resultAlcohol);
    }
}

function calclulateDilution() {

    let qt = parseFloat(document.getElementById('quantity').value);
    let pct = parseFloat(document.getElementById('percentage').value);
    let dpct = parseFloat(document.getElementById('desiredPercentage').value);

    if (isNaN(qt)) {
        qt = 0;
    }
    if (isNaN(pct)) {
        pct = 0;
    }
    if (isNaN(dpct)) {
        dpct = 0;
    }

    let innerHtmlAlc;

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
                mennyiség: <span id="resultQuantity">${folyadek}</span>
                <br>
                hozzáadandó mennyiség: <span id="resultQuantityPlus">${plusszFolyadek}</span>
            `;
        } else {
            if (pct == 0) {
                innerHtmlAlc = 'Bármennyi folyadékot hozzaadhatsz, hogy a 0%-os alkohol 0%-os maradjon.';
            } else {
                innerHtmlAlc = 'Nem allithato 0%-os alkohol nem 0%-os alkoholból.';
            }
        }
    }

    outputHtml('resultAlcohol', innerHtmlAlc);
}

function reset_page() {
    location.reload(); // reload page
}