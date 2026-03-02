const display = document.getElementById('display');
//5 == '5' //true
//5 === '5' //false
function appendToDisplay(input){
    if (display.value === "Error" || display.value === "∞") {
        clearDisplay();
    }
    display.value += input;
}

function erase() {
    display.value = display.value.slice(0, -1);
}

function clearDisplay(){
    display.value = "";
}
//console.log(eval("2*(3+2)"));
function calculate() {
    try{
        let result = eval(display.value);
        if (!isFinite(result)) {
            display.value = "∞";
        }
        else{
            display.value = result;
        }  
    }
    catch (error){
        display.value = "Error";
    }
    
}

document.addEventListener('keydown', (event)=>{
    const key = event.key;
    if (!isNaN(key)) {
        appendToDisplay(key);
    }
})
