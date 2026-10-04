export const showDashboard = async () => {

    try {

        const response = await fetch(
            "/fetchCoordinatorDashboardData"
        );

        const data = await response.json();

        if (!response.ok) {

            console.log(data.message);
            return;

        }

        console.log(data);

        createDashboard(data);

    } catch (error) {

        console.log(
            "Failed to fetch dashboard data:",
            error
        );

    }

};

const createDashboard = (data) => {

    sectionContent.innerHTML = `

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            <!-- Total bookings -->

            <div class="bg-light-yellow text-apple-black rounded-xl p-5">

                <h2 class="text-lg font-semibold">
                    Total Bookings
                </h2>

                <p class="text-4xl font-bold mt-3">
                    ${data.totalBookings}
                </p>

            </div>


            <!-- Approved -->

            <div class="bg-light-yellow text-apple-black rounded-xl p-5">

                <h2 class="text-lg font-semibold">
                    Approved
                </h2>

                <p class="text-4xl font-bold mt-3">
                    ${data.approvedBookings}
                </p>

            </div>


            <!-- Pending -->

            <div class="bg-light-yellow text-apple-black rounded-xl p-5">

                <h2 class="text-lg font-semibold">
                    Pending Requests
                </h2>

                <p class="text-4xl font-bold mt-3">
                    ${data.pendingRequests}
                </p>

            </div>


            <!-- Rejected -->

            <div class="bg-light-yellow text-apple-black rounded-xl p-5">

                <h2 class="text-lg font-semibold">
                    Rejected
                </h2>

                <p class="text-4xl font-bold mt-3">
                    ${data.rejectedBookings}
                </p>

            </div>

        </div>


        <!-- Upcoming booking -->

        <div class="mt-8">

            <h2 class="text-2xl font-bold mb-4">
                Upcoming Booking
            </h2>


            ${
                data.upcomingBookings.length === 0

                ? `
                    <div class="p-5 bg-light-white text-apple-black rounded-xl">
                        No upcoming bookings.
                    </div>
                `

                : `

                    <div class="space-y-4">

                        ${data.upcomingBookings.slice(0, 3).map(
                            booking => `

                            <div class="
                                bg-light-white
                                text-apple-black
                                rounded-xl
                                p-5
                            ">

                                <h3 class="text-xl font-bold">
                                    ${booking.room?.roomName || "Room"}
                                </h3>

                                <p>
                                    Date: ${booking.date}
                                </p>

                                <p>
                                    Time:
                                    ${booking.startTime}
                                    -
                                    ${booking.endTime}
                                </p>

                                <p>
                                    Building:
                                    ${booking.building?.buildingName || "N/A"}
                                </p>

                            </div>

                        `
                        ).join("")}

                    </div>

                `
            }

        </div>

    `;

};