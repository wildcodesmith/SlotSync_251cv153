const signUpBtn = document.querySelector("#signUpBtn");

signUpBtn.addEventListener("click" ,async (e)=>{
    e.preventDefault(); 
    
    //navigating to login page  as sign in button is clicked
    window.location.href = '/signUp'   
  
})

 