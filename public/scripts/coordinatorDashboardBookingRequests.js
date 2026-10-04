const sectionContent = document.querySelector("#sectionContent");

//show booking request section
export const showBookingRequests = async () => {

    try {

        const response = await fetch("/fetchMyBookingRequests");

        const data = await response.json();

        if (!response.ok) {

            console.log(data.message);
            return;

        }

        console.log(data);

        createBookingRequestCards(data);

    } catch (error) {

        console.log("Failed to fetch booking requests:", error);

    }

};

const createBookingRequestCards = (requests) => {

    sectionContent.innerHTML = "";

    if (requests.length === 0) {

        sectionContent.innerHTML = `
            <div class="text-center p-10">
                <h2 class="text-2xl font-bold">
                    No pending booking requests
                </h2>

                <p class="mt-2">
                    You don't have any booking requests waiting for approval.
                </p>
            </div>
        `;

        return;
    }


    requests.forEach((request) => {

        const requestCard = document.createElement("div");

        requestCard.className =
            "bg-light-white text-apple-black rounded-xl p-5 mb-5";


        requestCard.innerHTML = `

            <div class="flex justify-between items-center border-b gap-2 pb-2">

                <h2 class="text-2xl font-bold">
                    Booking Request
                </h2>

                <span class="px-3 py-1 rounded-xl border
                    border-yellow-500 text-yellow-600">

                    Pending

                </span>

            </div>


            <div class="mt-4 space-y-2">

                <p>
                    <strong>Building:</strong>
                    ${request.building?.buildingName || "N/A"}
                </p>

                <p>
                    <strong>Room:</strong>
                    ${request.room?.roomName || "N/A"}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${request.date}
                </p>

                <p>
                    <strong>Time:</strong>
                    ${request.startTime} - ${request.endTime}
                </p>

                <p>
                    <strong>Status:</strong>
                    Waiting for admin response
                </p>

            </div>

        `;

        sectionContent.appendChild(requestCard);

    });

};