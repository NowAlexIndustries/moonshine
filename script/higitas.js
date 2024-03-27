
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

    document.getElementById('higitas-output').innerHTML = innerHtmlAlc;
}