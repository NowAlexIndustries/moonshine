function reset_fokolas() {
    document.getElementById('measuredQuantity').value = '';
    document.getElementById('measuredTemp').value = '';

    document.getElementById('fokolas-output').innerHTML = '';
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
      <input type="text" class="quantity" placeholder="0" name="quantity_0" inputmode="decimal" oninput="validateQuantity(event)">
      <button onclick="pasteText('quantity_0')">beillesztés</button>
    </div>
    <div>
      <input type="text" class="percentage" placeholder="0" name="percent_0" inputmode="decimal" oninput="validatePercent(event)">
      <button onclick="pasteText('percent_0')">beillesztés</button>
    </div>
</li>
<li id="alcohol_1" class="alcoholField">
    <div>
      <input type="text" class="quantity" placeholder="0" name="quantity_1" inputmode="decimal" oninput="validateQuantity(event)">
      <button onclick="pasteText('quantity_1')">beillesztés</button>
    </div>
    <div>
      <input type="text" class="percentage" placeholder="0" name="percent_1" inputmode="decimal" oninput="validatePercent(event)">
      <button onclick="pasteText('percent_1')">beillesztés</button>
    </div>
</li>
    `;

    document.getElementById('keveres-output').innerHTML = '';
}

function reset_higitas() {
    document.getElementById('quantity').value = '';
    document.getElementById('percentage').value = '';
    document.getElementById('desiredPercentage').value = '';

    document.getElementById('higitas-output').innerHTML = '';
}