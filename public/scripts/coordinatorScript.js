const sectionContent = document.querySelector("#sectionContent")
const accountNav = document.querySelector("#accountNav")
const notificationNav = document.querySelector("#notificationNav")
const dashboard = document.querySelector("#dashboard")
const facilites = document.querySelector("#facilites")
const myBookings = document.querySelector("#myBookings")
const bookingRequests = document.querySelector("#bookingRequests")


import { showAccount } from "./coordinatorAccountSection.js"


accountNav.addEventListener("click",showAccount)


 

