const sectionContent = document.querySelector("#sectionContent")

export const showDashboard =async ()=>{
    sectionContent.innerHTML = ""

    
    //fetch data from database
    let response = await fetch('/fetchAdminDashboardInfo')
    let data = await response.json()
    if (!response.ok) {
        return console.log(data)
    } 

    console.log(data)

    sectionContent.innerHTML = `
       
             <!--total facilities -->
            <div class="w-xs h-xs font-bold text-xl   p-5 text-center text-black  bg-light-yellow rounded-xl">
                <div>Total Facilities</div>
                <div>${data.totalFacilities}</div>
            </div>

              <!--total users -->
            <div class="w-xs font-bold text-xl  text-black bg-light-yellow rounded-xl   p-5 text-center">
                <div>Total Users</div>
                <div>${data.totalUsers}</div>
     
            </div>
        
            <!--today's bookings -->
            <div class="w-xs font-bold text-xl  text-black  bg-light-yellow rounded-xl    p-5 text-center">
                <div>Today's Bookings</div>
                <div>${data.todaysBookings}</div>
     
            </div>

            <!--pending requests -->
            <div class="w-xs font-bold text-xl  text-black   bg-light-yellow rounded-xl    p-5 text-center">
                <div>Pending Requests</div>
                <div>${data.pendingRequests}</div>
     
            </div>
    
        `
    
}

