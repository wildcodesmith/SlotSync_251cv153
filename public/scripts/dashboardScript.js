
async function getUserDashboard(){
     try {
    let response = await fetch('/dashboardData')
    let data = await response.json();
    if(!response.ok){

        window.location.href = '/'
        return;
    }
   
        window.location.replace(data.redirect);
        // can't use window.location.href = data.redirect 
        // because in that case if the user logs in and enter the dashboard page and when dashboard send an api request to server to fetch the exact role based dashboard if the api falls then user will able to stay on dashboard page (small bug) so better use location.replace that will completly replace dashboard with the actual role based dashboard so if its fails then user's back button will lead to login page not the dashboard page
        
    } catch (error) {
        console.log(error)
        window.location.href = '/';

    }
}
getUserDashboard();

 