//initialise variable
let songIndex=0;
let audioElement = new Audio('img/1.mp3');//audioelemet.play;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myprogress');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('mastersong');
let songItems = Array.from(document.getElementsByClassName('songitem'));
//let songPlay = document.getElementsById('songname');

let songs =[
     {songName:"solace",filePath: "img/1.mp3" ,   coverPath: "img/solace.jpeg"},
     {songName:"To.the.stars",filePath: "img/2.mp3" ,  coverPath: "img/To-The-Stars.jpg" },
     {songName:"nai chaidi",filePath: "img/3.mp3" ,  coverPath: "img/nai chaidi.jpeg"},
     {songName:"vibe",filePath: "img/4.mp3" ,  coverPath: "img/vibe.jpg"}
     ]

songItems.forEach((element,i)=> {
  // console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songlistitem")[0].innerText = songs[i].songName;
})


//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
     }
     else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
     }

})
//listen to events
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
   // console.log(progress);
    myProgressBar.value = progress; 
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songName')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
       element.classList.add('fa-circle-play');
    } )
}

Array.from(document.getElementsByClassName('songName')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        //console.log(e.target);
        masterSongName.innerText = songs[songIndex].songName;
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `img/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=4){
        songIndex =0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `img/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex =0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `img/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})