"use strict";

const isNumber = (num) => {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const isString = (str) => {
    return (str.length !== 0) && !isNumber(str);
}

const formattingString = (str) => {
    return str[0].toUpperCase() + str.slice(1);
}

const validate = () => {
    const input = document.querySelectorAll('input[type=text]');

    input.forEach((item) => {
        item.addEventListener('input', () => {
            if (item.placeholder === 'Наименование') {
                item.value = item.value.replace(/[^а-яёА-ЯЁ .,-]/, '');
            } else if (item.placeholder === 'Сумма') {
                item.value = item.value.replace(/[^0-9]/, '');
            }
        })
    })
}

const buttonStart = document.getElementById('start'),
    buttonPlus = document.querySelectorAll('.btn_plus'),
    incomePlus = buttonPlus[0],
    expensesPlus = buttonPlus[1];

const salaryAmount = document.querySelector('.salary-amount'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositСheck = document.querySelector('#deposit-check'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodValue = document.querySelector('.period-amount'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],

    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    incomeMonth: 0,
    expensesMonth: 0,

    mission: 2000000,
    period: 36,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,

    start: function () {
        appData.budget = parseFloat(salaryAmount.value);

        appData.getIncome();
        appData.getAddIncome();
        appData.getExpenses();
        appData.getAddExpenses();
        appData.getExpensesMonth();
        appData.getIncomeMonth();
        appData.getBudget();
        appData.showResult();
    },

    showResult: function () {
        budgetMonthValue.value = parseFloat(appData.budgetMonth.toFixed(2));
        budgetDayValue.value = parseFloat(appData.budgetDay.toFixed(2));
        expensesMonthValue.value = parseFloat(appData.expensesMonth.toFixed(2));
        additionalIncomeValue.value = appData.addIncome.join(', ');
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        incomePeriodValue.value = appData.calcSavedMoney();
        targetMonthValue.value = appData.getTargetMonth();

        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = appData.calcSavedMoney();
        });
    },

    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);

        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }

        validate();
    },

    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);

        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';

        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }

        validate();
    },

    getExpenses: function () {
        expensesItems.forEach((item) => {
            let itemTitle = item.querySelector('.expenses-title').value,
                itemAmount = item.querySelector('.expenses-amount').value;

            if (isString(itemTitle) && isNumber(itemAmount)) {
                appData.expenses[itemTitle] = parseFloat(itemAmount);
            }
        });
    },

    getIncome: function () {
        incomeItems.forEach((item) => {
            let itemTitle = item.querySelector('.income-title').value,
                itemAmount = item.querySelector('.income-amount').value;

            if (isString(itemTitle) && isNumber(itemAmount)) {
                appData.income[itemTitle] = parseFloat(itemAmount);
            }
        });
    },

    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');

        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function () {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },

    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },

    getIncomeMonth: function () {
        for (let key in appData.income) {
            appData.incomeMonth += appData.income[key];
        }
    },

    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },

    getTargetMonth: function () {
        return Math.ceil(targetAmount.value / appData.budgetMonth);
    },

    getStatusIncome: function () {
        if (appData.budgetDay > 1200) {
            return "У вас высокий уровень дохода";
        } else if (appData.budgetDay > 600 && appData.budgetDay <= 1200) {
            return "У вас средний уровень дохода";
        } else if (appData.budgetDay > 0 && appData.budgetDay <= 600) {
            return "К сожалению у вас уровень дохода ниже среднего";
        } else {
            return "Что-то пошло не так";
        }
    },

    getInfoDeposit: function () {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', 10);
            } while (!isNumber(appData.percentDeposit));

            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(appData.moneyDeposit));
        }
    },

    calcSavedMoney: function () {
        appData.period = parseFloat(periodSelect.value);
        return appData.budgetMonth * appData.period;
    }
};

buttonStart.addEventListener('click', () => {
    if (salaryAmount.value !== '' && isNumber(salaryAmount.value)) {
        appData.start();
    } else {
        salaryAmount.value = '';
        alert('Введите число в поле "Месячный доход"');
    }
});

incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', () => {
    periodValue.textContent = periodSelect.value;
});

validate();