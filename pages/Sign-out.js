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



// user
const btn=document.querySelector(".btn");
const nameInput=document.querySelector(".name");
const lastNameInput=document.querySelector(".lastName");
const  usernameInput=document.querySelector(".username");
const passwordInput=document.querySelector(".password");
const form=document.querySelector(".formSignUp");
const formCheckInput=document.querySelector(".form-check-input");

async function usersInfo() {
    
try{

const response=await fetch("https://67ab5c5a5853dfff53d722ee.mockapi.io/musicWebsite",{

method:"POST",

headers:{

    "Content-Type":"application/json",
},


body:JSON.stringify({
firstName:nameInput.value,
lastName:lastNameInput.value,
username:usernameInput.value,
password:passwordInput.value,
})

})
if(!response.ok){

    throw new Error(`Error: ${response.status}`)
}
const data=await response.json();


}

catch(err){

    console.log(err.message);
    
}

}





async function userCheck(username) {
    try{

const response= await fetch("https://67ab5c5a5853dfff53d722ee.mockapi.io/musicWebsite");
if(!response.ok){

    throw new Error(`Error:${response.status}`);
}
const data=await response.json();

  return  data.some((user)=>user.username===username);

    }

catch(err){

    console.log(err.message);
    return false;
}


}




form.addEventListener("submit",async (e)=>{
e.preventDefault();
const username=usernameInput.value;
 const check=await userCheck(username);
if (check) {
    alert("This username is already taken. Please choose another.");

    usernameInput.value="";
    nameInput.value="";
     lastNameInput.value="";
    passwordInput.value="";
    formCheckInput.checked=false;
    return
}

usersInfo();
alert(`Very welcome , ${username}`);
nameInput.value="";
lastNameInput.value="";
usernameInput.value="";
passwordInput.value="";
formCheckInput.checked=false;

})


// user






const navbarToggler=document.querySelector(".navbarToggler");
const navbarCollapse=document.querySelector(".navbar-collapse");
navbarToggler.addEventListener("click",(e)=>{

setTimeout(()=>{
if ( navbarCollapse.classList.contains("show")) {
  navbarCollapse.style.backgroundColor=" #0d0d0d";
}


},100)
});