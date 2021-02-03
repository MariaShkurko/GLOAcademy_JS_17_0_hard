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

let simpleNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

simpleNumbers.forEach(element => {
    console.log(element + '\tДелители этого числа: 1 и ' + element);
});