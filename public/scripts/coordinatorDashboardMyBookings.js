const sectionContent = document.querySelector("#sectionContent");


// Show all Bookings made by coordinator
export const showMyBookings = async () => {

    sectionContent.innerHTML = "";

    // Create main section
    const bookingsSection = document.createElement("section");

    bookingsSection.classList.add(
        "bg-light-yellow",
        "my-25",
        "w-full",
        "lg:w-7/10",
        "m-auto",
        "text-apple-black"
    );

    bookingsSection.innerHTML = `

        <div class="bg-light-green flex justify-between items-center p-3">

            <h2 class="text-2xl font-bold tracking-wider">
                All Bookings
            </h2>

        </div>

        <article
            id="bookingsContainer"
            class="flex flex-col gap-5 p-5">
        </article>

    `;

    sectionContent.appendChild(bookingsSection);


    const bookingsContainer =
        document.querySelector("#bookingsContainer");


    // Fetch bookings from database
    try {

        const response = await fetch("/fetchMyBookings");

        const data = await response.json();


        if (!response.ok) {

            console.log(data);
            return;

        }


        //if no data is present
        if (data.length === 0) {
            sectionContent.innerHTML = `
        <div class="flex flex-col items-center justify-center text-center py-20">

            <h2 class="text-2xl font-bold">
                No bookings 
            </h2>

            <p class="mt-2 text-light-white/60">
                No bookings are there
            </p>

        </div>
    `;
        }


        data.forEach(booking => {

            createBookingCard(booking);

        });


    } catch (error) {

        console.log("Error fetching bookings:", error);

        bookingsContainer.innerHTML = `

            <p class="text-center text-red-500 py-10">
                Failed to load bookings.
            </p>

        `;

    }

};



// Create individual booking card
const createBookingCard = (booking) => {

    const bookingsContainer = document.querySelector("#bookingsContainer");


    const bookingCard = document.createElement("div");

    bookingCard.classList.add(
        "bg-light-white",
        "border",
        "border-apple-black/10",
        "rounded-xl",
        "p-5",
        "flex",
        "flex-col",
        "gap-3"
    );

    console.log(booking)
    const userName = booking.user.userName || "Unknown User";

    const userEmail = booking.user.userEmail || "Unknown Email";

    const roomName = booking.room.roomName || "Unknown Room";

    const buildingName = booking.building?.buildingName || "Unknown Building";


    bookingCard.innerHTML = `

        <div class="flex justify-between items-center border-b pb-2">

            <h3 class="text-xl font-bold">
                ${roomName}
            </h3>

            <span class="px-3 py-1 rounded-xl border
                ${booking.status === "approved"
            ? "border-green-500 text-green-600"
            : booking.status === "rejected"
                ? "border-red-500 text-red-600"
                : "border-yellow-500 text-yellow-600"
        }">

                ${booking.status}

            </span>

        </div>


        <div class="flex flex-col gap-1">

            <p>
                <strong>User:</strong>
                ${userName}
            </p>

            <p>
                <strong>Email:</strong>
                ${userEmail}
            </p>

            <p>
                <strong>Building:</strong>
                ${buildingName}
            </p>

            <p>
                <strong>Room:</strong>
                ${roomName}
            </p>

            <p>
                <strong>Date:</strong>
                ${booking.date}
            </p>

            <p>
                <strong>Time:</strong>
                ${booking.startTime} - ${booking.endTime}
            </p>

            ${booking.responseMessage
            ? `
                        <p>
                            <strong>Response:</strong>
                            ${booking.responseMessage}
                        </p>
                    `
            : ""
        }

        </div>

    `;


    bookingsContainer.appendChild(bookingCard);

};