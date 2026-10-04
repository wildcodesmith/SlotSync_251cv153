const sectionContent = document.querySelector("#sectionContent")

//show users
export const showUsers = async () => {

    sectionContent.innerHTML = ""

    createUsersSection()

    const response = await fetch("/fetchUsers")
    const data = await response.json()

    //if no data is present
    if (data.length === 0) {
        sectionContent.innerHTML = `
        <div class="flex flex-col items-center justify-center text-center py-20">

            <h2 class="text-2xl font-bold">
                No Users 
            </h2>

            <p class="mt-2 text-light-white/60">
                No users are there
            </p>

        </div>
    `;
    }

    if (response.ok) {

        data.forEach(user => {
            createUserCard(user)
        })

    } else {
        console.log(data)
    }
}

// Create Users section
export const createUsersSection = () => {

    const UsersSection = document.createElement("section");

    UsersSection.classList.add(
        "bg-light-yellow",
        "my-25",
        "w-full",
        "lg:w-7/10",
        "gap-5",
        "m-auto",
        "text-apple-black"
    );

    //userSection nav bar filter for userRole
    UsersSection.innerHTML = `

        <div class="bg-light-green flex flex-row flex-wrap justify-between items-center font-semibold text-lg tracking-wide p-2">

            <select id="userRole"
                class="border border-apple-black/40 p-2 bg-light-white rounded-xl">

                <option value="all">All</option>
                <option value="student">Student</option>
                <option value="convenor">Convenor</option>
                <option value="faculty">Faculty</option>

            </select>

            <h2 class="text-center text-2xl font-bold tracking-wider">
                Users
            </h2>

        </div>

    `;

    sectionContent.appendChild(UsersSection);


    const usersContainer = document.createElement("article");

    usersContainer.classList.add(
        "flex",
        "justify-center",
        "items-center",
        "flex-1",
        "flex-wrap",
        "gap-8",
        "p-5",
        "tracking-wide"
    );

    usersContainer.setAttribute("id", "usersContainer");

    UsersSection.appendChild(usersContainer);


    const userRole = document.querySelector("#userRole");

    userRole.addEventListener("change", filterUsers);
}
// User card
export const createUserCard = (user) => {

    const usersContainer = document.querySelector("#usersContainer");

    const userCard = document.createElement("div");

    userCard.classList.add(
        "bg-light-white",
        "border",
        "border-apple-black/10",
        "w-fit",
        "p-4",
        "flex",
        "flex-col",
        "justify-center",
        "items-center",
        "gap-2",
        "rounded-xl"
    );

    userCard.innerHTML = `

        <h3 class="text-2xl font-bold w-full border-apple-black/40 border-b text-center">
            ${user.userName}
        </h3>

        <p>Email : ${user.userEmail}</p>

        <p>Branch : ${user.userBranch}</p>

        <p>Role : ${user.userRole}</p>

        <button
            data-user-id="${user._id}"
            class="editUserBtn bg-light-yellow border border-apple-black/20 px-3 py-1 font-medium rounded-xl hover:bg-apple-black hover:cursor-pointer hover:text-light-white">

            Edit User &rarr;

        </button>

        <button
            data-user-id="${user._id}"
            class="deleteUserBtn hover:cursor-pointer border mt-5 border-red-500/40 text-red-600 px-3 py-1 rounded-xl hover:bg-red-500 hover:text-white">

            Delete

        </button>

    `;

    usersContainer.append(userCard);

    //deletion of user 
    const deleteUserBtn = userCard.querySelector(".deleteUserBtn");
    deleteUserBtn.addEventListener("click", showDeleteConfirmation)
}

//delete request confirmation card
export const showDeleteConfirmation = (e) => {

    const userId = e.currentTarget.dataset.userId;

    let deleteConfirmationCard = document.createElement("div")
    deleteConfirmationCard.classList.add("fixed", "inset-0", "flex", "items-center", "justify-center", "bg-apple-black/50", "z-50")
    deleteConfirmationCard.setAttribute("id", "showDeleteConfirmWrapper")
    deleteConfirmationCard.innerHTML = `
    
  
    <div class="bg-apple-black/90 rounded-2xl p-5 flex flex-col border border-light-white/45 gap-10">

    <div class="text-xl font-semibold text-light-white w-full text-center">
        Confirm delete.<br>
        This will also delete the rooms associated with facility.
    </div>

    <div class="flex justify-center items-center gap-5 w-full">

        <button id="cancelDeleteConfirmationBtn"
            class="flex-1 border border-light-white/50 px-3 py-2 rounded-2xl
            hover:bg-light-white hover:cursor-pointer hover:text-black">
            Cancel
        </button>

        <button id="okDeleteConfirmationBtn"
            class="flex-1 border border-light-white/50 px-3 py-2 rounded-2xl
            hover:bg-light-white hover:cursor-pointer hover:text-black">
            OK
        </button>

    </div>

</div>

 
    `
    document.body.append(deleteConfirmationCard);

    //if canceled deletion of facility
    const cancelDeleteConfirmationBtn = deleteConfirmationCard.querySelector("#cancelDeleteConfirmationBtn");
    cancelDeleteConfirmationBtn.addEventListener("click", () => {
        deleteConfirmationCard.remove();
    })

    //if confirmed deletion of facility
    const okDeleteConfirmationBtn = deleteConfirmationCard.querySelector("#okDeleteConfirmationBtn");
    okDeleteConfirmationBtn.addEventListener("click", async () => {
        await deleteUser(userId);
        deleteConfirmationCard.remove();
    })

}

//deleting user logic
const deleteUser = async (userId) => {



    try {

        let options = {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ userId: userId })
        }
        const response = await fetch("deleteUser", options);

        const data = await response.json();

        if (response.ok) {
            console.log(data)
            // reload users section
            showUsers();

        } else {

            console.log(data)

        }

    } catch (error) {

        console.log(error);

    }

}

// Filtering users
export const filterUsers = async () => {

    const userRole = document.querySelector("#userRole");

    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userRole: userRole.value
        })
    }

    let response = await fetch("/filterUsers", options);
    let data = await response.json();

    if (response.ok) {

        const usersContainer = document.querySelector("#usersContainer");

        usersContainer.innerHTML = "";

        data.forEach(user => {
            createUserCard(user);
        })

    } else {

        console.log(data);

    }
}

