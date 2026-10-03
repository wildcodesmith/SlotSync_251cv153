export const showAccount = async () =>{

    // fetch data from database
    let response = await fetch('/fetchCoordinatorAccountInfo')
    let data = await response.json()
    if (response.ok) {

        console.log(data)
        createAccountCard(data.userName, data.userEmail, data.userRole, data.userBranch)

    } else {

        console.log(data)
    }
        // createAccountCard("a","d" ,"e",'d')

}


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


    // logout btn logic
    const logoutBtn = document.querySelector("#logoutBtn")
    logoutBtn.addEventListener("click", async (e) => {
        e.preventDefault()
        let response = await fetch('/coordinatorPageLogout', {
            method: "POST"
        })
        window.location.href = '/';
    })
}