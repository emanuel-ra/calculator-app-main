const resetButton = document.getElementById('reset-button');
const equalButton = document.getElementById('equal-button');
const deleteButton = document.getElementById('delete-button');

const screen = document.getElementById('screen');

const numbersButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');

// GLOBAL VARIABLES 
var variables = ['',''];
var operator = '';
var id = 0;

function reset(){
    variables = ['',''];
    operator = '';
    id = 0;
   
    updateScreen();
}

function updateScreen(){
    if(variables[id] === ''){
        screen.innerText = '0';        
    }else{
        screen.innerText = variables[id];        
    }
}

function calculate(){   
    var result = null;
    switch(operator){
        case '+':
            result = parseFloat(variables[id-1]) + parseFloat(variables[id]);
            break;
        case '-':
            result = result = parseFloat(variables[id-1]) - parseFloat(variables[id]);
            break;
        case '/':
            result = result = parseFloat(variables[id-1]) / parseFloat(variables[id]);
            break;
        case '*':
            result = result = parseFloat(variables[id-1]) * parseFloat(variables[id]);
            break;
    }

    operator = '';
    variables[id] = '';
    variables[id-1] = result;

    id = 0;

    updateScreen();
    variables[id] = '';

    console.log('variables: ', variables, ' id:', id, 'operator: ', operator);
}

function del(){
    if(variables[id].length > 0)
    {       
        variables[id] = variables[id].substring(0,variables[id].length-1);
        
    }
    updateScreen();
}

resetButton.addEventListener('click',reset);
deleteButton.addEventListener('click',del);
equalButton.addEventListener('click',calculate);

numbersButtons.forEach(button => {
    button.addEventListener('click', () => {

        const regexp = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/; // <= Black Magic ;)


        if ( regexp.test(variables[id]+button.innerText)){
            variables[id] += button.innerText;
            updateScreen();
        }
        
    })
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {

        if(variables[0] === '' && screen.innerText != '0'){
            variables[0] =  screen.innerText;
        }
        
        id++;

        switch(button.innerText){
            case '+':
                operator = button.innerText;
                break;
            case '-':
                operator = button.innerText;
                break;
            case '/':
                operator = button.innerText;
                break;
            case 'X':
                operator = '*';
                break;
        }

        console.log('variables: ', variables, ' id:', id, 'operator: ', operator);
    });
});