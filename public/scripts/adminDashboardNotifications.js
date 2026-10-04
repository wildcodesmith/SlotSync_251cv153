

//function to show notifications from pending Notifications database
const sectionContent = document.querySelector("#sectionContent")

export const showNotifications = async () => {

    sectionContent.innerHTML = `
        <section class="bg-light-yellow my-25 w-full lg:w-7/10 m-auto text-apple-black">

            <div class="bg-light-green p-3">
                <h2 class="text-center text-2xl font-bold tracking-wider">
                    Notifications
                </h2>
            </div>

            <article id="notificationsContainer"
                class="flex justify-center items-center flex-wrap gap-8 p-5">
            </article>

        </section>
    `

    const response = await fetch("/fetchPendingNotifications")
    const data = await response.json()

       
    if (response.ok) {

        data.forEach(notification => {
            createNotification(notification)
        })

    } else {

        console.log(data)

    }
}

//creating notification card

const createNotification = (notification) => {

    const notificationsContainer = document.querySelector("#notificationsContainer")

    const notificationCard = document.createElement("div")

    notificationCard.classList.add(
        "bg-light-white",
        "border",
        "border-apple-black/10",
        "p-4",
        "rounded-xl",
        "w-fit",
        "flex",
        "flex-col",
        "gap-2"
    )

    notificationCard.innerHTML = `

        <h2 class="text-2xl font-bold">
            Booking Request
        </h2>

        <p>User : ${notification.user.userName}</p>

        <p>Email : ${notification.user.userEmail}</p>

        <p>Building : ${notification.building.buildingName}</p>

        <p>Room : ${notification.room.roomName}</p>

        <p>Date : ${notification.date}</p>

        <p>Time : ${notification.startTime} - ${notification.endTime}</p>

        <div class="flex gap-3">

            <button
                class="acceptBtn bg-apple-black text-light-white hover:cursor-pointer hover:bg-light-green hover:text-apple-black px-3 py-1 rounded-xl"
                data-id="${notification._id}">
                Accept
            </button>

            <button
                class="rejectBtn border border-red-400 text-red-500 px-3 py-1 rounded-xl hover:cursor-pointer hover:text-light-white hover:bg-red-500
                data-id="${notification._id}">
                Reject
            </button>

        </div>

    `

    


    notificationsContainer.append(notificationCard)


    notificationCard.querySelector(".acceptBtn").addEventListener("click", () => {
        respondToBooking(notification._id, "approved")
    })

    notificationCard.querySelector(".rejectBtn").addEventListener("click", () => {
        respondToBooking(notification._id, "rejected")
    })

}

//function to run when admin responds to the pending notification message
const respondToBooking = async (id, status) => {

    let message = "Your booking request has been approved."

    //compulsion for admin to write rejection message
    if (status === "rejected") {
        message = prompt("Enter rejection reason")

        if (!message) {
            return
        }
    }


    //sending response
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            notificationId: id,
            status: status,
            responseMessage: message
        })
    }

    let response = await fetch("/respondToBooking", options)
    let data = await response.json()

    if (response.ok) {
        //refresh the notification to update ui
        showNotifications()

    } else {
        console.log(data)
    }
 
}

