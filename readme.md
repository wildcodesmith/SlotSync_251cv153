# SlotSync :  a centralized room and facility booking management system.

SlotSync is a full-stack web application developed for NITK IRIS and WEC Recruitment 2026 task. It facilitates room and facility booking management system designed to simplify the process of reserving academic spaces such as lecture halls, classrooms, laboratories, and other facilities.

The system provides different dashboards and permissions for Students, Faculty Convenors, and Administrators. Users can submit booking requests, authorized users can approve or reject those requests, and users can receive notifications about the booking status.

---
## Role Based Features 
feautes are completely based on role:

There are four roles :
- Admin
- faculty
- convenor
- student

NOTE : faculty and convenor have same features so they can be combined into coordinator

###  Admin :
- can see all the building facilites , rooms inside those buildings and can delete the building from facilities.
- can access all the rooms in a building, can also edit the info of room such as capacity , their status : availabe, unavailable , maintanance and operating time.
- can remove the room from building facility
- can access all the past bookings for all the users
- can see all the users who have their account but cannot access them
- can delete the account of any user (editing the info or role of any user is yet to implement)
- can view self account and logout 
- can view notifications that includes requests for booking
- can respond to the booking request. For rejecting booking admin has to give reason for rejecting.
- has dashboard that contains statistics about total users,  total bookings,
total facilities, pending requests. 


###  faculty/convenor :
- can see all the building facilites , rooms inside those buildings but cannot edit or delete the building facilities
- can access all the rooms in a building but cannot edit or delete rooms.
- can book the room and see his/her booking requests 
- can see the response from the admin for approving/ rejecting the booking request
- can only access  the past bookings that belongs to that particular faculty/convenor
- after the user marks the notification as read , it will delete from the notificaton section and will appear in `my  bookings` section
- can view self account and logout 
- has dashboard that contains info about the users total bookings, approved bookings, pending requests, rejected , upcoming bookings

###  Student :
- can only view all the building facilites but cannot edit or delete 
- can only view all the rooms in a building but cannot edit or delete  or book room.
- can view self account and logout 
---

# Main Features 
1. ### Authentication :
    SlotSync provides 
    
    - User registration
    - User login
    - Password verification using bcrypt
    - email format check using regex.
    - JWT-based authentication
    - HTTP-only authentication cookies
    - Logout functionality

2. ### Role-Based Authorization :
      Different users have different permissions based on their role. Protected routes check the authenticated user's role before allowing access.
3. ### Facility Management : 
    Facilities are organized into buildings and rooms and are mangaed by Admin only. Users can filter the facilites based on their type , capacity , status.

4. ### Booking features : 
    - One-Hour Booking : Users are to restricted to book a slot for more than one hour
    - Booking Date : Users cannot book a room for the current day or a previous day.
    - Advance Booking : A booking request must be made at least one day in advance.
    - One Booking Per User Per Day
    - Room Availability : Rooms that are unavailable or under maintenance cannot be booked.
    - Overlapping Bookings : Users are restricted from booking a same facility in overlapping time slot with other booking

  5. ### MVC Architecture : 
 - follows mvc architecture
  
---


# Planned features to be implemented in future
1. ### Automatic Booking Reminder : 
A planned feature is to send an email reminder approximately 30 minutes before an approved booking starts. This can be implemented using nodemailer.

2. ### Editing the user's role :
 The admin accounts are pre feeded in database while the students , faculty  and convenor can sign up their accounts. However, a feature can implemented where admin can edit the users info and change their role.

3. ### Booking Cancellation : 
User will be able to send a booking cancellation request and admin and accept/reject it in the same way as if to deal with booking requests.

4. ### Verification of Email using nodemailer.
5. ### Password reset  through email
6. ### Responsive design of website
---

# Technology Stack 
Frontend
- EJS
- Tailwind CSS
- JavaScript

Backened 
- Express.js

Database :
- MongoDB

Authentication :
- JWT
- bcrypt
- regex
- HTTP-only cookies

Deployment :
- hosted on -> Render
- database -> MongoDB Atlas

#  Known Bugs & Limitations

### Token / Session Handling

There is currently an issue with authentication token handling when multiple user roles are accessed within the same browser session. Switching between accounts with different roles can cause authentication or authorization errors because the authentication cookie is shared within the browser session.

One of the solution to fix this bug  is using different token names for different roles.

---

###  Role Assignment During Registration

Currently, the registration process allows a user to select their role during account creation.

This means a user could potentially select a privileged role such as `Convenor` without administrator approval.
 Role assignment should be controlled by the Admin/Administrator in a future version.

### Responsive Design
The current version of SlotSync is optimized mainly for desktop and laptop screens and may not provide an optimal experience on mobile and tablet devices. Mobile responsiveness can be improved in a future version.

# Setup


#  Online Setup — Render

The online version of SlotSync is already deployed on Render and connected to MongoDB Atlas.

To Open the deployed SlotSync application open on below link in a browser:

```text
https://slotsync-251cv153.onrender.com
```
---
#  Local Setup 

### STEP 1 : Install requirements 
Make sure to download and setup Node.js,  Mongodb and Visual Studio Code (VSC) on your computer.

### STEP 2 :  Clone the Repository

Open terminal inside a folder and paste the below code. A folder named `SlotSync_251cv153` will be created inside that folder. Open the `SlotSync_251cv153` folder in VSC
```
git clone https://github.com/wildcodesmith/SlotSync_251cv153
```
### STEP 3 : Install Dependencies

Open terminal in VSC and run the below code to install all required node.js dependencies
```
npm install
```
or 

```
npm i
```
### STEP 4 : Create Environment File
Create a .env file in the root directory of the project and copy the below variables and paste in .env file
```
MASTER_KEY='HermiteInterpolationMethod@234#$onebillion'
MONGO_URI='mongodb://localhost:27017/slotsyncdb' 
```
### STEP 5 : Seed the database

Run the below command in VSC terminal:
```
npm run seed
```

### STEP 6 : Start SlotSync

After the database has been seeded, start the application by running below command in VSC terminal
```
npm start
```
The application will be live on:

```
http://localhost:3000
```
Open the above address in your browser.

# Demo Accounts

The deployed version of SlotSync contains pre-configured accounts for each available role.

These accounts can be used to explore the different dashboards and features of the application.

| Role | Email | Password |
|---|---|---|
|  Admin | `admin@slotsync.com` | `pass123` |
| Convenor | `convenor@slotsync.com` | `pass123` |
| Faculty | `faculty@slotsync.com` | `pass123` |
|  Student | `student@slotsync.com` | `pass123` |

> **Note:** These are demo accounts created specifically for testing and demonstration purposes.

---

## Important Note for opening multiple Accounts in same Browser

Please **do not open different SlotSync roles in the same browser session**.

The current authentication system uses JWT authentication through HTTP-only cookies. Since cookies are shared within the same browser session, switching between different accounts or roles in the same browser can cause authentication or authorization issues.


---
#  Live Demo Video

###  SlotSync Live Demo

[Click the link to see the demo video](https://drive.google.com/file/d/1ioPgKBt-A_cyitRC4dtA9UuiLbBpHgGi/view?usp=sharing)

The video demonstrates the complete application workflow, including authentication, role-based access, room booking, booking approval/rejection, and notifications.


#  Screenshots 

###  SignUp page
![alt text](<screenshots/Screenshot 2026-10-05 at 6.44.38 PM-1.png>)

###  SignIn page

![alt text](<screenshots/Screenshot 2026-10-05 at 6.44.28 PM.png>)


###  admin Page 
![alt text](<screenshots/Screenshot 2026-10-05 at 6.45.03 PM.png>)
![alt text](<screenshots/Screenshot 2026-10-05 at 6.46.46 PM.png>)
![alt text](<screenshots/Screenshot 2026-10-05 at 6.53.07 PM.png>)
![alt text](<screenshots/Screenshot 2026-10-05 at 6.46.35 PM.png>)
![alt text](<screenshots/Screenshot 2026-10-05 at 6.46.27 PM.png>)
![alt text](<screenshots/Screenshot 2026-10-05 at 7.10.25 PM.png>)

###  Faculty/Convenor Page 
![alt text](<screenshots/Screenshot 2026-10-05 at 7.04.21 PM.png>)
![alt text](<screenshots/Screenshot 2026-10-05 at 7.04.28 PM.png>)
![alt text](<screenshots/Screenshot 2026-10-05 at 7.04.40 PM.png>)
![alt text](<screenshots/Screenshot 2026-10-05 at 7.04.48 PM.png>)
![alt text](<screenshots/Screenshot 2026-10-05 at 7.04.57 PM.png>)
![alt text](<screenshots/Screenshot 2026-10-05 at 7.07.10 PM 1.png>)


###  Student Page
![alt text](<screenshots/Screenshot 2026-10-05 at 7.12.26 PM.png>)
![alt text](<screenshots/Screenshot 2026-10-05 at 7.12.56 PM.png>)
![alt text](<screenshots/Screenshot 2026-10-05 at 7.12.42 PM.png>)




# Resources used to make the project

- [Express.js](https://expressjs.com)
- [Mongoose](https://mongoosejs.com/docs/index.html)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [EJS](https://github.com/mde/ejs/wiki/Using-EJS-with-Express)
- [Tailwind CSS](https://tailwindcss.com)
- [JavaScript MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JWT](https://jwt.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Render](https://render.com/docs)

