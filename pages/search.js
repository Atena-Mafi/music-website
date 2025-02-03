
// searchboxFunction starts
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

// searchboxFunction ends



// show searchbox result

const urlParams=new URLSearchParams(window.location.search);
const searchQuery=urlParams.get("query");

const searchesults=document.querySelector(".search-results");
searchesults.textContent=searchQuery;


async function searched() {
try{
    const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
   const apiUrl = `https://api.deezer.com/search?q=${encodeURIComponent(searchQuery)}&limit=12`;
   const response = await fetch(`${proxyUrl}${encodeURIComponent(apiUrl)}`);

if (!response.ok) {
    throw new Error(`Error:${response.status}`);
}

const data= await response.json();
return data.data;

}
catch(err){
console.log(err.message);
}  
return null;  
}




async function displayResults() {
const results=await searched();

if(!results || results.length===0){
    searchesults.textContent="Sorry nothing found."

}


const artistsContainer=document.querySelector(".artists-container");
const albumsContainer=document.querySelector(".albums-container");
const tracksContainer=document.querySelector(".tracks-container");


 artistsContainer.innerHTML="";
 albumsContainer.innerHTML="";
tracksContainer.innerHTML="";

 const artists=new Map();
const albums=new Map();
const tracks=new Map();


results.forEach(item => {
// artists    
if (!artists.has(item.artist.id)) {
    
const artistCard=document.createElement("div");
artistCard.classList.add("card");
artistCard.innerHTML=`<img src="${item.artist.picture_medium}" class="card-img" alt="${item.artist.name}">
<div class="card-img-overlay">
  <a class="card-text">${item.artist.name}</a>
</div>
`;
artistsContainer.append(artistCard);
artists.set(item.artist.id,true);
}


// albums   
if (!albums.has(item.album.id)) {
    
    const albumCard=document.createElement("div");
    albumCard.classList.add("card");
    albumCard.innerHTML=`<img src="${item.album.cover_medium}" class="card-img" alt="${item.album.title}">
    <div class="card-img-overlay">
    <a class="card-text">${item.album.title}</a>
    <a class="card-text">${item.artist.name}</a>
    </div>
    `;
    albumsContainer.append(albumCard);
   albums.set(item.album.id,true);
    }

    

    // tracks
if (!tracks.has(item.track.id)) {
    
    const trackCard=document.createElement("div");
   trackCard.classList.add("card");
   trackCard.innerHTML=`<img src="${item.album.cover_medium}" class="card-img" alt="${item.title}">
    <div class="card-img-overlay">
      <a class="card-text">${item.artist.name}</a>
    </div>
    `;
    tracksContainer.append(trackCard);
    tracks.set(item.track.id,true);
    }
});

}




displayResults();





// show searchbox result  ends







// artist.innerHtml=`
// <img src="${arti.img}" class="card-img" alt="${arti.name}">
// <div class="card-img-overlay">
//   <h5 class="card-title">Card title${song.name}</h5>
//   <p class="card-text">${arti.artist}</p>
// </div>



// const artists = data.forEach((arti)=> {
//     const artist=document.createElement("div");
//     artist.classList.add("card")
//       artist.innerHtml=`
//   <img src="${arti.img}" class="card-img" alt="${arti.name}">
//   <div class="card-img-overlay">
//     <a class="card-text">${arti.artist}</a>
//   </div>
// `

// });