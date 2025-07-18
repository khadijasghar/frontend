let buttons=document.querySelectorAll(".buttons");
let operators=document.querySelectorAll(".operators");
let clearbtn=document.querySelector(".clear");
let equalbtn=document.querySelector(".equal");
let display=document.querySelector(".calc-display");


buttons.forEach((button)=>
{
    button.addEventListener("click",()=>
    {
          
        display.innerText+=button.innerText;    
    })
})


operators.forEach((operator)=>
{
    operator.addEventListener("click",()=>
    {
        display.innerText+=operator.innerText;

    })
})

clearbtn.addEventListener("click",()=>
{
    display.innerText=" ";
})

equalbtn.addEventListener("click",()=>
{
    display.innerText=eval(display.innerText);
})





