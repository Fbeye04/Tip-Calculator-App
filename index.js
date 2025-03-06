const billValue = document.getElementById("bill");
const numberOfPerson = document.getElementById("people");
const tipValue = document.querySelectorAll(".tip");
const customTipValue = document.getElementById("custom");

const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");
const resetButton = document.getElementById("reset-button");

let initialBill = 0;
let initialPeople = 0;
let initialTip = 0;

function calculateTip() {
  if (initialBill <= 0 || initialPeople <= 0 || initialTip <= 0) {
    return;
  }

  const tipTotal = (initialBill * initialTip) / 100;
  const grandTotal = initialBill + tipTotal;
  const tipPerPerson = tipTotal / initialPeople;
  const totalPerPerson = grandTotal / tipPerPerson;

  tipAmount.textContent = "$" + tipPerPerson.toFixed(2);
  totalAmount.textContent = "$" + totalPerPerson.toFixed(2);
}

function updateResetButton() {
  if (initialBill > 0 || initialPeople > 0 || initialTip > 0) {
    resetButton.disabled = false;
  } else {
    resetButton.disabled = true;
  }
}

billValue.addEventListener("input", function () {
  const value = parseFloat(this.value) || 0;

  if (value > 0) {
    this.parentElement.classList.add("success");
    this.parentElement.classList.remove("error");
    initialBill = value;
  } else {
    this.parentElement.classList.remove("success");
    initialBill = 0;
  }

  calculateTip();
  updateResetButton();
});

numberOfPerson.addEventListener("input", function () {
  const value = parseInt(this.value) || 0;

  if (value > 0) {
    this.parentElement.classList.add("success");
    this.parentElement.classList.remove("error");
    initialPeople = value;
  } else {
    this.parentElement.classList.remove("success");
    initialPeople = 0;
  }

  calculateTip();
  updateResetButton();
});

tipValue.forEach((button) => {
  button.addEventListener("change", function () {
    initialTip = parseFloat(this.value);
    customTipValue.value = "";
    calculateTip();
    updateResetButton();
  });
});

customTipValue.addEventListener("input", function () {
  const value = parseFloat(this.value) || 0;

  if (value > 0) {
    initialTip = value;
    tipValue.forEach((button) => (button.checked = false));
  } else {
    initialTip = 0;
  }

  calculateTip();
  updateResetButton();
});

resetButton.addEventListener("click", function () {
  initialBill = 0;
  initialPeople = 0;
  initialTip = 0;

  billValue.value = "";
  numberOfPerson.value = "";
  customTipValue.value = "";

  tipButtons.forEach((button) => (button.checked = false));

  tipAmount.textContent = "$0.00";
  totalAmount.textContent = "$0.00";

  billValue.parentElement.classList.remove("success", "error");
  numberOfPerson.parentElement.classList.remove("success", "error");

  resetButton.disabled = true;
});

updateResetButton();
