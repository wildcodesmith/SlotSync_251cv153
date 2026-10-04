import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import Account from "../models/account.js";
import Building from "../models/admin/facilities/building.js";
import Room from "../models/admin/facilities/room.js";
import Booking from "../models/admin/booking.js";
import PendingNotification from "../models/admin/pendingNotification.js";
import RespondedNotification from "../models/admin/respondedNotification.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/slotsyncs";

import mongoose from "mongoose";
import Building from "./models/admin/facilities/building.js";
import Room from "./models/admin/facilities/room.js";


const buildingsData = [
    {
        buildingName: "CIDS",
        buildingType: "Academic"
    },
    {
        buildingName: "LHC-A",
        buildingType: "Academic"
    },
    {
        buildingName: "LHC-C",
        buildingType: "Academic"
    },
    {
        buildingName: "LHC-D",
        buildingType: "Academic"
    },
    {
        buildingName: "CENTRAL LIBRARY",
        buildingType: "Library"
    },
    {
        buildingName: "E-LIBRARY",
        buildingType: "Library"
    },
    {
        buildingName: "MAIN BUILDING (ADMINISTRATIVE)",
        buildingType: "Administrative"
    },
    {
        buildingName: "CIVIL DEPARTMENT",
        buildingType: "Academic"
    },
    {
        buildingName: "MECHANICAL DEPARTMENT",
        buildingType: "Academic"
    },
    {
        buildingName: "CS DEPARTMENT",
        buildingType: "Academic"
    },
    {
        buildingName: "PHYSICS LABORATORY",
        buildingType: "Laboratory"
    },
    {
        buildingName: "CHEMISTRY LABORATORY",
        buildingType: "Laboratory"
    },
    {
        buildingName: "SJA",
        buildingType: "Auditorium"
    }
];

const roomsData = {
    "CIDS": [
        {
            roomName: "LH-101",
            capacity: 120,
            roomType: "Lecture Hall",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        },
        {
            roomName: "LH-102",
            capacity: 120,
            roomType: "Lecture Hall",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        },
        {
            roomName: "CR-101",
            capacity: 60,
            roomType: "Classroom",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        },
        {
            roomName: "CR-102",
            capacity: 60,
            roomType: "Classroom",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        }
    ],

    "LHC-A": [
        {
            roomName: "LH-A101",
            capacity: 180,
            roomType: "Lecture Hall",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        },
        {
            roomName: "LH-A102",
            capacity: 180,
            roomType: "Lecture Hall",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        },
        {
            roomName: "CR-A101",
            capacity: 70,
            roomType: "Classroom",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        },
        {
            roomName: "CR-A102",
            capacity: 70,
            roomType: "Classroom",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        }
    ],

    "LHC-C": [
        {
            roomName: "LH-C101",
            capacity: 180,
            roomType: "Lecture Hall",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        },
        {
            roomName: "LH-C102",
            capacity: 180,
            roomType: "Lecture Hall",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        },
        {
            roomName: "CR-C101",
            capacity: 70,
            roomType: "Classroom",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        }
    ],

    "LHC-D": [
        {
            roomName: "LH-D101",
            capacity: 180,
            roomType: "Lecture Hall",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        },
        {
            roomName: "LH-D102",
            capacity: 180,
            roomType: "Lecture Hall",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        },
        {
            roomName: "CR-D101",
            capacity: 70,
            roomType: "Classroom",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        }
    ],

    "CENTRAL LIBRARY": [
        {
            roomName: "LIB-HALL-101",
            capacity: 100,
            roomType: "Study Hall",
            operatingHours: {
                start: "08:00",
                end: "20:00"
            }
        },
        {
            roomName: "LIB-SEMINAR-101",
            capacity: 50,
            roomType: "Seminar Hall",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        }
    ],

    "E-LIBRARY": [
        {
            roomName: "ELIB-101",
            capacity: 80,
            roomType: "Computer Lab",
            operatingHours: {
                start: "08:00",
                end: "20:00"
            }
        },
        {
            roomName: "ELIB-102",
            capacity: 80,
            roomType: "Computer Lab",
            operatingHours: {
                start: "08:00",
                end: "20:00"
            }
        }
    ],

    "MAIN BUILDING (ADMINISTRATIVE)": [
        {
            roomName: "CR-M101",
            capacity: 50,
            roomType: "Meeting Room",
            operatingHours: {
                start: "09:00",
                end: "17:00"
            }
        },
        {
            roomName: "SEM-M101",
            capacity: 80,
            roomType: "Seminar Hall",
            operatingHours: {
                start: "09:00",
                end: "17:00"
            }
        }
    ],

    "CIVIL DEPARTMENT": [
        {
            roomName: "LH-CIV101",
            capacity: 100,
            roomType: "Lecture Hall",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        },
        {
            roomName: "CR-CIV101",
            capacity: 60,
            roomType: "Classroom",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        },
        {
            roomName: "CV-LAB-101",
            capacity: 40,
            roomType: "Laboratory",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        }
    ],

    "MECHANICAL DEPARTMENT": [
        {
            roomName: "LH-MEC101",
            capacity: 100,
            roomType: "Lecture Hall",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        },
        {
            roomName: "CR-MEC101",
            capacity: 60,
            roomType: "Classroom",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        },
        {
            roomName: "ME-LAB-101",
            capacity: 40,
            roomType: "Laboratory",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        },
        {
            roomName: "ME-LAB-102",
            capacity: 40,
            roomType: "Laboratory",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        }
    ],

    "CS DEPARTMENT": [
        {
            roomName: "LH-CS101",
            capacity: 100,
            roomType: "Lecture Hall",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        },
        {
            roomName: "CR-CS101",
            capacity: 60,
            roomType: "Classroom",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        },
        {
            roomName: "CS-LAB-101",
            capacity: 60,
            roomType: "Computer Laboratory",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        },
        {
            roomName: "CS-LAB-102",
            capacity: 60,
            roomType: "Computer Laboratory",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        }
    ],

    "PHYSICS LABORATORY": [
        {
            roomName: "PH-101",
            capacity: 40,
            roomType: "Physics Laboratory",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        },
        {
            roomName: "PH-102",
            capacity: 40,
            roomType: "Physics Laboratory",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        }
    ],

    "CHEMISTRY LABORATORY": [
        {
            roomName: "CY-101",
            capacity: 40,
            roomType: "Chemistry Laboratory",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        },
        {
            roomName: "CY-102",
            capacity: 40,
            roomType: "Chemistry Laboratory",
            operatingHours: {
                start: "08:00",
                end: "18:00"
            }
        }
    ],

    "SJA": [
        {
            roomName: "SJA-AUDITORIUM",
            capacity: 1000,
            roomType: "Auditorium",
            operatingHours: {
                start: "08:00",
                end: "21:00"
            }
        },
        {
            roomName: "SJA-SEMINAR-HALL",
            capacity: 250,
            roomType: "Seminar Hall",
            operatingHours: {
                start: "08:00",
                end: "20:00"
            }
        }
    ]
};



seedDatabase();

const seedDatabase = async () => {

    try {

        // CONNECT TO LOCAL MONGODB

        await mongoose.connect(process.env.MONGO_URI);

        console.log("Connected to MongoDB");



        // PASSWORD

        const hashedPassword = await bcrypt.hash(
            "password123",
            10
        );



        // ACCOUNTS

        let admin = await Account.findOne({
            userEmail: "admin@slotsync.com"
        });

        if (!admin) {

            admin = await Account.create({
                userName: "Admin",
                userEmail: "admin@slotsync.com",
                password: hashedPassword,
                userBranch: "Administration",
                userRole: "admin"
            });

            console.log("Admin created");

        } else {

            console.log("Admin already exists");

        }


        let faculty = await Account.findOne({
            userEmail: "faculty@slotsync.com"
        });

        if (!faculty) {

            faculty = await Account.create({
                userName: "Faculty User",
                userEmail: "faculty@slotsync.com",
                password: hashedPassword,
                userBranch: "Computer Science",
                userRole: "faculty"
            });

            console.log("Faculty created");

        } else {

            console.log("Faculty already exists");

        }


        let convenor = await Account.findOne({
            userEmail: "convenor@slotsync.com"
        });

        if (!convenor) {

            convenor = await Account.create({
                userName: "Convenor User",
                userEmail: "convenor@slotsync.com",
                password: hashedPassword,
                userBranch: "Computer Science",
                userRole: "convenor"
            });

            console.log("Convenor created");

        } else {

            console.log("Convenor already exists");

        }


        let student = await Account.findOne({
            userEmail: "student@slotsync.com"
        });

        if (!student) {

            student = await Account.create({
                userName: "Student User",
                userEmail: "student@slotsync.com",
                password: hashedPassword,
                userBranch: "Computer Science",
                userRole: "student"
            });

            console.log("Student created");

        } else {

            console.log("Student already exists");

        }




        // BUILDINGS

        const buildingMap = {};

        for (const buildingData of buildingsData) {

            const building = await Building.findOneAndUpdate(
                {
                    buildingName: buildingData.buildingName
                },
                buildingData,
                {
                    new: true,
                    upsert: true,
                    setDefaultsOnInsert: true
                }
            );

            buildingMap[building.buildingName] = building._id;
        }



        // ROOMS

        for (const [buildingName, rooms] of Object.entries(roomsData)) {

            const buildingId = buildingMap[buildingName];

            for (const roomData of rooms) {

                await Room.findOneAndUpdate(
                    {
                        roomName: roomData.roomName,
                        building: buildingId
                    },
                    {
                        ...roomData,
                        building: buildingId
                    },
                    {
                        new: true,
                        upsert: true,
                        setDefaultsOnInsert: true
                    }
                );
            }
        }


        console.log("Database seeded successfully!");

    } catch (error) {

        console.error("Database seeding failed:");
        console.error(error);

        process.exitCode = 1;

    } finally {

        await mongoose.connection.close();

    }

};


seedDatabase();