import Booking from "../models/admin/booking.js";
import Room from "../models/admin/facilities/room.js";
import PendingNotification from "../models/admin/pendingNotification.js";


export const bookRoomRequest = async (req, res) => {

    try {

        const { roomId, date, startTime, endTime } = req.body;
        console.log(req.body)

        //error handling due to incomplete information
        if (!roomId || !date || !startTime || !endTime) {

            return res.status(400).json({
                message: "Incomplete booking information"
            });

        }

        const room = await Room.findById(roomId);

        //error handling if room is not found
        if (!room) {

            return res.status(404).json({
                message: "Room not found"
            });

        }

        //error handling if user tries to book unavailable room or room under maintainance
        if (room.status !== "available") {

            return res.status(400).json({
                message: "This room is currently not available for booking"
            });

        }

        // error handling if duration or slot of booking is not one hour
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);

        const duration = (end - start) / (1000 * 60);

        if (duration !== 60) {

            return res.status(400).json({
                message: "Booking must be exactly 1 hour"
            });

        }

        //error handling if booking time is outside the operating hours
        if (
            startTime < room.operatingHours.start ||
            endTime > room.operatingHours.end
        ) {

            return res.status(400).json({
                message: "Selected time is outside operating hours"
            });

        }

        //error handling if booking is not done atleast one day before
        //converting date into js date object
        const bookingDate = new Date(`${date}T00:00:00`);

        //get today's date and time
        const tomorrow = new Date();

        // Remove the current time
        tomorrow.setHours(0, 0, 0, 0);

        //shift one day forward => this is the earliest date the user  is allowed to book
        tomorrow.setDate(tomorrow.getDate() + 1);

        //error handling when user books the room for a date ( bookingDate )that is prior to tomorrow  
        if (bookingDate < tomorrow) {

            return res.status(400).json({
                message: "Room must be booked at least one day in advance"
            });

        }



        //error handling when user tries to book mutiple slots in a single day
        const existingPendingRequest = await PendingNotification.findOne({
            user: req.user.userId,
            date: date
        });

        const existingBooking = await Booking.findOne({
            user: req.user.userId,
            date: date
        });

        if (existingPendingRequest || existingBooking) {

            return res.status(400).json({
                message: "You can book only one slot per day"
            });

        }

        //handling double booking and overlapping time slots
        //overlapping check for pending booking requests
        const pendingRoomConflict =
            await PendingNotification.findOne({

                room: roomId,

                date: date,

                // Existing booking:
                // existing.startTime < requested.endTime
                // AND
                // existing.endTime > requested.startTime 
                //if the above conditions are true it means time slot is overlapping

                startTime: {
                    $lt: endTime
                },

                endTime: {
                    $gt: startTime
                }

            });

        //overlapping check for confirmed booking requests
        const confirmedRoomConflict =
            await Booking.findOne({

                room: roomId,
                status: "approved", // only check the overlapping if the booking is confirmed . In bookings collection all the booking requests are there whether approved or not so prevent the other user in booking the same room in same overlapping time slot only if the booking is confirmed
                date: date,

                startTime: {
                    $lt: endTime
                },

                endTime: {
                    $gt: startTime
                }

            });


        if (confirmedRoomConflict) {

            return res.status(400).json({
                message: "This room is already booked for this time slot"
            });

        }



        if (pendingRoomConflict) {

            return res.status(400).json({
                message: "This room already has a booking request for this time slot"
            });

        }


        // saving the booking request in pendingNotifications collection
        const notification = await PendingNotification.create({
            user: req.user.userId,
            room: roomId,
            building: room.building,
            date: date,
            startTime: startTime,
            endTime: endTime
        });

        return res.status(201).json({
            message: "Booking request sent successfully",
            notification
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server error"
        });

    }

};