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



const indicators=document.querySelector(".carousel-indicators");
const carouselInner=document.querySelector(".carousel-inner");
async function CarouselSlider() {
try{
   const response= await fetch(`https://corsproxy.io/?${encodeURIComponent("https://api.deezer.com/chart?limit=5")}`);
    if(!response.ok){
        throw new Error(`Error: ${response.status}`)
        
        }
        const answer= await response.json();
         
        const trackss = answer?.tracks?.data||[]; 

        
        carouselInner.innerHTML="";

        trackss.forEach((track,index)=> {
            const carouselItem=document.createElement("div");
            carouselItem.classList.add("carousel-item","CI");
                carouselItem.setAttribute("data-bs-interval", "3000");
            if(index===0){
                carouselItem.classList.add("active");
    
              }
            carouselItem.innerHTML=`<img
            src=${track?.album?.cover_big|| "default.jpg"}
            class="d-block w-100 img-i"
            alt="${track.title}"
          />
          <div class="carousel-caption d-none d-md-block top-0 mt-5">
            <p class="mt-5 mb-5 fs-2">
              Hot right now
            </p>
            <h1 class="mt-5  text-capitalize ">${track.title}</h1>
          </div>`

          carouselInner.append(carouselItem)
        });

       console.log(trackss);
       

}
catch(err){

    console.log(err.message);
    
}   
}
document.addEventListener("DOMContentLoaded", () => {
    CarouselSlider();
});






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

const popularTracks=document.querySelector(".popular-tracks");
const songsAudio=[];
let isPlaying=null;
async function  popularSongs() {
  try{

    const response=await fetch("https://api.allorigins.win/raw?url=" + encodeURIComponent("https://api.jamendo.com/v3.0/tracks/?client_id=8cb724ba&order=popularity_total&limit=12"),{
    method:"GET",
    headers:{
       "Content-Type":"application/json",
    }
    })

    if(!response.ok){

      throw new Error(`Erro: ${response.status}`)
    }
     
    const data= await response.json();
    const musics=data.results;
     musics.forEach((ele,index)=>{
       
     const music=document.createElement("div");
     music.classList.add("card");
     music.innerHTML=
     `<img src="${ele?.image||"default.jpg"}" class="card-img-top" alt="${ele.name}">
        <div class="card-body">
          <h5 class="card-title">${ele.name}</h5>
          <p class="card-text">${ele.artist_name}</p>
          <i class="bi bi-play-circle"></i>
          </div>`
          popularTracks.append(music);
          songsAudio.push(ele.audio);

      music.addEventListener("click",(e)=>playMusic(ele,index));})
    
  }


  catch(err){
    console.log(err.message);
    
  }

}

popularSongs();


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
      photo.src=ele?.image||"default.jpg";
      photo.alt=ele.name;
      playerBarTitle.textContent=ele.name;
      playerBarSingerName.textContent=ele.artist_name;
      
      audioTrack.src=ele.audio;
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
  const nextElement=popularTracks.children[nextIndex];
   const nextSong={
    audio:songsAudio[nextIndex],
    image:nextElement.querySelector(".card-img-top").src,
    name:nextElement.querySelector(".card-title").textContent,
    artist_name:nextElement.querySelector(".card-text").textContent,
   }
   playMusic(nextSong,nextIndex);
}
});

// playing next song default ends


//move forward and backwwrd


nextBtn.addEventListener("click",(e)=>{
  let nextIndex=isPlaying+1;
  if(nextIndex>=songsAudio.length){
      nextIndex=0;
  }

  const nextElement=popularTracks.children[nextIndex];
  const nextSong={
 audio:songsAudio[nextIndex],
 image:nextElement.querySelector(".card-img-top").src,
  name:nextElement.querySelector(".card-title").textContent,
  artist_name:nextElement.querySelector(".card-text").textContent,
  }

playMusic(nextSong,nextIndex);
})





prevBtn.addEventListener("click",(e)=>{
  let prevIndex=isPlaying-1;
  if(prevIndex<0){
      prevIndex=songsAudio.length-1;
  }

  const lastElement=popularTracks.children[prevIndex];
  const lastSong={
 audio:songsAudio[prevIndex],
 image:lastElement.querySelector(".card-img-top").src,
  name:lastElement.querySelector(".card-title").textContent,
  artist_name:lastElement.querySelector(".card-text").textContent,
  }

playMusic(lastSong,prevIndex);
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





// Tags



const selectedGenre=document.querySelectorAll(".small-box");

selectedGenre.forEach((box)=>{


  box.addEventListener("click",(e)=>{
    const genre=e.target.textContent.trim();
    
    window.location.href=`/pages/tracks.html?genre=${genre}`;
    
    });
    
  
})

// tags ends

//  middleSearchbox
const middleSearchbox=document.querySelector(".middle-searchbox");
const recommendationsBtn=document.querySelector(".recommendations-btn");

recommendationsBtn.addEventListener("click",(e)=>{

  e.preventDefault();
  const search=middleSearchbox.value.trim();
  if(search){
  window.location.href=`/pages/search.html?query=${encodeURIComponent(search)}`
  middleSearchbox.value="";
}
})
  
//  middleSearchbox ends




