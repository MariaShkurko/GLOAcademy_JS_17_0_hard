function fun(arg) {
    if (typeof arg !== 'string') {
        return 'Передана не функция';
    } else {
        return arg.trim().length > 30 ? arg.trim().substring(0, 30) + '...' : arg.trim();
    }
}

console.log(fun(10));
console.log(fun(true));
console.log(fun('I am Maria'));
console.log(fun('      Your dog     '));
console.log(fun('   Hello! My name is Maria. What is your name?    '));