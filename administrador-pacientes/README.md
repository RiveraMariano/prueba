# Appointment Manager

Website link [Appointment Manager](https://administrador-pacientes-mrivera.netlify.app/).

## Summary

This is my first web application developed with react. I decided to start learning the javascript library because in the future when I finish my degree I would like to specialize in web development. This website uses the useState and useEffect hooks in addition to local storage to manage medical appointments, and for the hosting of the application I used the Netlify platform.

### Functionality

The application uses the hooks useState and useEffect, the first one is in charge of modifying the states of the objects where the information of the appointment is stored. The second is responsible for saving the data written in the local storage of the website by means of a JSON. When using the local storage if the web page is refreshed, the information is kept (unless the tab is closed).

### Design

I used the skeleton style library in conjunction with google fonts for website text. The other styles are inside a style sheet that is imported into the HTML. It is a simple design of a form and some cards to show the appointments.

### Run Locally

- Clone the repository `https://github.com/RiveraMariano/react-projects.git`
- The project is on the `administrador-pacientes` folder
- Open the cmd and get the project route
- Run `npm start`
- The project should run in the default browser :)

### Tech Stack

- React
- React Hooks
- Netlify