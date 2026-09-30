const token = localStorage.getItem('myAppToken');

if(!token){
    window.location.href = '/';
}else {
    try{
      async function getting_data() {
        let options = {
            method : 'GET',
            headers : {
                'Authorization': 'Bearer ' + token
            }
        }

        let data = await fetch('/dashboardData', options)
        let response = await data.json();
        if (!data.ok) {
                 
                localStorage.removeItem('myAppToken');
                window.location.href = '/'

        }else{
            alert("login in succesfully")
            alert(response.userName)
        }
    }
    getting_data()

    }catch(error){
        console.log('error loading dashboard', error)
    }
}