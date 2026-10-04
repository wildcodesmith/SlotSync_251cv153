const sectionContent = document.querySelector("#sectionContent")
const accountNav = document.querySelector("#accountNav")

const dashboard = document.querySelector("#dashboard")
const facilites = document.querySelector("#facilites")




import { showAccount } from "./studentAccountSection.js"


import { showFacilites } from "./coordinatorDashboardFacilities.js"

import { showDashboard } from "./studentDashboardSection.js"

//facilites
facilites.addEventListener("click", ()=>{
    showFacilites();
})


//account
accountNav.addEventListener("click",showAccount)


 
//dashboard section
dashboard.addEventListener("click",()=>{
    showDashboard();
})
 
//initial landing page
dashboard.click();

