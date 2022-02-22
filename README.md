# CYF Bike App

## Description
We developed a tool to help a local charity, Bikes for Refugees, more efficiently schedule bike collections for their clients. Built using React (with Bootstrap and vanilla CSS), Node.js and Express, and Postgresql for the database. This was our final project for the Code Your Future Full Stack Web Development course, of which we were in Scotland Class 5. We had four weeks to design and build our product and present it to an external audience. 

View it here: https://cyf-bike-app.herokuapp.com/


## Main Features 
Main features include:
- A waiting list page with user details and booking statuses, retrieved from a Postgresql database
- Client data can be added to the database for viewing in the table by uploading a CSV
- Ability to select users from the list and send a customisable message
- Each message contains a unique link to a booking page where the user can select a date and time 
- The next two weeks of bookings are viewable in a bookings page, along with the user's contact details and how many bikes they require.
<img width="941" alt="Screenshot 2022-02-22 at 10 36 09" src="https://user-images.githubusercontent.com/81445969/155115194-8916c32f-ce43-4b79-9e51-dbfa2b9c66c9.png">

## Contributors 
- Houda Issa https://github.com/kenda121

- Israel Quintanilla https://github.com/aalassv

- Tara Quinn https://github.com/Tara-Q/

## Postgres Dev Setup

Mac users: 

1. Start a Postgres server locally 
   ``` 
   postgres
   ```
1. Create a new database
   ```
   createdb cyf-bike-app-dev
   ```
1. Run the script to create the tables
   ```
   psql -d cyf-bike-app-dev -f server/scripts/create_database.sql
   ```

## Scripts

Various scripts are provided in the package file, but many are helpers for other scripts; here are the ones you'll
commonly use:

- `dev`: starts the frontend and backend in dev mode, with file watching (note that the backend runs on port 3100, and
  the frontend is proxied to it).
- `lint`: runs ESLint and Prettier against all the code in the project.
- `serve`: builds and starts the app in production mode locally.

