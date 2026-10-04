const sectionContent = document.querySelector("#sectionContent");
const facilites = document.querySelector("#facilites");


//Facilites nav bar
export const showFacilites = async () => {


    //clear the section content
    sectionContent.innerHTML = "";
    //create facitlity section and append it in sectionContent
    createFacilitiesSection()

    //fetch data from database
    let response = await fetch('/fetchBuildingInfo')
    let data = await response.json();

    //if no data is present
    if (data.length === 0) {
        sectionContent.innerHTML = `
        <div class="flex flex-col items-center justify-center text-center py-20">

            <h2 class="text-2xl font-bold">
                No Facilities
            </h2>

            <p class="mt-2 text-light-white/60">
                No facilities are there
            </p>

        </div>
    `;
    }

    const buildings = data;
    buildings.forEach(building => {
        createFacilityCard(building)

    });

    //add facilites btn code
    const addFacilitesBtn = document.querySelector("#addFacilitesBtn")
    addFacilitesBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showFacilityForm()
    })


}


//function to dynamically create facilities section
export const createFacilitiesSection = () => {

    //facility section
    const FacilitySection = document.createElement("section");
    FacilitySection.classList.add("bg-light-yellow", "my-25", "w-full", "lg:w-7/10", "gap-5", "m-auto", "text-apple-black")

    FacilitySection.innerHTML = `
   
    
        
        

        <!-- nav filter bar inside facilites section  -->
        <div
            class="bg-light-green flex flex-row flex-1 flex-wrap  justify-between items-center text-apple-black font-semibold text-lg tracking-wide p-2">
            <!-- type of facility -->
            <form class="flex gap-5 items-center justify-between p-2">
                <label for="facilityType">Type : </label>
                <select name="facilityType" id="facilityType" required
                    class="border border-apple-black/40 p-2 bg-light-white rounded-xl">
                    <option value="all" selected >All</option>
                    <option value="auditorium">Auditorium</option>
                    <option value="lhc">LHC</option>
                    <option value="administrative">Administrative</option>
                    <option value="department">Department</option>
                    <option value="library">Library</option>
                    <option value="lab">Lab</option>
                </select>
            </form>

            <!-- capacity of facility --> 
            <!-- this *capacity will come in rooms --> 
           <!--  <div class="flex gap-5 items-center justify-between p-2">
                <label for="capacity">Capacity : </label>
                <input type="number" name="capacity" min="1" required
                    class="border border-apple-black/40 p-2 bg-light-white rounded-xl w-20">
            </div> --> 
            <h2 class="text-center text-2xl font-bold tracking-wider"> Facilites </h2>
                       
            <!-- add facility button -->
            <button   id="addFacilitesBtn"
                class="bg-apple-black text-white font-bold px-4 py-2 rounded-xl tracking-wider hover:bg-apple-black/90 hover:cursor-pointer"> + Add Facilites </button>

        </div>

    `

    sectionContent.appendChild(FacilitySection)

    //individual facility card
    const facilityCards = document.createElement('article');
    facilityCards.classList.add("flex", "justify-center", "items-center", "flex-1", "flex-wrap", "gap-8", "p-5", "tracking-wide")
    facilityCards.setAttribute("id", 'facilityCards');

    FacilitySection.appendChild(facilityCards)

    //filter building logic 
    const facilityType = document.querySelector("#facilityType") //<select> tag in filter buildings nav section
    facilityType.addEventListener('change', async () => {

        let options = {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                facilityType: facilityType.value
            })
        }
        let response = await fetch("filterAdminBuildings", options)
        let data = await response.json();

        if (response.ok) {
            const facilityCards = document.querySelector("#facilityCards")
            facilityCards.innerHTML = "";
            let filteredBuildings = data;
            filteredBuildings.forEach(filteredBuilding => {
                createFacilityCard(filteredBuilding)
            })


        } else {
            console.log(data)
        }

    })

}

//function to dynamically create facilities card that will contain building name, type etc.
export const createFacilityCard = (building) => {
    const facilityCards = document.querySelector("#facilityCards")

    const facilityCard = document.createElement('article');
    facilityCard.innerHTML = `
 
             <div class=" bg-light-white border border-apple-black/10  w-fit p-4 flex flex-col justify-center items-center gap-2 rounded-xl">
                <h3 class="text-2xl font-bold w-full border-apple-black/40 border-b text-center"> ${building.buildingName.charAt(0).toUpperCase() + building.buildingName.slice(1)} </h3>
                <p>Total rooms : ${building.totalRooms}</p>
                  <p>Type : ${building.buildingType.charAt(0).toUpperCase() + building.buildingType.slice(1)}</p>
                <button data-building-id="${building.buildingId}" class="viewRoomsBtn bg-light-yellow border  border-apple-black/20 px-3 py-1 font-medium rounded-xl hover:bg-apple-black hover:cursor-pointer hover:text-light-white ">view rooms &rarr; </button>
                <button data-building-id="${building.buildingId}"
                class="deleteFacilityBtn hover:cursor-pointer border mt-5 border-red-500/40 text-red-600 px-3 py-1 rounded-xl hover:bg-red-500 hover:text-white">
        Delete
    </button>
             </div>

              `
    facilityCards.append(facilityCard)


    const deleteFacilityBtn = facilityCard.querySelector(".deleteFacilityBtn");

    deleteFacilityBtn.addEventListener("click", showDeleteConfirmation);


    const viewRoomsBtn = facilityCard.querySelector(".viewRoomsBtn")
    const buildingId = viewRoomsBtn.dataset.buildingId;

    viewRoomsBtn.addEventListener('click', () => {
        getfacilityRooms(buildingId, building.buildingName)

    })
}

let currentBuildingId = null;

//view rooms post request to get all the rooms inside that facility/building
const getfacilityRooms = async (buildingId, buildingName) => {

    // remembers the current building
    currentBuildingId = buildingId;

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ buildingId: buildingId })
    }

    let response = await fetch('/getBuildingRooms', options);
    let data = await response.json();

    console.log(data)

    // show all rooms in the building => rooms container + nav bar => complete room page
    ShowRoomsSection(buildingId, buildingName);


    //add rooms container => container to contain rooms 
    addRoomsContainer()

    //create  room to add to the rooms container => individual rooms
    let rooms = data
    rooms.forEach((room) => {

        createRoomCard(room);
    })

}

//show rooms in the building
const ShowRoomsSection = (buildingId, buildingName) => {

    sectionContent.innerHTML = "";

    let roomPage = document.createElement("div") // complete room page => rooms rooms nav bar
    roomPage.setAttribute("id", "roomPage")

    roomPage.classList.add("bg-light-yellow", "my-25", "w-full", "lg:w-7/10", "gap-5", "m-auto", "text-apple-black", "rounded-2xl",)
    roomPage.innerHTML = `

        
         <!-- nav filter bar inside the rooms section  => nav bar -->
         <div class="w-full flex items-center rounded-t-2xl bg-black/93  p-5">
            <button id="backBtnToFacilities" class="   w-fit   hover:cursor-pointer hover:bg-light-yellow hover:text-apple-black border   rounded-full border-light-white/30 text-light-yellow text-left  text-3xl p-3   ">    &larr;  </button>
        
            <h2 class="text-center text-2xl w-full font-bold text-light-yellow tracking-wider   ">
                ${buildingName}</h2> 
         </div>
        

        <form
           class="bg-light-green flex flex-row flex-wrap justify-center 
    items-center gap-2 text-apple-black font-semibold text-lg tracking-wide p-2">
            <!-- type of facility -->
            <div class="flex gap-5 items-center justify-between p-2">
                <label for="roomType">Type : </label>
                <select name="roomType" id="roomType" required
                    class="border border-apple-black/40 p-2 bg-light-white rounded-xl">
                    <option value="all">All</option>
                    <option value="classroom">Classroom</option>
                    <option value="lecture">Lecture Hall</option>
                    <option value="lab">Lab</option>
                    <option value="seminar">Seminar Hall</option>
                    <option value="auditorium">Auditorium</option>
                </select>
            </div>

            <div class="flex gap-5 items-center justify-between p-2">
                <label for="roomStatus">Status : </label>
                <select name="roomStatus" id="roomStatus" required
                    class="border border-apple-black/40 p-2 bg-light-white rounded-xl">
                    <option value="all">All</option>
                    <option value="available">Available</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="unavailable">Unavailable</option>
                </select>
            </div>

            <!-- capacity of rooms filter -->
            <div class="flex gap-5 items-center justify-between p-2">
                <label for="capacity">Capacity : </label>
                <input type="number" name="capacity" min="1" placeholder="Min capacity" required id="capacity"

                    class="border border-apple-black/40 px-2  py-2 bg-light-white rounded-xl w-37">
            </div>

            <!-- add room button -->
            <button id="addRoom"
               class="bg-apple-black text-white font-bold px-3 py-2 rounded-xl
    tracking-wider hover:bg-apple-black/90 hover:cursor-pointer whitespace-nowrap">
                + Add Room </button>
        </form>
   

    `


    // add this room page inside the section content
    sectionContent.append(roomPage)

    //back buttton logic to go back to see buildings
    const backBtnToFacilities = document.querySelector("#backBtnToFacilities");
    backBtnToFacilities.addEventListener("click", () => {
        //firing the click event on facilites
        facilites.click();
    })

    //adding new room
    const addRoomBtn = roomPage.querySelector("#addRoom");
    addRoomBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showAddRoomForm(buildingId);


    });

    // FILTER ELEMENTS

    const roomType = document.querySelector("#roomType");

    const roomStatus = document.querySelector("#roomStatus");

    const capacity = document.querySelector("#capacity");


    // FILTER EVENTS

    roomType.addEventListener("input", filterRooms);
    roomStatus.addEventListener("input", filterRooms);
    capacity.addEventListener("input", filterRooms);



}

//filter functions
const filterRooms = async () => {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            buildingId: currentBuildingId,
            roomType: roomType.value,
            status: roomStatus.value,
            capacity: capacity.value
        })
    };

    const response = await fetch("/filterAdminRooms", options);

    const data = await response.json();

    if (response.ok) {

        const roomsContainer = document.querySelector("#roomsContainer");

        roomsContainer.innerHTML = "";

        data.forEach(room => {
            createRoomCard(room);
        });

    } else {
        console.log(data);
    }
};


//form to add new room in a building
const showAddRoomForm = (buildingId) => {

    const wrapper = document.createElement("div");

    wrapper.classList.add("fixed", "inset-0", "flex", "items-center", "justify-center", "bg-apple-black/50", "z-50"
    );

    wrapper.id = "addRoomFormWrapper";

    wrapper.innerHTML = `

        <form id="addRoomForm"
            class="bg-apple-black/90 rounded-2xl p-5 flex flex-col border border-light-white/45">

            <!-- close -->
            <div class="w-full flex justify-end">
                <button
                    type="button"
                    id="closeAddRoomFormBtn"
                    class="text-xl font-bold hover:cursor-pointer">
                    &times;
                </button>
            </div>

            <!-- Room name -->
            <div class="flex flex-row items-center justify-start p-3 gap-5">
                <label for="newRoomName">Room Name :</label>

                <input
                    type="text"
                    id="newRoomName"
                    placeholder="e.g. CR-1"
                    required
                    class="px-3 py-2 border border-light-white/50 rounded-2xl">
            </div>

            <!-- Capacity -->
            <div class="flex flex-row items-center justify-start p-3 gap-5">
                <label for="newRoomCapacity">Capacity :</label>

                <input
                    type="number"
                    id="newRoomCapacity"
                    min="1"
                    placeholder="e.g. 40"
                    required
                    class="px-3 py-2 border border-light-white/50 rounded-2xl">
            </div>

            <!-- Room type -->
            <div class="flex flex-row items-center justify-start p-3 gap-5">

                <label for="newRoomType">Room Type :</label>

                <select
                    id="newRoomType"
                    required
                    class="border border-light-white/50 rounded-2xl px-3 py-2">

                    <option value="">Select type</option>
                    <option value="classroom">Classroom</option>
                    <option value="lecture">Lecture Hall</option>
                    <option value="lab">Lab</option>
                    <option value="seminar_hall">Seminar Hall</option>
                    <option value="auditorium">Auditorium</option>

                </select>

            </div>

            <!-- Status -->
            <div class="flex flex-row items-center justify-start p-3 gap-5">

                <label for="newRoomStatus">Status :</label>

                <select
                    id="newRoomStatus"
                    required
                    class="border border-light-white/50 rounded-2xl px-3 py-2">

                    <option value="available">Available</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="unavailable">Unavailable</option>

                </select>

            </div>

            <!-- Opening time -->
            <div class="flex flex-row items-center justify-start p-3 gap-5">

                <label for="newStartTime">Opening Time :</label>

                <input
                    type="time"
                    id="newStartTime"
                    required
                    class="px-3 py-2 border border-light-white/50 rounded-2xl">

            </div>

            <!-- Closing time -->
            <div class="flex flex-row items-center justify-start p-3 gap-5">

                <label for="newEndTime">Closing Time :</label>

                <input
                    type="time"
                    id="newEndTime"
                    required
                    class="px-3 py-2 border border-light-white/50 rounded-2xl">

            </div>

            <button
                type="submit"
                class="border border-light-white/50 px-3 py-2 rounded-2xl
                hover:bg-light-white hover:cursor-pointer hover:text-black">

                Add Room

            </button>

        </form>
    `;

    document.body.append(wrapper);

    // close
    wrapper.querySelector("#closeAddRoomFormBtn")
        .addEventListener("click", () => {
            wrapper.remove();
        });

    // submit
    wrapper.querySelector("#addRoomForm")
        .addEventListener("submit", (e) => {
            postNewRoom(e, buildingId, wrapper);
        });
};

//function to post new room
const postNewRoom = async (e, buildingId, wrapper) => {

    e.preventDefault();

    const newRoom = {

        building: buildingId,

        roomName: wrapper.querySelector("#newRoomName").value,

        capacity: Number(
            wrapper.querySelector("#newRoomCapacity").value
        ),

        roomType:
            wrapper.querySelector("#newRoomType").value,

        status:
            wrapper.querySelector("#newRoomStatus").value,

        operatingHours: {

            start:
                wrapper.querySelector("#newStartTime").value,

            end:
                wrapper.querySelector("#newEndTime").value
        }
    };

    const options = {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(newRoom)
    };

    const response = await fetch("/addRoom", options);

    const data = await response.json();

    if (response.ok) {

        console.log("Room added:", data);

        wrapper.remove();

        // refresh rooms
        getfacilityRooms(buildingId);

    } else {

        console.log("Failed to add room:", data);

    }
};

const addRoomsContainer = () => {


    const roomPage = document.querySelector("#roomPage")
    //create rooms container
    const roomsContainer = document.createElement("article");
    roomsContainer.classList.add("flex", "justify-center", "items-center", "flex-1", "flex-wrap", "gap-8", "p-5", "tracking-wide",)
    roomsContainer.setAttribute("id", "roomsContainer")


    // append rooms container in roomPage
    roomPage.append(roomsContainer)

}

//create Room  
const createRoomCard = (room) => {
    const roomsContainer = document.querySelector("#roomsContainer")
    const roomCard = document.createElement("div")
    roomCard.classList.add("bg-light-white", "border", "border-apple-black/10", "w-fit", "p-4", "flex", "flex-col", "justify-center", "items-center", "gap-2", "rounded-xl",)


    roomCard.innerHTML = `
        <h3 class="text-2xl font-bold w-full border-apple-black/40 border-b text-center">
            ${room.roomName}
        </h3>

        <p>Capacity : ${room.capacity}</p>

        <p>Type : ${room.roomType}</p>

        <p>Status : ${room.status}</p>

        <P>Opening Time : ${room.operatingHours.start} </p>
        <P>Closing Time : ${room.operatingHours.end} </p>

        <button
            data-room-id="${room._id}"
            class="editRoomBtn bg-light-yellow border border-apple-black/20 px-3 py-1 font-medium rounded-xl hover:bg-apple-black hover:cursor-pointer hover:text-light-white">
            Edit Room &rarr;
        </button>

        <button
            data-room-id="${room._id}"
            class="deleteRoomBtn hover:cursor-pointer border mt-5 border-red-500/40 text-red-600 px-3 py-1 rounded-xl hover:bg-red-500 hover:text-white">
            Delete
        </button>
    `;
    //append the room inside the room container
    roomsContainer.append(roomCard);

    //deleting the room
    const deleteRoomBtn = roomCard.querySelector(".deleteRoomBtn");
    deleteRoomBtn.addEventListener("click", (e) => {
        showDeleteRoomConfirmation(e);
    });

    //edit Room logic
    const editRoomBtn = roomCard.querySelector(".editRoomBtn");
    editRoomBtn.addEventListener("click", (e) => {
        showEditRoomForm(e, room)
    })
}
//confirmation popup
export const showDeleteRoomConfirmation = (e) => {

    const roomId = e.currentTarget.dataset.roomId;

    const deleteConfirmationCard = document.createElement("div");

    deleteConfirmationCard.classList.add(
        "fixed",
        "inset-0",
        "flex",
        "items-center",
        "justify-center",
        "bg-apple-black/50",
        "z-50"
    );

    deleteConfirmationCard.setAttribute("id", "showDeleteRoomConfirmWrapper");

    deleteConfirmationCard.innerHTML = `
    
        <div class="bg-apple-black/90 rounded-2xl p-5 flex flex-col 
                    border border-light-white/45 gap-10">

            <div class="text-xl font-semibold text-light-white 
                        w-full text-center">

                Confirm delete.<br>
                This room will be permanently deleted.

            </div>

            <div class="flex justify-center items-center gap-5 w-full">

                <button
                    id="cancelDeleteRoomBtn"
                    class="flex-1 border border-light-white/50 px-3 py-2 
                           rounded-2xl hover:bg-light-white 
                           hover:cursor-pointer hover:text-black">

                    Cancel

                </button>

                <button
                    id="confirmDeleteRoomBtn"
                    class="flex-1 border border-red-500/50 text-red-500 
                           px-3 py-2 rounded-2xl hover:bg-red-500 
                           hover:text-white hover:cursor-pointer">

                    Delete

                </button>

            </div>

        </div>
    `;

    document.body.append(deleteConfirmationCard);


    // Cancel
    const cancelDeleteRoomBtn =
        deleteConfirmationCard.querySelector("#cancelDeleteRoomBtn");

    cancelDeleteRoomBtn.addEventListener("click", () => {
        deleteConfirmationCard.remove();
    });


    // Confirm
    const confirmDeleteRoomBtn =
        deleteConfirmationCard.querySelector("#confirmDeleteRoomBtn");

    confirmDeleteRoomBtn.addEventListener("click", async () => {

        await deleteRoomFunc(roomId, deleteConfirmationCard);

    });

};

//delete room function 
export const deleteRoomFunc = async (roomId, deleteConfirmationCard) => {
    console.log("On the ")
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ roomId: roomId })
    };
    const response = await fetch('/deleteRoom', options);

    const data = await response.json();


    if (response.ok) {

        console.log("Room deleted successfully", data);

        // remove confirmation popup
        deleteConfirmationCard.remove();

        // refresh rooms section
        getfacilityRooms(data.room.building)

    } else {

        console.log("Failed to delete room", data);

    }

};

//form to edit room info
export const showEditRoomForm = (e, room) => {
    e.preventDefault();

    const roomId = room._id;

    let roomEditCardContainer = document.createElement("div")
    roomEditCardContainer.classList.add("fixed", "inset-0", "flex", "items-center", "justify-center", "bg-apple-black/50", "z-50")
    roomEditCardContainer.setAttribute("id", "editRoomFormWrapper")
    roomEditCardContainer.innerHTML = `
    
        <!-- edit room code -->
    <!-- form to edit room -->
    <form id="editRoomForm"
        class=" bg-apple-black/90 rounded-2xl p-5 flex flex-col border border-light-white/45 ">

                <!-- close form -->
        
        <div class="w-full flex justify-end">
            <button type="button" id="closeEditFormBtn" class="text-xl font-bold text-right hover:cursor-pointer">
                &times;
            </button>
        </div>

            <!-- Room name -->

        <div class="flex flex-row items-center justify-start p-3 gap-5">
            <label for="editRoomName">Room Name : </label>

            <input
                type="text"
                id="editRoomName"
                name="editRoomName"
                placeholder="e.g. CR-1"
                required
                class="px-3 py-2 border border-light-white/50 rounded-2xl">
        </div>


        <!-- Room capacity -->

        <div class="flex flex-row items-center justify-start p-3 gap-5">
            <label for="editRoomCapacity">Capacity : </label>

            <input
                type="number"
                id="editRoomCapacity"
                name="editRoomCapacity"
                min="1"
                placeholder="e.g. 40"
                required
                class="px-3 py-2 border border-light-white/50 rounded-2xl">
        </div>


        <!-- Room type -->

        <div class="flex flex-row items-center justify-start p-3 gap-5">
            <label for="editRoomType">Room Type : </label>

            <select
                id="editRoomType"
                name="editRoomType"
                required
                class="border border-light-white/50 rounded-2xl px-3 py-2">

                <option value="">Select type</option>
                <option value="classroom">Classroom</option>
                <option value="lecture">Lecture Hall</option>
                <option value="lab">Lab</option>
                <option value="seminar_hall">Seminar Hall</option>
                <option value="auditorium">Auditorium</option>

            </select>
        </div>


        <!-- Room status -->

        <div class="flex flex-row items-center justify-start p-3 gap-5">
            <label for="editRoomStatus">Status : </label>

            <select
                id="editRoomStatus"
                name="editRoomStatus"
                required
                class="border border-light-white/50 rounded-2xl px-3 py-2">

                <option value="">Select status</option>
                <option value="available">Available</option>
                <option value="maintenance">Maintenance</option>
                <option value="unavailable">Unavailable</option>

            </select>
        </div>

        <!-- Operating hours -->

        <div class="flex flex-row items-center justify-start p-3 gap-5">

            <label for="editStartTime">
                Opening Time :
            </label>

            <input
                type="time"
                id="editStartTime"
                name="editStartTime"
                required
                class="px-3 py-2 border border-light-white/50 rounded-2xl">

        </div>


        <div class="flex flex-row items-center justify-start p-3 gap-5">

            <label for="editEndTime">
                Closing Time :
            </label>

            <input
                type="time"
                id="editEndTime"
                name="editEndTime"
                required
                class="px-3 py-2 border border-light-white/50 rounded-2xl">

        </div>


        <!-- Edit button -->

        <button
            type="submit"
            class="border border-light-white/50 px-3 py-2 rounded-2xl
                hover:bg-light-white hover:cursor-pointer hover:text-black">

            Save Changes

        </button>

    </form>


 
    `
    //showing the current  existing info about room
    roomEditCardContainer.querySelector("#editRoomName").value = room.roomName;
    roomEditCardContainer.querySelector("#editRoomType").value = room.roomType;
    roomEditCardContainer.querySelector("#editRoomStatus").value = room.status;
    roomEditCardContainer.querySelector("#editRoomCapacity").value = room.capacity;
    roomEditCardContainer.querySelector("#editStartTime").value = room.operatingHours.start;
    roomEditCardContainer.querySelector("#editEndTime").value = room.operatingHours.end;


    document.body.append(roomEditCardContainer);

    //close the room edit form  :  logic
    roomEditCardContainer.querySelector("#closeEditFormBtn").addEventListener("click", () => {
        closeRoomEditForm();
    })

    // send the edit form request to server 
    roomEditCardContainer.querySelector("#editRoomForm").addEventListener("submit", (e) => {
        updateRoom(e, room, roomEditCardContainer)
    })


}

//close form to edit room
const closeRoomEditForm = () => {
    const editRoomFormWrapper = document.querySelector("#editRoomFormWrapper");
    editRoomFormWrapper.remove()
}

//add facility => post facility to server , update database and ui
export const updateRoom = async (e, room, roomEditCardContainer) => {

    e.preventDefault()
    const updatedRoom = {
        roomId: room._id,
        roomName: roomEditCardContainer.querySelector("#editRoomName").value,
        capacity: Number(roomEditCardContainer.querySelector("#editRoomCapacity").value),
        roomType: roomEditCardContainer.querySelector("#editRoomType").value,
        status: roomEditCardContainer.querySelector("#editRoomStatus").value,
        operatingHours: {
            start: roomEditCardContainer.querySelector("#editStartTime").value,
            end: roomEditCardContainer.querySelector("#editEndTime").value
        }

    };

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedRoom)
    };

    const response = await fetch("/updateRoom", options);

    const data = await response.json();

    if (response.ok) {
        console.log("Room updated successfully", data);
        closeRoomEditForm()
        // refresh rooms
        getfacilityRooms(room.building);
    } else {
        console.log("Update failed", data);
    }
};

//delete request confirmation card
export const showDeleteConfirmation = (e) => {

    const buildingId = e.currentTarget.dataset.buildingId;

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
        await deleteFacilityFunc(buildingId, deleteConfirmationCard);
    })

}


//delete Facility 
export const deleteFacilityFunc = async (buildingId, deleteConfirmationCard) => {

    //delete function post request
    const deleteBuilding = {
        buildingId: buildingId
    }

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deleteBuilding)

    }
    let response = await fetch("/deleteFacility", options);
    let data = await response.json();
    if (response.ok) {
        console.log(data);

        deleteConfirmationCard.remove();

        // refresh facilities
        facilites.click();

    } else {
        console.log(data);
    }
}

//form to add facility
export const showFacilityForm = () => {
    let div = document.createElement("div")
    div.classList.add("fixed", "inset-0", "flex", "items-center", "justify-center", "bg-apple-black/50", "z-50")
    div.setAttribute("id", "addFacilityFormWrapper")
    div.innerHTML = `
    
        <!-- add facility code -->
    <!-- form to add facility -->
    <form id="addFacilityForm"
        class=" bg-apple-black/90 rounded-2xl p-5 flex flex-col border border-light-white/45 ">

                <!-- close form -->
        
        <div class="w-full flex justify-end">
            <button type="button" id="closeFormBtn" class="text-xl font-bold text-right hover:cursor-pointer">
                &times;
            </button>
        </div>

        <!-- Building name -->

        <div class="flex flex-row items-center justify-start p-3 gap-5">
            <label for="buildingName">Building Name : </label>
            <input type="text" id="newBuildingName" name="newBuildingName" placeholder="e.g. LHC-A" required
                class=" px-3 py-2 border border-light-white/50  rounded-2xl">
        </div>

        <!-- Building type -->
        <div class="flex flex-row items-center justify-start p-3 gap-5 ">
            <label for="buildingType">Building Type : </label>
            <select id="newBuildingType" name="newBuildingType" required
                class="border border-light-white/50  rounded-2xl px-3 py-2">
                <option value="">Select type</option>
                <option value="lhc">LHC</option>
                <option value="academic">Academic</option>
                <option value="administrative">Administrative</option>
                <option value="department">Department</option>
                <option value="library">Library</option>
                <option value="lab">Lab</option>
                <option value="other">Other</option>
            </select>

        </div>

        <button type="submit"
            class="border border-light-white/50 px-3 py-2 rounded-2xl hover:bg-light-white hover:cursor-pointer hover:text-black">Add
            Facility</button>

    </form>


 
    `
    document.body.append(div);

    div.querySelector("#closeFormBtn").addEventListener("click", () => {
        closeFacilityForm();
    })

    div.querySelector("#addFacilityForm").addEventListener("submit", postNewFacility)


}

//close facility form
export const closeFacilityForm = () => {
    const addFacilityFormWrapper = document.querySelector("#addFacilityFormWrapper");
    addFacilityFormWrapper.remove()
}

//add facility => post facility to server , update database and ui
export const postNewFacility = async (e) => {
    e.preventDefault();

    let newFacilityInfo = {
        buildingName: document.querySelector("#newBuildingName").value,
        buildingType: document.querySelector("#newBuildingType").value,
    }
    let options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newFacilityInfo)

    }

    let response = await fetch("/addNewBuilding", options)
    let data = await response.json();

    if (response.ok) {
        createFacilityCard(data)
    } else {
        console.log("failed to add facility")
    }
    closeFacilityForm()

}
