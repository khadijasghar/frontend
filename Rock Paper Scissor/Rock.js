let userscore=0;
let compscore=0;
let choices=document.querySelectorAll(".choice");
const message=document.querySelector("#msg");
const userscorepara=document.querySelector("#user-score");
const compscorepara=document.querySelector("#comp-score");

let drawGame=()=>
{
    console.log("game was draw");
}
let showWinner=(userWin,userchoice,compchoice)=>
{
    if(userWin)
    {
        userscore++;
        userscorepara.innerText=userscore;

        message.innerText=`You win. Your ${userchoice} beats ${compchoice}`;
        message.style.backgroundColor="green";

    }
    else
    {
        compscore++;
        compscorepara.innerText=compscore;

        message.innerText=`You lost .${compchoice} beats Your ${userchoice}`;
        message.style.backgroundColor="red";
        
    }
}
let genComputerChoice=()=>
{
    const options=["rock","paper","scissors"];
    const randomIdx=Math.floor(Math.random()*3);
    return options[randomIdx];
}
let playgame=(userchoice)=>
{
    console.log("user choice =",userchoice);
    //generate computer choice
    const compchoice=genComputerChoice();
    console.log("computer choice =",compchoice);
    if(userchoice==compchoice)
    {
        drawGame();
        message.innerText="Game was Draw.Play Again";
        message.style.backgroundColor="#081b31";
    }
    else
    {
        let userWin=true;
        if(userchoice==="rock")
        {
            userWin=compchoice==="paper"?false:true;
        }
        else if(userchoice==="paper")
        {
            userWin=compchoice==="scissors"?false:true;
        }
        else
        {
            userWin=compchoice==="rock"?false:true;
        }
        showWinner(userWin,userchoice,compchoice);

    }

}
choices.forEach((choice)=>
{
    choice.addEventListener("click",()=>
    {
        const userchoice=choice.getAttribute("id");
        playgame(userchoice);
    })
})