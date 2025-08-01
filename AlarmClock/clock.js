const toggleBtn=document.querySelector(".toggle");
const digitalClock=document.querySelector(".Clock");
const setBtn=document.querySelector(".setBtn");
const hoursSelect=document.querySelector(".hours");
const minutesSelect=document.querySelector(".minutes");
const toneSelect=document.querySelector(".tone");
const bodyStyle=document.querySelector("body");
const alarmInfo=document.querySelector(".alarm-info");
const ampm=document.querySelector(".ampm");
const tones=['default','Morning Bell','Soft Melody','Alarm Beep'];


let alarms=[];
let audio=null;
function updateClock()
{
    const now=new Date();
    let hours=now.getHours();
    let minutes=now.getMinutes();
    let seconds=now.getSeconds();
    const ampmText = hours <= 12 ? 'PM' : 'AM';
    hours=hours % 12||12;
    hours=hours <10 ? '0'+hours:hours;
    minutes=minutes<10 ? '0'+minutes:minutes;
    seconds=seconds<10 ? '0'+seconds:seconds;
    digitalClock.textContent=`${hours}:${minutes}:${seconds} ${ampmText}`;

    checkAlarms(`${hours}:${minutes} ${ampmText}`);
}
setInterval(updateClock,1000);


toggleBtn.addEventListener("click",()=>
{
    bodyStyle.classList.toggle("gradient2");    
})

//populate dropdowns

function timerSet()
{
    for(let i=1;i<=12;i++)
    { 
        if(i<=9)
        {
            i="0"+i;
            hoursSelect.add(new Option(i,i)); 
        }
        else
        {
            hoursSelect.add(new Option(i,i));
        }
    }
    for(let j=0;j<=59;j++)
    {
        if(j<=9)
        {
            j="0"+j;
            minutesSelect.add(new Option(j,j)); 
        }
        else
        {
           minutesSelect.add(new Option(j,j));
        }
        
    }
    tones.forEach(tones=>
    { 
        toneSelect.add(new Option(tones,tones));
    })
};
timerSet();

//render alarm
function renderAlarm(alarm)
{
    alarmInfo.innerHTML+=`
    <div class="alarm-item"> 
    <p> ${alarm.time} </p>
    <div class="alarm-tone">
       <p> ${alarm.tone}</p>
    </div>
    <button class="delete">Delete</button>   
    <button class="stop">Stop</button>
    </div>`

}

//add alarm

setBtn.addEventListener("click",()=>
{
    const alarm=
    {
        time:`${hoursSelect.value}:${minutesSelect.value} ${ampm.value}`,
        tone:toneSelect.value
    }
    if(alarms.some(a=> a.time===alarm.time&& a.tone===alarm.tone))
        {
            alert("alarm already set");
            return;
        }
    alarms.push(alarm);
    renderAlarm(alarm);    
})

//delete alarm
alarmInfo.addEventListener("click", (e) => {
    const alarmItem = e.target.closest(".alarm-item");
    const alarmTime = alarmItem?.querySelector("p")?.textContent.trim();

    if (e.target.classList.contains("delete")) {
        
        stopTone();
        alarms = alarms.filter(alarm => alarm.time !== alarmTime);
        alarmItem.remove();
    }

    if (e.target.classList.contains("stop")) {
     
        stopTone();
        alarms = alarms.filter(alarm => alarm.time !== alarmTime);
        alert("Alarm stopped permanently.");
    }
});


//check alarm
function checkAlarms(currentTime)
{
    alarms.forEach(alarm=>
    {
        if(alarm.time===currentTime)
        {
            playTone(alarm.tone);
        }
    })
}

//playing tone

function playTone(tone)
{
    if(!audio)
    {
        let soundFile="default.wav";
    
        if(tone == "Morning Bell")
          {
            soundFile="farmAnimals.wav";
          }
        else if(tone == "Soft Melody")
          {
            soundFile="soft.wav";
          }
        else if(tone == "Alarm Beep")
          {
            soundFile="clockTone.wav";
          }
          

        audio =new Audio(soundFile);
        audio.play();
        setTimeout(stopTone,5000); 
    }
}

function stopTone()
{
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio = null;
    }


}


