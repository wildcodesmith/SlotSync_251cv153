
const sectionContent = document.querySelector("#sectionContent")
const accountNav = document.querySelector("#accountNav")
const notificationNav = document.querySelector("#notificationNav")
const dashboard = document.querySelector("#dashboard")
const facilites = document.querySelector("#facilites")
const allBookings = document.querySelector("#allBookings")
const users = document.querySelector("#users")

import { createFacilitiesSection, createFacilityCard, showDeleteConfirmation ,deleteFacilityFunc , showFacilityForm , closeFacilityForm, postNewFacility } from "./adminDashboardFacilities.js"

//function to dynamically create account card
const createAccountCard = (name, email, role, department) => {

    sectionContent.innerHTML = `
    
    <div
            class="w-fit min-w-xs text-apple-black font-medium tracking-wide bg-light-yellow rounded-xl  p-5 text-center flex flex-col justify-center items-center gap-5 ">
            <h1 class="text-3xl pb-2 font-bold border-b w-full border-apple-black">Account</h1>

            <div class="flex  w-full justify-around  gap-5">
                <div class="w-full text-start">Name</div>
                <div class="w-full text-start">${name}</div>
            </div>

            <div class="flex  w-full justify-around  gap-5">
                <div class="w-full text-start">Email </div>
                <div class="w-full text-start">${email}</div>
            </div>
            <div class="flex  w-full justify-around  gap-5">
                <div class="w-full text-start">Role</div>
                <div class="w-full text-start">${role}</div>
            </div>
            <div class="flex  w-full justify-around   pb-5  gap-5">
                <div class="w-full text-start">Department</div>
                <div class="w-full text-start">${department}</div>
            </div>
            <button id="logoutBtn"
                class="w-full bg-apple-black text-xl text-light-white px-3 py-1 rounded-2xl hover:cursor-pointer hover:bg-apple-black/80">Log
                out</button>


        </div>

    `


    //logout btn logic
    const logoutBtn = document.querySelector("#logoutBtn")
    logoutBtn.addEventListener("click", async (e) => {
        e.preventDefault()
        let response = await fetch('/adminDashboardLogout', {
            method: "POST"
        })
        window.location.href = '/';
    })
}

//function to dynamically create notification card
const createNotificationCard = () => {

    sectionContent.innerHTML = `
    
    <div class="w-xs text-apple-black font-medium tracking-wide bg-light-yellow rounded-xl  p-5 text-center flex flex-col justify-center items-center gap-5 ">
            <h1 class="text-3xl pb-2 font-bold border-b w-full border-apple-black">Notifications</h1>

    `


}


//function to dynamically create dashboard card
const createDashboardCard = () => {

    sectionContent.innerHTML = `
   
    
        <div class="w-xs h-xs   p-5 text-center text-black  bg-light-yellow rounded-xl">
            <div>Total Facilites</div>
            <div>12</div>
         
    
        </div>
        <div class="w-xs text-black bg-light-yellow rounded-xl   p-5 text-center">
            <div>Total Users</div>
            <div>143</div>
 
        </div>
    
        <div class="w-xs text-black  bg-light-yellow rounded-xl    p-5 text-center">
            <div>Today's Bookings</div>
            <div>5</div>
 
        </div>
        <div class="w-xs text-black   bg-light-yellow rounded-xl    p-5 text-center">
            <div>Pending Requests</div>
            <div>3</div>
 
        </div>

    `

}


//function to dynamically create users card
const createUsersCard = () => {

    sectionContent.innerHTML = `
   
    
         <div class="w-xs text-apple-black font-medium tracking-wide bg-light-yellow rounded-xl  p-5 text-center flex flex-col justify-center items-center gap-5 ">
            <h1 class="text-3xl pb-2 font-bold border-b w-full border-apple-black">Users</h1>
        </div>

    `

}
//function to dynamically create allBooking card
const createAllBookingsCard = () => {

    sectionContent.innerHTML = `
   
    
         <div class="w-xs text-apple-black font-medium tracking-wide bg-light-yellow rounded-xl  p-5 text-center flex flex-col justify-center items-center gap-5 ">
            <h1 class="text-3xl pb-2 font-bold border-b w-full border-apple-black">All Bookings</h1>
        </div>

    `

}



//account nav bar
accountNav.addEventListener("click", async () => {

    //fetch data from database
    let response = await fetch('/fetchAdminAccountInfo')
    let data = await response.json()
    if (response.ok) {

        // console.log(data)
        createAccountCard(data.userName, data.userEmail, data.userRole, data.userBranch)
    } else {

        console.log(data)
    }

})

//notification nav bar
notificationNav.addEventListener("click", () => {

    createNotificationCard()
})
//dashboard nav bar
dashboard.addEventListener("click", async () => {

    //fetch data from database
    let response = await fetch('/fetchAdminDashboardInfo')
    let data = await response.json()
    if (response.ok) {

        console.log(data)
        createDashboardCard()
    } else {

        console.log(data)
    }


})

//users nav bar
users.addEventListener("click", () => {

    createUsersCard()

})

//allBookings nav bar
allBookings.addEventListener("click", () => {

    createAllBookingsCard()

})



//by default 
createDashboardCard()

