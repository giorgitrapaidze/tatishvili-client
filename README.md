## Description

This is a web app for David Tatishvili Health Center which is based in Tbilisi, Georgia. 
## User Stories

-  **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** As an anonymous user I can sign up on the platform so that I can book an apointment with the doctor.
-  **Login:** As a user I can login to the platform so that I can access my profile and book an apointment with the doctor.
-  **Logout:** As a logged in user I can logout from the platform so no one else can use it.
-  **User Panel**: As a logged in user I can visit my profile page so that I can access the edit page and see the list of my appointments.
-  **Doctors List** All website visitors can see this list, which will consist of all the doctors. The doctors list will have the search bar and filter by category(if there is enough time I will add the filter by date, which will show available doctors in a data range). From here you can access the Doctors profile.
-  **Doctors Profile** Doctors Profile consists of profile image/video and detailed information about the doctor. From this page you can access the booking page.
-  **Booking page** Booking page is available for logged in users, where they make an appointment with a doctor.






# Client / Frontend

## React Router Routes (React App)

| Path                 | Component         | Permissions                | Behavior                                          |
|----------------------|-------------------|----------------------------|---------------------------------------------------|
| `/login`             | LoginPage         | anon only `<AnonRoute>`    | Login form, navigates to home page after login.   |
| `/signup`            | SignupPage        | anon only  `<AnonRoute>`   | Signup form, navigates to home page after signup. |
| `/`                  | HomePage          | public `<Route>`           | Home page.                                        |
| `/profile`           | ProfilePage       | user only `<PrivateRoute>` | User and player profile for the current user.     |
| `/doctors`           | DoctorsListPage   | user only `<PrivateRoute>` | Doctors list.                                     |
| `/doctors/:doctorId` | DoctorBookingPage | user only ``               | Doctor details. Appointment booking.              |




## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- DoctorsListPage

- DoctorsBookingPage



  

Components:

- Navbar






## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`




 


# Server / Backend


## Models

**User model**

```javascript
{

 email: { type:   String, unique:   true, required:   true },

 password: { type:   String, required:   true },

 name: { type:   String, required:   true },

 role: { type:   String, enum: ["admin", "user"], default:   "user" },

 image: { type:   String, default:   "https://i.imgur.com/yWHfhiG.png" },

 bookings: [{ type:   Schema.Types.ObjectId, ref:   "Booking" }],

}
```



**Doctor model**

```javascript
{

 name: { type:   String, required:   true },

 image: {type:   String, default:   "https://drgsearch.com/wp-content/uploads/2020/01/no-photo.png"},

 category: { type:   String, required:   true },

 icon: { type:   String },

 bookings: [{ type:   Schema.Types.ObjectId, ref:   "Booking" }],

}
```



**Player model**

```javascript
{

 user: { type:   Schema.Types.ObjectId, ref:   "User" },

 doctorname: { type:   String },

 time: { type:   String },

 reserved: { type:   Boolean, default:   false },

},

{ timestamps:   true }
```




<br>


## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body            | Success status | Error Status | Description                                                                                                                     |
|-------------|------------------------|-------------------------|----------------|--------------|---------------------------------------------------------------------------------------------------------------------------------|
| GET         | `/auth/profile    `    | Saved session           | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | `/auth/signup`         | {name, email, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`          | {username, password}    | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/logout`         |                         | 204            | 400          | Logs out the user                                                                                                               |
| GET         | `/api/doctors`         |                         |                | 400          | Show all tournaments                                                                                                            |
| GET         | `/api/doctors/:id`     |                         |                |              | Show specific tournament                                                                                                        |
| POST        | `/api/booking`         | {user, doctor, time}    |                |              | make appointment                                                                                                                |
| GET         | `/api/booking/:userid` |                         | 200            | 400          | show bookings for a specific user                                                                                               |




### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/giorgitrapaidze/tatishvili-client)

[Server repository Link](https://github.com/giorgitrapaidze/tatishvili-server)

[Deployed App Link](https://focused-brattain-3a9a8c.netlify.app/)

