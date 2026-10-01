const logoutBtn = document.querySelector("#logoutBtn")
logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    let response = await fetch('/adminDashboardLogout' , {
        method : "POST"
    } )
    window.location.href = '/';
})