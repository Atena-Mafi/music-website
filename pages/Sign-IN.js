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




// form


const form=document.querySelector(".formSignUp");
const usernameInput=document.querySelector("#username");

const passwordInput=document.querySelector("#exampleInputPassword1");
const btn=document.querySelector(".btn-secondary");


async function signIn(username,password) {
    
try{

const response=await fetch(`https://67ab5c5a5853dfff53d722ee.mockapi.io/musicWebsite`);
if(!response.ok){
    throw new Error(`Error:${response.status}`)
}


const data=await response.json();
return data.some((user)=>user.username ===username && user.password===password);
}

catch(err){

    console.log(err.message);
    
}

}



form.addEventListener("submit",async(e)=>{
    e.preventDefault();
const username=usernameInput.value;
const password=passwordInput.value;
 const checkSignIn =await  signIn(username,password);
    if (checkSignIn) {
        alert(`Welcome,${username}.`)
        usernameInput.value="";
        passwordInput.value="";
        window.location.href="../Home.html";

    }else{

        alert(`Incorrect username or password.`)
        usernameInput.value="";
        passwordInput.value="";
    }

})







// form


const navbarToggler=document.querySelector(".navbarToggler");
const navbarCollapse=document.querySelector(".navbar-collapse");
navbarToggler.addEventListener("click",(e)=>{

setTimeout(()=>{
if ( navbarCollapse.classList.contains("show")) {
  navbarCollapse.style.backgroundColor=" #0d0d0d";
}


},100)
});