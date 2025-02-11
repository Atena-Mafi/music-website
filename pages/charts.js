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




const topRight =document.querySelector(".top-right");
 const tracksList =document.querySelector(".tracksList");
 const topLeft =document.querySelector(".top-left");
 const artistList=document.querySelector(".artistList");



 async function chartTracks() {

  try{
    const response=await fetch(`https://corsproxy.io/?url=${encodeURIComponent("https://api.deezer.com/chart/0/tracks?limit=18")}`);
    
    if(!response.ok){

      throw new Error(`Error:${response.status}`);
    }

     const data=await response.json();
      const tracks =data.data;

      tracks.forEach(track=> {
        
         const card=document.createElement("div");
         card.classList.add("card");
         card.innerHTML=`
           <p class="rate">${track.position}</p> 
        <div class="photo"> <img src="${track.album.cover_medium}" alt="${track.title}"></div>
        <div class="info">
          <p class="trackName">${track.title}</p>
          <p class="artistName">${track.artist.name}</p>
        </div>
         `

           topRight.style.background=`url("${tracks[0].artist.picture_medium}") no-repeat center/cover`;
         topRight.innerHTML=`
          <img src="${tracks[0].album.cover_medium}" alt="${tracks[0].artist.name}">
        <article class="trackInfoTop">
            <p class="title>"${tracks[0].title}"</p>
            <p><small>${tracks[0].artist.name}</small></p>

        </article>
         `

         tracksList.append(card);
      });

  }

  catch(err){

    console.log(err.message);
    
  }
  
 }


 chartTracks();






 
 async function chartArtists() {

  try{
    const response=await fetch(`https://corsproxy.io/?url=${encodeURIComponent("https://api.deezer.com/chart/0/artists?limit=18")}`);
    
    if(!response.ok){

      throw new Error(`Error:${response.status}`);
    }

     const data=await response.json();
     const artists =data.data;
        artists.forEach((artist)=>{
          const card=document.createElement("div");
          card.classList.add("card");
          card.innerHTML=`
            <div class="rate">${artist.position}</div> 
            <div class="artistPhoto"> <img src="${artist.picture_medium}" alt="${artist.name}"></div>
            <div class="info>
              <p class="artistName">${artist.name}</p>
            </div>`
            artistList.append(card);
          
            topLeft.style.background=`url("${artists[0].picture_medium}") no-repeat center/cover`;
            topLeft.innerHTML=`
             <img src="${artists[0].picture_medium}" alt="${artists[0].name}  class="little">
           <article class="artistInfoTop">
               <p><small>${artists[0].name}</small></p>
   
           </article>
            `





        })
  }

  catch(err){

    console.log(err.message);
    
  }
  
 }
 chartArtists();










 
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


const navbarToggler=document.querySelector(".navbarToggler");
const navbarCollapse=document.querySelector(".navbar-collapse");
navbarToggler.addEventListener("click",(e)=>{

setTimeout(()=>{
if ( navbarCollapse.classList.contains("show")) {
  navbarCollapse.style.backgroundColor=" #0d0d0d";
}


},100)
});