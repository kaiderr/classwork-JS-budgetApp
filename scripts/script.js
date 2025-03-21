let startingIncome, foodSpent_UserInput, rentSpent_UserInput, travelSpent_UserInput, funSpent_UserInput;

// let budgetDollar_NumberOutput = document.getElementById('budgetDollar_NumberOutput');
let foodDollar_Output = document.getElementById('foodDollar_Output');
let rentDollar_Output = document.getElementById('rentDollar_Output');
let travelDollar_Output = document.getElementById('travelDollar_Output');
let funDollar_Output = document.getElementById('funDollar_Output');
let monthlyActual_Label = document.getElementById('monthlyActual_Label');
let carryOver_Label = document.getElementById('carryOver_Label');

const food = {
    title: 'food',
    percent: 0,
    dollar: 0,
    spent: 0,
}

const rent = {
    title: 'rent',
    percent: 0,
    dollar: 0,
    spent: 0,
}
const travel = {
    title: 'transportation',
    percent: 0,
    dollar: 0,
    spent: 0,
}
const fun = {
    title: 'entertainment',
    percent: 0,
    dollar: 0,
    spent: 0,
}

const categories = [food, rent, travel, fun];

/* FUNCTIONS */

// Get user income, display that income and set remaining income to starting
function setIncome(){
    startingIncome = document.getElementById('startingIncome').value;
}

// get user's category percentage, then calculate the dollar equivalent based on the income
function percToDollar(category){
    let percent, output;

    // choosing which category
    switch (category){
        case food:
            percent = 'foodPercent_UserInput';
            output = foodDollar_Output;
            break;
        case rent:
            percent = 'rentPercent_UserInput';
            output = rentDollar_Output;
            break;
        case travel:
            percent = 'travelPercent_UserInput';
            output = travelDollar_Output;
            break;
        case fun:
            percent = 'funPercent_UserInput';
            output = funDollar_Output;
            break;
            
        default:
            console.log('not workking');
    }

    // setting percentage in decimal
    category.percent = document.getElementById(percent).value / 100;

    // setting dollar amount for budget
    category.dollar = startingIncome * category.percent;

    // outputting the dollar amount
    output.textContent = `$${category.dollar}`;
    
}


function checkSpent(category){
    // choosing which category
    let budget, spent, arrow, arrowText;
    switch (category){
        case food:
            budget = food.dollar;
            spent = document.getElementById('foodSpent_UserInput').value;
            arrow = document.getElementById('arrowImgFood');
            arrowText = document.getElementById('aboveBelowFood');
            break;
        case rent:
            budget = rent.dollar;
            spent = document.getElementById('rentSpent_UserInput').value;
            arrow = document.getElementById('arrowImgRent');
            arrowText = document.getElementById('aboveBelowRent');
            break;
        case travel:
            budget = travel.dollar;
            spent = document.getElementById('travelSpent_UserInput').value;
            arrow = document.getElementById('arrowImgTravel');
            arrowText = document.getElementById('aboveBelowTravel');
            break;
        case fun:
            budget = fun.dollar;
            spent = document.getElementById('funSpent_UserInput').value;
            arrow = document.getElementById('arrowImgFun');
            arrowText = document.getElementById('aboveBelowFun');
            break;
        default:
            console.log('not working');
    };

    // changing arrow and text whether spent is higher or lower than budget
    if (parseInt(budget) > parseInt(spent)){
        arrow.src = "./media/down.svg";
        arrowText.textContent = 'Below budget, good job!';
    }
    else if (parseInt(budget) < parseInt(spent)){
        arrow.src = "./media/up.svg";
        arrowText.textContent = 'Above budget, watch out!';
    }
    else {
        arrow.src = "./media/bar.svg";
        arrowText.textContent = 'Equal to budget.';
    }
}

function updateSpentValues(){
    food.spent = document.getElementById('foodSpent_UserInput').value;
    rent.spent = document.getElementById('rentSpent_UserInput').value;
    travel.spent = document.getElementById('travelSpent_UserInput').value;
    fun.spent = document.getElementById('funSpent_UserInput').value;
    categories.forEach(function (cat) {
        if (cat.spent == ''){
            cat.spent = 0;
        }
    });
}

// Update the total spent
function updateSpentTotal(){
    // updating the category's spent value
    updateSpentValues();

    let total = 0;
    categories.forEach(function (cat){
        total += parseInt(cat.spent);
    });
    
    monthlyActual_Label.textContent = `$${total}`;
}

// Update the monthly leftover
function updateCarryOver(){
    updateSpentValues();
    let total = startingIncome;
    categories.forEach(function (cat){
         total -= parseInt(cat.spent);
    });
    carryOver_Label.textContent = `$${total}`;
}
