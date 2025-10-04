# 🚗 RideSwap - Vehicle Rental Platform

![RideSwap Banner](rideswap/images/thumbnail.png)

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

**RideSwap** is a modern, responsive, and fully client-side vehicle rental platform. It allows users to browse, book, and manage rentals for a wide range of vehicles, including bikes, cars, vans, and luxury models. The platform is built with a focus on a clean user interface and a seamless booking experience.

---

## ✨ Core Features

### 👤 **User Authentication & Profile**
* **Secure Registration**: Easy signup with name, email, phone, and an optional profile photo.
* **Email & Password Login**: Robust client-side authentication.
* **Session Management**: Automatic logout after one hour of inactivity for enhanced security.
* **Profile Management**: Accessible user profile with a clean dropdown menu.

###   booking️ **Booking & Rental System**
* **Vehicle Categories**: Browse and book from Bikes, Cars, Autos, Vans, and Luxury vehicles.
* **Dynamic Pricing**: Real-time price calculation based on rental duration (per hour/day).
* **Date Validation**: Smart date picker that prevents selecting past dates and ensures a valid rental period.
* **Automated GST**: Calculates 18% GST on the final booking amount.
* **Booking Confirmation**: Generates a unique Booking ID and a detailed confirmation screen.

### 🚘 **Vehicle & UI Management**
* **Responsive Design**: A fully mobile-friendly interface that adapts to any screen size.
* **Modern UI/UX**: Intuitive and clean design with smooth transitions and animations.
* **Category Filtering**: Easily filter and find vehicles by type.
* **Featured Vehicles**: A dedicated section to showcase premium rental options.
* **Transparent Pricing**: Clear and upfront pricing for all vehicle types.

---

## 🛠 Technology Stack

-   **Frontend**: HTML5, CSS3, JavaScript (ES6+)
-   **Styling**: Custom CSS with a focus on responsive design principles.
-   **Client-Side Storage**: Browser `LocalStorage` for persistent data and `SessionStorage` for session management.
-   **Forms & Validation**: Comprehensive client-side validation for all user inputs.

---

## 🚀 Getting Started

This project runs entirely on the client-side and requires no special server setup.

### Prerequisites
- A modern web browser (e.g., Chrome, Firefox, Safari, Edge).

### Installation & Launch

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/srikarmalla/rideswap.git](https://github.com/srikarmalla/rideswap.git)
    cd rideswap
    ```

2.  **Open the application:**
    You can simply open the `login.html` file directly in your browser.

    Alternatively, for a more realistic experience, serve the files using a local server.

    * **Using Python:**
        ```bash
        # For Python 3.x
        python -m http.server 8000
        ```
    * **Using Node.js (with http-server):**
        ```bash
        # Install http-server if you haven't already: npm install -g http-server
        npx http-server
        ```

3.  **Access the application:**
    - If using a local server, navigate to `http://localhost:8000/login.html` in your browser.
    - Create a new account to get started or use existing credentials stored in your browser's local storage.

---

## 📖 Usage Guide

#### 1. Register a New Account
- On the `login.html` page, click **"Register here"**.
- Fill in your Full Name, 10-digit Phone Number, Email, and a 6-8 character password.
- Upload an optional profile photo.
- Click **Register** and you will be automatically logged in.

#### 2. Book a Vehicle
- Navigate to the **"Rent"** or **"Book"** sections from the navigation bar.
- Choose a vehicle category that suits your needs.
- On the booking page, fill in the required details:
    - Pick-up and Return dates.
    - Personal information.
    - Select a form of ID for verification (e.g., Passport, License, Aadhar).
- Review the total cost, including GST, and click **Confirm Booking**.
- You will receive a booking confirmation with a unique ID.

---

## 🐛 Known Issues & Limitations

-   **Client-Side Data**: The platform uses browser storage, meaning all user and booking data will be cleared if the browser cache is reset.
-   **No Live Payments**: The booking system does not include a real payment gateway integration.
-   **Static Availability**: Vehicle availability is not tracked in real-time.

---

## 🌟 Future Roadmap

-   [ ] **Backend Integration**: Develop a full-fledged backend API (e.g., using Node.js/Express) for persistent data storage.
-   [ ] **Payment Gateway**: Integrate a secure payment system like Stripe or Razorpay.
-   [ ] **Real-time Availability**: Implement a system to track and display vehicle availability in real-time.
-   [ ] **User Reviews**: Allow users to rate and review vehicles and their rental experience.
-   [ ] **Advanced Filtering**: Add advanced search and filtering options (e.g., by price, model, fuel type).
-   [ ] **Mobile App**: Develop a native mobile application for iOS and Android.

---

## 🤝 How to Contribute

Contributions are welcome! If you'd like to help improve RideSwap, please follow these steps:

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/YourAmazingFeature`).
3.  Commit your changes (`git commit -m 'Add YourAmazingFeature'`).
4.  Push to the branch (`git push origin feature/YourAmazingFeature`).
5.  Open a Pull Request.

---

## 👥 The Team

| Name            | Role                 |
| --------------- | -------------------- |
| **Nikhil Reddy**| CEO & Founder        |
| **Srikar Malla**| Technical Director   |
| **Vineet Kashyap**| Creative Director    |

### 📞 Contact
-   **Email**: srikarmalla06@gmail.com
-   **Phone**: +91 8328583198
-   **Address**: Ettimadai, Coimbatore

---

## 📄 License

© 2025 RideSwap. All Rights Reserved.

*This project was made with ❤️ by the RideSwap Team.*
