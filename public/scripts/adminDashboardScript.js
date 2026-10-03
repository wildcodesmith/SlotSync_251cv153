
const sectionContent = document.querySelector("#sectionContent")
const accountNav = document.querySelector("#accountNav")
const notificationNav = document.querySelector("#notificationNav")
const dashboard = document.querySelector("#dashboard")
const facilites = document.querySelector("#facilites")
const allBookings = document.querySelector("#allBookings")
const users = document.querySelector("#users")

import { showFacilites } from "./adminDashboardFacilities.js"
import { showUsers } from "./adminDashboardUsers.js"
import { showNotifications } from "./adminDashboardNotifications.js"
import { showBookings } from "./adminDashboardBookings.js";
import { showDashboard } from "./adminDashboardSection.js"

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


//dashboard section
dashboard.addEventListener('click', showDashboard)

//making dashboard page as landing page so when admin sign in admin lands on dashboard
dashboard.click();



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

    showNotifications()
})
//dashboard nav bar
// dashboard.addEventListener("click", async () => {

//     //fetch data from database
//     let response = await fetch('/fetchAdminDashboardInfo')
//     let data = await response.json()
//     if (response.ok) {

//         console.log(data)
//         createDashboardCard()
//     } else {

//         console.log(data)
//     }


// })

//users section
users.addEventListener("click", () => {
    showUsers()
})

//facilities section
facilites.addEventListener("click", ()=>{
    showFacilites();
})



//bookings section
allBookings.addEventListener("click", showBookings)


