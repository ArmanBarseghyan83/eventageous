# Eventageous

1. [About](#about)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Screenshots](#screenshots)
8. [Contributing](#contributing)
9. [License](#license) 
10. [Acknowledgements](#acknowledgements)

## About

Eventageous is a web application designed to help users organize and share their events seamlessly. Whether it's a public gathering or a private affair, Eventageous provides a user-friendly platform for creating, managing, and showcasing events.

## Features

- **User Authentication:** Secure user authentication system allows users to create accounts, log in, and access personalized features.

- **Event Creation:** Users can easily create and customize their own events by adding details such as event name, location, and a brief description.

- **Image Upload:** Event organizers can enhance their event pages by uploading pictures, capturing and sharing the best moments.

- **Edit and Update:** Event details can be re-edited even after the event has been posted. This feature ensures that organizers can keep attendees informed about any changes or updates.

- **Event Attendance:** Users can click the 'sign up' button on an event page to display their intention of attending a certain event.  Other users and guests will be able to see who is planning on attending the event.

## Getting Started

- **Hosted Web Application** The easiest way to get started is to just use the web-hosted version of our web app at: [Eventageous](https://eventageous-64c7552fd00e.herokuapp.com/)

- **Go Fork Yourself!** Download the repository.  Install all the dependencies.  Initiate the database with mysql.  Run the app on your local machine at localhost:3001.  More detailed description found in [installation](#installation).

### Prerequisites

- nodemon
- bcrypt
- sequelize
- mysql2
- dotenv
- express
- express handlebars
- multer
- sharp

### Installation

1. Clone the repository: https://github.com/ArmanBarseghyan83/eventageous
2. Install dependencies: `npm install`
3. Set up your connection in the `config.js` file.
4. Run the application: `npm start`

## Usage

1. Navigate to the application in your web browser.
2. Sign up or log in if you already have an account.
3. Create a new event by providing the required details.
4. Optionally, upload pictures to make your event page visually appealing.
5. Save the event, and it will be visible on the platform.

## Screenshots
**Home page:**
  - Users can see all events
  - Includes title, event image, creator, and location
![home](/public/images/home.png)

**Dashboard:** 
  - Display of your created events that can be edited or deleted
![dashboard](/public/images/dashboard.png)

**Event Details:**
  - Individual event page
  - Guests who have signed up are visible on the right side
![eventdetails](/public/images/eventdetails.png)

**Event Location and Comments:**
  - A map of the event's location is displayed underneath
  - User's comments are displayed with full message and timestamps
![mapandcomments](/public/images/mapandcomments.png)

**Add New Event:**
  - Upload an image
  - Enter the Title, Address, Zip Code and Description of event
  ![createevent](/public/images/createevent.png)

**Sign Up Rule:**
  - All visitors must be a registered user to sign up for an event
  - There is no way an individual can register without being logged in
  ![guestsmustlogin](/public/images/guestsmustlogin.png)

**Mobile Device Sizing**
  - Site will adapt to the viewing screen of your device
  - Mobile users have every function available to them
  - Drop down nav bar to make things easier to navigate to
  ![mobile](/public/images/mobile.png)

## Contributing

If you'd like to contribute to Eventageous, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/new-feature`
3. Make your changes and commit them: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Create a pull request.

## License

This project is licensed under the [MIT License](LICENSE.md).

## Acknowledgments

- The Eventageous team acknowledges the support of the open-source community.
- Thank you to pexels.com for having many event-type stock photos available for free use.
- Apologies to Matt Damon as we have run out of time.
