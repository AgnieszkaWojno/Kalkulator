///https://www.youtube.com/watch?v=j59qQ7YWLxw

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')/*pierwsza liczba działania*/
const currentOperandTextElement = document.querySelector('[data-current-operand]')/*druga liczba działania*/


class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement; //bieżąca liczba (druga)
        this.clear();
    }
    clear(){
        this.currentOperand = '';
        this.previousOperand = ''
        this.operation = undefined;
        this.computationDone = false;
    }
    delete(){
        if (this.divisionByZero) this.currentOperand = ''
        else
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number){ 
        if(this.computationDone)
            {
                this.currentOperand = ''
                this.previousOperand = ''
                this.computationDone = false
            }

        if(this.divisionByZero) {
            this.currentOperand = ''
            this.previousOperand = ''
            this.divisionByZero = false
        }
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if (this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        if(!this.divisionByZero){
            this.previousOperand = this.currentOperand + operation  ///??????
            this.currentOperand = ''}
        else{
            this.currentOperand = "Nie dzilę przez zero"
        }
    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        //computation = `${prev} ${this.operation} ${current}`
        //computation = prev this.operation current
        //computation = `(${prev} * ${current})`
        //console.log(computation)
        switch (this.operation){
            case '+':
                computation = (prev + current).toFixed(2)
                //this.computationDone = true
                break
            case '-':
                computation = prev - current
                //this.computationDone = true
                break
            case '*':
                computation = prev * current
                //this.computationDone = true
                break
            case '/':
                if(current == 0) {
                    computation = "Nie dzielę przez zero!"
                    this.divisionByZero = true
                    break}
                computation = (prev / current).toFixed(2)
                break
            default: return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        //if(this.operation != null)
        this.previousOperandTextElement.innerText = this.previousOperand// + this.operation
    }
}

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

//console.log(numberButtons)
numberButtons.forEach(button => {
    button.addEventListener('click',() => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click',() => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
//console.log(equalsButton)
equalsButton.addEventListener('click', button =>{  //zamiast button (to chyba nazwa funkcji) napisać same () bez nazwy?
    calculator.compute()
    calculator.updateDisplay()
    calculator.computationDone = true //gdy wyliczono wynik i już nie dopisujemy cyfr, tylko wpisujemy od nowa
})

allClearButton.addEventListener('click', button =>{  //zamiast button (to chyba nazwa funkcji) napisać same () bez nazwy? albo parametr przekazywany do funkcji?
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>{  //zamiast button (to chyba nazwa funkcji) napisać same () bez nazwy?
    calculator.delete()
    calculator.updateDisplay()
})