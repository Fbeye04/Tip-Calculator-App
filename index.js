const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const tipButtons = document.querySelectorAll(".tip");
const customTipInput = document.getElementById("custom");

// output and the buttons
const tipAmountOutput = document.getElementById("tip-amount");
const totalAmountOutput = document.getElementById("total-amount");
const resetButton = document.getElementById("reset-button");

let billValue = 0;
let tipPercentage = 0;
let peopleCount = 0;

function calculateTip() {
  if (billValue > 0 && tipPercentage > 0 && peopleCount > 0) {
    const tipAmount = (billValue * tipPercentage) / 100;
    const totalAmount = billValue + tipAmount;
    const tipPerPerson = tipAmount / peopleCount;
    const totalPerPerson = totalAmount / peopleCount;

    tipAmountOutput.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalAmountOutput.textContent = `$${totalPerPerson.toFixed(2)}`;
  }
}

billInput.addEventListener("input", function () {
  billValue = parseFloat(this.value) || 0;

  if (billValue > 0) {
    this.parentElement.classList.add("success");
  } else {
    this.parentElement.classList.remove("success");
  }

  calculateTip();
  updateResetButton();
});

tipButtons.forEach((button) => {
  button.addEventListener("change", function () {
    tipPercentage = parseFloat(this.value);
    customTipInput.value = "";

    calculateTip();
    updateResetButton();
  });
});

customTipInput.addEventListener("input", function () {
  tipPercentage = parseFloat(this.value) || 0;
  tipButtons.forEach((button) => (button.checked = false));

  if (tipPercentage > 0) {
    this.classList.add("success");
  } else {
    this.classList.remove("success");
  }

  calculateTip();
  updateResetButton();
});

peopleInput.addEventListener("input", function () {
  peopleCount = parseInt(this.value) || 0;

  if (peopleCount === 0) {
    this.parentElement.classList.add("error");
    this.parentElement.classList.remove("success");
  } else if (peopleCount > 0) {
    this.parentElement.classList.add("success");
    this.parentElement.classList.remove("error");

    calculateTip();
  } else {
    peopleInput.parentElement.classList.remove("error", "success");
  }

  updateResetButton();
});

function updateResetButton() {
  if (billValue > 0 || tipPercentage > 0 || peopleCount > 0) {
    resetButton.disabled = false;
  } else {
    resetButton.disabled = true;
  }
}

resetButton.addEventListener("click", function () {
  billValue = 0;
  tipPercentage = 0;
  peopleCount = 0;

  billInput.value = "";
  customTipInput.value = "";
  peopleInput.value = "";

  tipButtons.forEach((button) => (button.checked = false));

  tipAmountOutput.textContent = "$0.00";
  totalAmountOutput.textContent = "$0.00";

  billInput.parentElement.classList.remove("success");
  peopleInput.parentElement.classList.remove("success", "error");
  customTipInput.classList.remove("success");

  resetButton.disabled = true;
});

updateResetButton();
