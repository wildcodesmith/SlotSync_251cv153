const sectionContent = document.querySelector("#sectionContent")
const accountNav = document.querySelector("#accountNav")
const notificationNav = document.querySelector("#notificationNav")
const dashboard = document.querySelector("#dashboard")
const facilites = document.querySelector("#facilites")
const myBookings = document.querySelector("#myBookings")
const bookingRequests = document.querySelector("#bookingRequests")


import { showAccount } from "./coordinatorAccountSection.js"
import { showNotifications } from "./coordinatorDashboardNotifications.js"
import { showMyBookings } from "./coordinatorDashboardMyBookings.js"

//account
accountNav.addEventListener("click",showAccount)


//notifications
notificationNav.addEventListener("click", () => {
    showNotifications()
})

//my bookings
myBookings.addEventListener("click",()=>{
    showMyBookings();
})

 

