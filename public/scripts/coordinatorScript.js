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
import { showFacilites } from "./coordinatorDashboardFacilities.js"
import { showBookingRequests } from "./coordinatorDashboardBookingRequests.js"
import { showDashboard } from "./coordinatorDashboardSection.js"

//facilites
facilites.addEventListener("click", ()=>{
    showFacilites();
})


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

//booking requests :> contains all pending booking requests the user has made
// logic is :> fetch all the pending booking from the pendingNotifications that belong the user
bookingRequests.addEventListener("click",()=>{
    showBookingRequests()
})

//dashboard section
dashboard.addEventListener("click",()=>{
    showDashboard();
})
 
//initial landing page
dashboard.click();

