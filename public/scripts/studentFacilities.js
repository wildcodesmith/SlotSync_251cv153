

const sectionContent = document.querySelector("#sectionContent");
const facilites = document.querySelector("#facilites");

//Facilites nav bar
export const showFacilites = async () => {


    //clear the section content
    sectionContent.innerHTML = "";
    //create facitlity section and append it in sectionContent
    createFacilitiesSection()

    // fetch data from database
    let response = await fetch('/fetchBuildingInfo')
    let data = await response.json();



    const buildings = data;
    buildings.forEach(building => {
        createFacilityCard(building)

    });


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
                    <option value="academic">Academic</option>
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

             </div>

              `
    facilityCards.append(facilityCard)



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

       
        
    `;
    //append the room inside the room container
    roomsContainer.append(roomCard);

}

