
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

const searchResults=document.querySelector(".search-results");
searchResults.textContent=searchQuery;


async function searchedTracks() {
try{
    const apiUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=8cb724ba&format=json&namesearch=${encodeURIComponent(searchQuery)}`;
    const response = await fetch(apiUrl);

if (!response.ok) {
    throw new Error(`Error:${response.status}`);
}

const data= await response.json();
return data.results;

}
catch(err){
console.log(err.message);
}  
return null;  
}





async function searchedArtists() {
    try{
        const apiUrl = `https://api.jamendo.com/v3.0/artists/?client_id=8cb724ba&format=json&name=${encodeURIComponent(searchQuery)}`;
        const response = await fetch(apiUrl);
    
    if (!response.ok) {
        throw new Error(`Error:${response.status}`);
    }
    
    const data= await response.json();
    return data.results;
    
    }
    catch(err){
    console.log(err.message);
    }  
    return null;  
    }
    



    async function searchedAlbums() {
        try{
            const apiUrl = `https://api.jamendo.com/v3.0/albums/?client_id=8cb724ba&format=json&name=${encodeURIComponent(searchQuery)}`;
            const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`Error:${response.status}`);
        }
        
        const data= await response.json();
        return data.results;
        
        }
        catch(err){
        console.log(err.message);
        }  
        return null;  
        }
        

async function displayResults() {
    const tracks = await searchedTracks();
    const artists = await searchedArtists();
    const albums = await searchedAlbums();

    if ((!tracks || tracks.length === 0) && (!artists || artists.length === 0) && (!albums || albums.length === 0)) {
        searchResults.textContent = "Sorry, nothing found.";
        return;
    }


const artistsContainer=document.querySelector(".artists-container");
const albumsContainer=document.querySelector(".albums-container");
const tracksContainer=document.querySelector(".tracks-container");


 artistsContainer.innerHTML="";
 albumsContainer.innerHTML="";
tracksContainer.innerHTML="";

if(artists){

    artists.forEach(item => {
        // artists    
        const artistCard=document.createElement("div");
        artistCard.classList.add("card");
        artistCard.innerHTML=`<img src="${item.image ? item.image : 'fallback-image.jpg'}" class="card-img" alt="${item.name}">
        <div class="card-img-overlay">
          <a class="card-text">${item.name}</a>
        </div>
        `;
        artistsContainer.append(artistCard);
    });

}


// albums   
if (albums) {
    albums.forEach(item => {
    const albumCard=document.createElement("div");
    albumCard.classList.add("card");
    albumCard.innerHTML=`<img src="${item.image ? item.image : 'fallback-image.jpg'}" class="card-img" alt="${item.album_name}">
    <div class="card-img-overlay">
    <a class="card-text">${item.album_name}</a>
    <a class="card-text2 ">${item.artist ? item.artist.name : "Unknown Artist"}</a>
    </div>
    `;
    albumsContainer.append(albumCard);
 
    })
}

    // tracks
if (tracks) {
    tracks.forEach(item => {
    const trackCard=document.createElement("div");
   trackCard.classList.add("card");
   trackCard.innerHTML=`<img src="${item.image ? item.image : 'fallback-image.jpg'}" class="card-img" alt="${item.name}">
    <div class="card-img-overlay">
      <a class="card-text">${item.artist ? item.artist.name : "Unknown Artist"}</a>
    </div>
    `;
    tracksContainer.append(trackCard);
    })
    };


}




document.addEventListener("DOMContentLoaded", displayResults);
























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