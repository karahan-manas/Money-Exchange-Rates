const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");

const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// fetch exchange rates and update the DOM
function calculate() {
  const currencyOne = currencyEl_one.value;
  const currencyTwo = currencyEl_two.value;

  fetch(`https://api.exchangeratesapi.io/latest?base=${currencyOne} 
  `)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      var rate = data.rates[currencyTwo];
      //console.log(rate);

      rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo} `;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Event listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", function () {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;

  const tempamnt = amountEl_one.value;
  amountEl_one.value = amountEl_two.value;
  amountEl_two.value = tempamnt;
});

calculate();
