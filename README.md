# Thinkful Final Capstone Project: Restaurant Reservation System

Deployed App Here: https://final-caps-22-client.herokuapp.com/dashboard

Full-Stack App Using the following:
-HTML
-CSS/BootStrap
JAVASCript/JSX
React.js
Express.js
PostgreSQL
Knex.js

## API Endpoints:

| URL | Request Method | Description | Page |
| --- | -------------- | ---------------------------------------------------- | ----- |
|/reservations?date=YYYY-MM-DD | GET | Accesses and displays the reservations information based on a particular date query | Dashboard |
| /reservations?mobile_number=555-555-5555 | GET | Locates and displays all reservations based on the associated phone number | Search |
| /reservations | POST | Creates a new Reservation | New Reservation |
| /reservations/:reservationId | GET | Accesses and displays a particular reservation based on the reservation Id | Dashboard |
| /reservations/:reservationId/status | GET | Accesses a reservations status (booked, seated, cancelled) | Dashboard, Search |
| /tables | GET | Accesses and displays the tables information | Dashboard |
| /tables | POST | Creates a new table | New Table |
| /tables/:tableId/seat | PUT | Seats a reservation at a table by updating the reservation Id column in the tables API | Seats |
| /tables/:tableId/seat | DELETE | Finishes a table so it can be reseated | Dashboard |

## Screen Shots

Dashboard:
<<<<<<< HEAD

 
 
 

=======
![dashboard](./front-end/.screenshots/us-01-submit-before.png)  
>>>>>>> parent of cd67bd1 (workingOn-ReadMe)
