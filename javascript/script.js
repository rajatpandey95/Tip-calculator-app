const billInput = document.getElementById('bill-input');
const noOfPeople = document.getElementById('persons');
const tip = document.getElementById('tipPerPerson');
const total = document.getElementById('totalPerPerson');
const resetBtn = document.getElementById('btn');
const disableHeading = document.getElementById('disabledHeading');

const customInput = document.getElementById('custom');
const percentages = document.getElementsByClassName('percen');

let bill = 0;
let persons = noOfPeople.value;
let currentTipPercentage = 15;

let elementNode = percentages[2];

for(let element of percentages){
    element.addEventListener('click', function(){
        let s = element.textContent;
        currentTipPercentage = Number(s.substring(0,s.length-1));
        
        elementNode.classList.remove('default');
        element.classList.add('default');
        elementNode = element;

        if(customInput.value != null){
            customInput.value = null;
        }

        calculate();
    });
};


billInput.addEventListener("keyup", function(){
    bill = Number(billInput.value);
    calculate();
});
noOfPeople.addEventListener("keyup", function(){
    persons = Number(noOfPeople.value);
    calculate();
});

customInput.addEventListener("keyup", function(){
    elementNode.classList.remove('default');
    currentTipPercentage = customInput.value;
    calculate();
});

resetBtn.addEventListener('click', function(){
    tip.textContent = "$0.0";
    total.textContent = "$0.0";
    elementNode.classList.remove('default');
    billInput.value = null;
    noOfPeople.value = null;
    customInput.value = null;
    persons = 0;
    currentTipPercentage = 15;
    elementNode = percentages[2];
    elementNode.classList.add('default');
})

function calculate(){
    if(bill === 0){
        return;
    }
    if(persons === 0){
        console.log(persons);
        disableHeading.style.display = "inline-block";
        setTimeout(() => {
            disableHeading.style.display = "none";
        }, 600);
        return;
    }

    if(bill >= 1000000000){
        alert("Bill amount to big");
        return;
    }
    if(persons > 100000){
        alert("Too many peoples");
        return;
    }

    let tipPerson = ((bill * currentTipPercentage)/100)/persons;
    let totalPerPerson = (bill/persons) + tipPerson;
    tipPerson = parseFloat(tipPerson).toFixed(2);
    totalPerPerson = parseFloat(totalPerPerson).toFixed(2);
    tip.textContent = `$${tipPerson}`;

    total.textContent = `$${totalPerPerson}`
}