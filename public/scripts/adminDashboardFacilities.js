const sectionContent = document.querySelector("#sectionContent");
const facilites = document.querySelector("#facilites");


//Facilites nav bar
facilites.addEventListener("click", async () => {


    //clear the section content
    sectionContent.innerHTML = "";
    //create facitlity section and append it in sectionContent
    createFacilitiesSection()

    //fetch data from database
    let response = await fetch('/fetchBuildingInfo')
    let data = await response.json();

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


})


//function to dynamically create facilities section
export const createFacilitiesSection = () => {

    //facility section
    const FacilitySection = document.createElement("section");
    FacilitySection.classList.add("bg-light-yellow", "my-25", "w-full", "lg:w-7/10", "gap-5", "m-auto", "text-apple-black")

    FacilitySection.innerHTML = `
   
    
        
        

        <!-- nav filter bar inside the card  -->
        <div action=""
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
                       
            <!-- filter button -->
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
                <button class="bg-light-yellow border  border-apple-black/20 px-3 py-1 font-medium rounded-xl hover:bg-apple-black hover:cursor-pointer hover:text-light-white ">view rooms &rarr; </button>
                <button data-building-id="${building.buildingId}"
                class="deleteFacilityBtn hover:cursor-pointer border mt-5 border-red-500/40 text-red-600 px-3 py-1 rounded-xl hover:bg-red-500 hover:text-white">
        Delete
    </button>
             </div>

              `
    facilityCards.append(facilityCard)


    const deleteFacilityBtn = facilityCard.querySelector(".deleteFacilityBtn");

    deleteFacilityBtn.addEventListener("click", showDeleteConfirmation);
}

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

    closeFormBtn.addEventListener("click", () => {
        closeFacilityForm();
    })

    addFacilityForm.addEventListener("submit", postNewFacility)


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
