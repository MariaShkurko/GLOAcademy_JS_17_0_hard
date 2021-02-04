'use strict';

let arr = [
    '125555594412125451521',
    '254151254510',
    '151521245231513515',
    '454154854536',
    '701214521212311',
    '249885210.53',
    '535416355211525415684'
];

arr.forEach(element => {
    if (element[0] == '2' || element[0] == '4') {
        console.log(element);
    }
});

let simple = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

const simpleNumbers = function (n) {  
    let simpleNumbers = [2];

    nextNumber: 
    for (let i = 3; i <= n; i++) {
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                continue nextNumber;
            }
        }
        simpleNumbers.push(i);
    }

    return simpleNumbers;
};

const sieveOfEratosthenes = function (n) {
    let simpleNumbers = [];

    for (let i = 2; i <= n; i++) {
        simpleNumbers.push(i);
    }

    for (let j = 0; j < simpleNumbers.length; j++) {
        if (simpleNumbers[j] > n/2) {
            break;
        }

        let arr = simpleNumbers;

        for (let i = j + 1; i < simpleNumbers.length; i++) {
            if (simpleNumbers[i] % simpleNumbers[j] === 0) {
                arr.splice(i, 1);
            }
        }

        simpleNumbers = arr;
    }

    return simpleNumbers;
};

console.log('');
console.log('Сравнение результатов эталонного массива, алгоритма простого перебора и алгоритма Решето Эратосфена');
console.log(simple);

console.time('checkFor');
console.log(simpleNumbers(100));
console.timeEnd('checkFor');

console.time('checkFor');
console.log(sieveOfEratosthenes(100));
console.timeEnd('checkFor');

console.log('');
console.log('Вывод результатов алгоритма Решето Эратосфена в требуемом формате');
sieveOfEratosthenes(100).forEach(element => {
    console.log(element + '\tДелители этого числа: 1 и ' + element);
});