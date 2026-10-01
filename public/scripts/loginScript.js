const signUpBtn = document.querySelector("#signUpBtn");
const signInBtn = document.querySelector("#signInBtn");
const userEmail = document.querySelector('#userEmail');
const password = document.querySelector("#password")

signUpBtn.addEventListener("click" ,async (e)=>{
    e.preventDefault(); 
    
    //navigating to login page  as sign in button is clicked
    window.location.href = '/signUp'   
  
})

signInBtn.addEventListener('click', async (e)=>{
    e.preventDefault();

    const loginData = {
        userEmail : userEmail.value,
        password : password.value
    }
    if(userEmail.value && password.value){
        const options = {
            method : 'POST',
            headers : {
                'Content-Type' : "application/json"
            },
            body : JSON.stringify(loginData)
        }
        let response = await fetch("/accessAccount", options);
        let data = await response.json();
        if(!response.ok){
            console.log(data.message);
            return;
        }
        window.location.href = data.redirect;

        // if(response.token){
        //     // localStorage.setItem('myAppToken', response.token);
        //     window.location.href = response.redirect;
            
        // }else{
        //     console.log("login failed. Please try again later")
        // }

    }
})

 