# TrekTrax TravelBuddy Client

#### The Travel Buddy Matching Application is a platform designed to connect travelers with compatible travel buddies based on their preferences, interests, and travel plans. Users can create profiles, search for potential travel partners, and plan trips together, fostering a community of like-minded adventurers.

### Live Project Link: [text](https://traxtrek-client.vercel.app/)

### Live Server-site Link: [text]( https://trektrax-server.vercel.app/)

### Github Repository Link: Front-end: <https://github.com/isratjmn/traxtrekbuddy-client>

### Github Repository Link: Back-end: <https://github.com/isratjmn/traxtrekbuddy-client>

### Video Presentation Link: [text](https://drive.google.com/file/d/10CP9Zs_Y1javfHWKlurqxzh6J93Lk0Dz/view?usp=sharing)

### Table of Contents

1. [Home Page/Landing Page](#home-page-landing-page)
2. [Login & Registration](#login--registration)
3. [Post a Travel/Trip (Private Page)](#post-a-traveltrip-private-page)
4. [Travels Page](#travels-page)
5. [Travel Details Page](#travel-details-page)
6. [Travel Request Page (Private)](#travel-request-page-private)
7. [My Profile](#my-profile)
8. [Admin Dashboard](#admin-dashboard)
9. [Change Password Page](#change-password-page)
10. [About Us](#about-us)

### 1. Home Page/Landing Page

#### Header:

- Logo
- Navigation Bar: Links to Home, About Us, Login/Register (if not logged in), My Profile (if logged in)

#### Hero Section:

- Catchy Headline
- "Share Your Trip" button

#### Searching Options:

- Search Bar: Search for trips by destination, travel dates, and travel type

#### Travel Posts:

- Display recent travel posts in card format
- See More Button to view all trips

### Extra Sections (Unique and Relevant):

- Featured Destinations
- Travel Tips and Guides

#### Footer:

- Contact Information
- Copyright Information
- Additional Links: Terms of Use, Privacy Policy

### 2. Login & Registration

#### Login Form:

- Fields: Username or email address, Password

#### Registration Form:

- Fields: Username, Email address, Password (with confirmation)

### 3. Post a Travel/Trip (Private Page)

- Form Fields: Destination, Detailed description, Travel dates, Travel type, Upload photos
- Submit Button

### 4. Travels Page

- Search and Filter Options
- Travel Cards with pagination

### 5. Travel Details Page

- Detailed information about the trip
- Multiple photos, Detailed description, Itinerary, Travel dates, Travel type, Location
- Travel Request Button

### 6. Travel Request Page (Private)

- Form Fields: User's contact information, Additional Information, Agreement to terms and conditions
- Submit Button

### 7. My Profile

- Edit Profile: Options to edit username and email
- Change Password: Link to Change Password page
- Travel Request History
- Travel Posts

### 8. Admin Dashboard

- User Management: View and Manage User Accounts, Activate/deactivate accounts, edit roles
- Trip Management: View and Manage Travel Posts, Edit or remove trip listings

### 9. Change Password Page

- Fields: Current password, New password (with confirmation)

### 10. About Us

- Mission Statement
- Team Information
- Contact Information

### 11. Additional Considerations

- Secure Login System: Implement password hashing
- Responsive Design: Ensure accessibility and user-friendliness on various devices

## Installation and Setup

1. Clone this repository: `git clone <repository_url>`

2. Install dependencies: `npm install`

3. Set up the environment variables by creating a `.env` file and filling in the required variables based on the provided `.env.example` file.

4. Run the database migrations: `npx prisma migrate dev`

5. Start the server: `npm run start`
