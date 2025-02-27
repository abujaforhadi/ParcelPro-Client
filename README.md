# ParcelPro - Parcel Management System

## Objective
ParcelPro is a Parcel Management System built using the MERN stack, designed to provide a seamless platform where users can book parcels, admins can assign delivery personnel, and delivery personnel can manage parcel deliveries. 
![3](https://github.com/user-attachments/assets/b2d4cf09-6cc4-4a18-8e32-47441500f238)

---

## Live Demo
- **Live Site URL**: https://parcelpro.abujafor.me/

---

## Features

### Home Page
- **Navbar**: Includes logo, Home, Notifications, Login/Profile dropdown.
- **Banner Section**: Attractive background image, search bar, and heading text.
- **Features Section**: Highlights three key features of the app (Parcel Safety, Fast Delivery, etc.) with icons, titles, and descriptions.
- **Statistics Section**: Displays app usage statistics using animated counters.
- **Top Delivery Men Section**: Showcases top delivery personnel sorted by ratings and number of deliveries.

### Authentication & Authorization
- Role-based login for three user types: Admin, Delivery Person, and User.
- Social login for users (defaults to "User" role).
- Secure authentication using JWT (JSON Web Tokens).

### User Dashboard
- **Book a Parcel**: 
  - Form for booking a parcel with auto-calculated price based on weight.
  - Validations for all fields.
  - Stores booking with "Pending" status in MongoDB.
- **My Parcels**: 
  - View, filter, and manage booked parcels.
  - Update or cancel parcels based on status.
  - Leave reviews for completed deliveries.
- **My Profile**: View and update personal information, including uploading a profile picture.

### Admin Dashboard
- **All Parcels**: 
  - Manage all bookings. Assign delivery personnel and update statuses.
  - Date range search for requested delivery dates.
- **All Users**: View all users, promote them to "Delivery Person" or "Admin".
- **All Delivery Men**: View delivery personnel details and performance.
- **Statistics**: Visualize app usage with charts (bookings by date, delivered vs. booked parcels).

### Delivery Person Dashboard
- **My Delivery List**: View parcels assigned to the logged-in delivery person. Update statuses to "Delivered" or "Canceled".
- **My Reviews**: View user feedback and ratings.

### Additional Features
- Responsive design for mobile, tablet, and desktop.
- Sweet alert/toast notifications for all CRUD operations.
- Payment integration using Stripe for booking costs.
- Use of TanStack Query for efficient data fetching (GET requests).
- Environment variables to hide sensitive Firebase and MongoDB keys.

---

## Technologies Used
- **Frontend**: React.js, Tailwind CSS, TanStack Query
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: Firebase, JWT
- **Payment Integration**: Stripe
- **Charts**: React Apex Charts
- **Geolocation**: MapBox or React Leaflet

---

## Setup Instructions

### Prerequisites
- Node.js and npm installed.
- MongoDB connection URI.
- Firebase configuration for authentication.
- Stripe API keys.

### Installation
1. Clone the repositories:
   - **Client**: https://github.com/abujaforhadi/ParcelPro-Client.git
   - **Server**: https://github.com/abujaforhadi/ParcelPro-server.git

2. Install dependencies:
   ```bash
   # For client
   cd client
   npm install

   # For server
   cd server
   npm install
   ```

3. Set up environment variables:
   - **Client**: Add Firebase configuration to `.env`.
   - **Server**: Add MongoDB URI and JWT secret to `.env`.

4. Start the application:
   ```bash
   # For client
   npm start

   # For server
   npm run dev
   ```

---

##  Details
- **Admin Email**: `admin@gmail.com`
- **Admin Password**: `admin@gmail.com`
- **Delivery Person Email**: `d@gmail.com`
- **Delivery Person Password**: `d@gmail.com`
- **Live Site URL**: https://parcelpro.abujafor.me/
- **Client Repository**: https://github.com/abujaforhadi/ParcelPro-Client
- **Server Repository**: https://github.com/abujaforhadi/ParcelPro-server

---

## Developer Notes
- Follow clean coding practices.
- Ensure responsiveness across devices.
- Use meaningful commit messages for GitHub.

Happy Coding!
