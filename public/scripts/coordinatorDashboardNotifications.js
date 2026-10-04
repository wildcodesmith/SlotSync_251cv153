

//function to show notifications from responded Notifications database
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

    const response = await fetch("/fetchRespondedNotifications")
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
        <div class="flex justify-between items-center border-b pb-2">

             <h2 class="text-2xl font-bold">
            Booking Status
        </h2>

            <span class="px-3 py-1 rounded-xl border
                ${notification.status === "approved"
            ? "border-green-500 text-green-600"
            : notification.status === "rejected"
                ? "border-red-500 text-red-600"
                : "border-yellow-500 text-yellow-600"
        }">

                ${notification.status}

            </span>

        </div>
       

        <p> <strong> User  : </strong> ${notification.user.userName}</p>

        <p> <strong> Email :  </strong> ${notification.user.userEmail}</p>

        <p> <strong> Building :  </strong> ${notification.building.buildingName}</p>

        <p> <strong> Room : </strong>  ${notification.room.roomName}</p>

        <p> <strong> Date : </strong>  ${notification.date}</p>

        <p> <strong> Time :  </strong> ${notification.startTime} - ${notification.endTime}</p>

        <p> <strong> Status :  </strong> ${notification.status}</p>

        <p class="max-w-lg"> <strong> Response Message : </strong>  ${notification.responseMessage} </p>


        <div class="flex gap-3">

            <button data-id="${notification._id}"
                class="readRespondedMssgBtn bg-apple-black text-light-white hover:cursor-pointer hover:bg-light-green hover:text-apple-black px-3 py-1 rounded-xl"
                >
                Mark as Read
            </button>

        </div>

    `




    notificationsContainer.append(notificationCard)


    notificationCard.querySelector(".readRespondedMssgBtn").addEventListener("click", () => {
        markAsRead(notification._id)
    })
}

//mark as read :>  request will send to server to remove the message from responded message database and move it to bookings database
const markAsRead = async (notificationId) => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",

        },
        body: JSON.stringify({ notificationId: notificationId })
    }

    let response = await fetch("/markAsRead", options)
    let data = await response.json();
    console.log(data)

    //refreshing  notification section
    showNotifications();
}