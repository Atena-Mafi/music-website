const searchIcon=document.querySelector("#searchIcon");
const navbarNav=document.querySelector(".navbar-nav");
const searchForm=document.querySelector("#searchForm");
const searchingInput=document.querySelector("#searching");
const searchBtn=document.querySelector(".search-btn");
const closeSearchBtn=document.querySelector("#closeSearch");
searchIcon.addEventListener("click",(e)=>{
  e.preventDefault();
  navbarNav.classList.add("d-none");
  searchForm.classList.remove("d-none");
  searchingInput.focus();

})

searchBtn.addEventListener("click",(e)=>{

  e.preventDefault();
  const search=searchingInput.value.trim();
  if(search){
  window.location.href=`/pages/search.html?query=${encodeURIComponent(search)}`
  searchingInput.value="";
  }
  
});


closeSearchBtn.addEventListener("click",(e)=>{

  e.preventDefault();
  searchForm.classList.add("d-none");
  navbarNav.classList.remove("d-none");

})


searchingInput.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){
  searchBtn.click();

}

})









const urlParams= new URLSearchParams (window.location.search);
const artist=urlParams.get("query");
const songsAudio=[];
let isPlaying=null;
let trackList=[];
async function artistInfo() {

try{

const response=await fetch(`https://corsproxy.io/?url=${encodeURIComponent(`https://api.deezer.com/search/artist?q=${artist}`)}`)

if(!response.ok){

    throw new Error(`Error ${response.status}`);
}

const data=await response.json();
const artistInformation=data.data[0];

const artistTopCard=document.querySelector(".card");
artistTopCard.innerHTML=`

<div class="cardInfo">
    <h5 class="cardTitle">${artistInformation.name}</h5>
    <p class="text">Fans: ${artistInformation.nb_fan}</p>
    <p class="text"><small>Albums: ${artistInformation.nb_album}</small></p>
  </div>
<img src="${artistInformation.picture_big}" class="photo" alt="${artistInformation.name}">
`
const artistId=data.data[0].id;
const artistTrackContainer=document.querySelector(".artistTrackContainer");
try{
 const trackResponse= await fetch(`https://corsproxy.io/?url=${encodeURIComponent(`https://api.deezer.com/artist/${artistId}/top?limit=10`)}`)
if(!trackResponse.ok){

    throw new Error(`Error:${trackResponse.status}`);
}

const trackData= await trackResponse.json();
trackList = trackData.data;
trackData.data.forEach((track,index)=> {
const cardTrack=document.createElement("div");
cardTrack.classList.add("track-card")
cardTrack.innerHTML=`<img src="${track.album.cover_medium}" class="card-img-top" alt="${track.title}">
    <div class="card-body">
      <p class="card-title"><small>${track.title}</small></p>
        <i class="bi bi-play-circle"></i>
        </div>
      `
      songsAudio.push(track.preview);
      artistTrackContainer.append(cardTrack);

      cardTrack.addEventListener("click",(e)=>playMusic(track,index));
});
}
catch(err){

    console.log(err.message);
    
}
}
catch(err){
    console.log(err.message);
    
}
}

artistInfo();





// Player Bar buttons starts
const musicPlayer =document.querySelector(".music-player");
const playBtn = document.querySelector(".play");
const nextBtn = document.querySelector(".bi-fast-forward-fill");
const prevBtn = document.querySelector(".bi-skip-backward-fill");
const replayBtn = document.querySelector(".bi-arrow-repeat");
const shuffleBtn = document.querySelector(".bi-shuffle");
const volumeBar = document.querySelector("#volum-controler");
const progressBar = document.querySelector("#progress-bar");
const photo=document.querySelector(".picture img");
const playerBarTitle=document.querySelector(".title");
const playerBarSingerName=document.querySelector(".singer-name");
const audioTrack=document.querySelector(".audioTrack");
const volumeSignEL=document.querySelector(".volumeSign");

// Player Bar buttons ends



 async function playMusic(ele,index) {
  if(isPlaying===index){
    musicPlayer.classList.add("d-none");
    audioTrack.pause();
    audioTrack.currentTime = 0;
    isPlaying=null;
    playBtn.classList.add("bi-play-fill");
    playBtn.classList.remove("bi-pause-fill");
   }else{
    audioTrack.pause();
    audioTrack.currentTime = 0;
    musicPlayer.classList.remove("d-none");
      photo.src=ele.album.cover_medium;
      photo.alt=ele.title;
      playerBarTitle.textContent=ele.title;
    
      
      audioTrack.src=ele.preview;
      playBtn.classList.remove("bi-play-fill");
       playBtn.classList.add("bi-pause-fill");
       audioTrack.play();
      isPlaying=index;
    }

 }


 playBtn.addEventListener("click",(e)=>{
  if (audioTrack.paused) {
    playBtn.classList.remove("bi-play-fill");
    playBtn.classList.add("bi-pause-fill");  
    audioTrack.play();
  }else{
   
    playBtn.classList.add("bi-play-fill");
    playBtn.classList.remove("bi-pause-fill");  
    audioTrack.pause();
  }
                           
 })




// shuffle
  shuffleBtn.addEventListener("click",(e)=>{
  shuffleBtn.classList.toggle("shuffle");
  if (shuffleBtn.classList.contains("shuffle")) {
    shuffleBtn.style.textShadow="2px 2px 5px hsl(31, 22.80%, 63.90%)";
  }else{
   shuffleBtn.style.textShadow="none";
  }

})

// shuffle ends




// repeat a song 
replayBtn.addEventListener("click",(e)=>{
  replayBtn.classList.toggle("repeat");
  if (replayBtn.classList.contains("repeat")) {
    replayBtn.style.textShadow="2px 2px 5px hsl(31, 22.80%, 63.90%)";
  }else{
    replayBtn.style.textShadow="none";
  }

});
  
  // repeat a song ends


// playing next default song 

audioTrack.addEventListener("ended",(e)=>{
if(replayBtn.classList.contains("repeat")){
  audioTrack.currentTime=0;
  audioTrack.play();
}else {
let nextIndex="";
if(shuffleBtn.classList.contains("shuffle")){
  nextIndex=Math.floor(Math.random()*songsAudio.length);
}else{
  nextIndex=isPlaying+1;
  if(nextIndex>=songsAudio.length) {
    nextIndex=0;
  }
}

   playMusic(trackList[nextIndex],nextIndex);
}
});

// playing next song default ends


//move forward and backwwrd


nextBtn.addEventListener("click",(e)=>{
  let nextIndex=isPlaying+1;
  if(nextIndex>=songsAudio.length){
      nextIndex=0;
  }

playMusic(trackList[nextIndex],nextIndex);
})





prevBtn.addEventListener("click",(e)=>{
  let prevIndex=isPlaying-1;
  if(prevIndex<0){
      prevIndex=songsAudio.length-1;
  }

playMusic(trackList[prevIndex],prevIndex);
})

//move forward and backwwrd ends





// progressBar

audioTrack.addEventListener("timeupdate",(e)=>{

if (audioTrack.duration) {
  const progress=(audioTrack.currentTime/audioTrack.duration)*100;
  progressBar.value=progress;
}
})


progressBar.addEventListener("input",(e)=>{

const newDuration=(progressBar.value/100)*audioTrack.duration;
audioTrack.currentTime=newDuration;
})

// progressBar ends



// volumeBar 

volumeBar.addEventListener("input",()=>{

audioTrack.volume=volumeBar.value/100;
if (volumeBar.value==="0") {
  volumeSignEL.classList.remove("bi-volume-up-fill");
  volumeSignEL.classList.add("bi-volume-mute-fill");
}else{
  volumeSignEL.classList.add("bi-volume-up-fill");
  volumeSignEL.classList.remove("bi-volume-mute-fill");
 
}

})


audioTrack.addEventListener("play",()=>{
  audioTrack.volume=volumeBar.value/100;
  if (volumeBar.value==="0") {
    volumeSignEL.classList.remove("bi-volume-up-fill");
    volumeSignEL.classList.add("bi-volume-mute-fill");
  }else{
    volumeSignEL.classList.add("bi-volume-up-fill");
    volumeSignEL.classList.remove("bi-volume-mute-fill");
   
  }

})


// volumeBar  ends













































// biography starts


const biographyTitle=document.querySelector(".biographyTitle");
const biographyPara=document.querySelector(".biography");

async function biography() {
    
try{
const response=await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(artist)}`)

if(!response.ok){

    throw new Error(`Error${response.status}`);
}

const data=await response.json();
biographyPara.textContent=data.extract;

}

catch(err){

    console.log(err.message);
    
}
}
biography()

// biography ends