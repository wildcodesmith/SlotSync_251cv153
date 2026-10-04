export const showDashboard = async () => {

    try {

        const response = await fetch(
            "/fetchStudentDashboardData"
        );

        const data = await response.json();
        createDashboard(data)

        if (!response.ok) {

            console.log(data.message);
            return;

        }

        console.log(data)

    } catch (error) {

        console.log(
            "Failed to fetch student dashboard data:",
            error
        );

    }

};

const createDashboard = (data) => {

    sectionContent.innerHTML = `

        <section class="min-h-[70vh] flex items-center justify-center px-5">

            <div class="w-full max-w-4xl text-center">

                <!-- Welcome -->

                <div class="mb-12">

                    <p class="text-light-white/50 text-sm tracking-[0.3em] uppercase mb-4">
                        Student Portal
                    </p>

                    <h1 class="text-4xl md:text-6xl font-bold">
                        Welcome${data.userName ? `, ${data.userName}` : ""}
                    </h1>

                    <p class="
                        mt-5
                        text-lg
                        md:text-xl
                        text-light-white/60
                        max-w-2xl
                        mx-auto
                    ">
                        Manage your campus experience, explore facilities,
                        and check room availability.
                    </p>

                </div>


                <!-- Information cards -->

                <div class="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-5
                    max-w-2xl
                    mx-auto
                ">

                    <!-- Facilities -->

                    <div class="
                        bg-light-yellow
                        text-apple-black
                        rounded-2xl
                        p-6
                        text-left
                    ">

                        <p class="text-sm font-semibold uppercase tracking-wider">
                            Facilities
                        </p>

                        <h2 class="text-2xl font-bold mt-2">
                            Explore Facilities
                        </h2>

                        <p class="mt-2 text-sm opacity-70">
                            View available rooms, labs and other facilities.
                        </p>

                    </div>


                    <!-- Availability -->

                    <div class="
                        bg-light-white
                        text-apple-black
                        rounded-2xl
                        p-6
                        text-left
                    ">

                        <p class="text-sm font-semibold uppercase tracking-wider">
                            Availability
                        </p>

                        <h2 class="text-2xl font-bold mt-2">
                            Check Availability
                        </h2>

                        <p class="mt-2 text-sm opacity-70">
                            Check facility availability 
                        </p>

                    </div>

                </div>


                <!-- Bottom message -->

                <p class="
                    mt-12
                    text-sm
                    text-light-white/40
                ">
                    Students can view facilities and availability.
                </p>

            </div>

        </section>

    `;

};
