# LettuceEat Restaurant

## Overview

This React Native application is a restaurant ordering app that allows users to browse menus, view food items, add them to a cart, and place orders. It also includes an **Admin Dashboard** to manage the menu and analyze orders. This project demonstrates proficiency in React Native, state management, navigation, and basic CRUD operations.

## Features

### User Features
1. **Registration & Login**
   - Users can register with email and password.
   - Required details: First Name, Surname, Contact Number, Address, and Card Details (can use fake cards for testing).
   - Only registered users can place orders.
   
2. **Profile Management**
   - Users can update their profile details: Name, Surname, Email, Address, Contact Number, and Card Details.
   - Profiles are linked to the orders users place.

3. **Browsing Food Menu**
   - Users can view all food items categorized by type (e.g., Dessert, Beverages, Burgers, Mains, Starters).
   - Each food item displays:
     - Name
     - Description (ingredients)
     - Price
     - Image
   - Navigate to a **Food Details Screen** for more information.

4. **Food Details & Customization**
   - Users can view full food details.
   - Customizable options include:
     - Side options (e.g., chips, salad)
     - Drink options
     - Extras (e.g., sauces, additional toppings)
     - Optional ingredients
     - Quantity selection

5. **Cart Management**
   - View current items in the cart.
   - Edit quantity and customize extras.
   - Remove single items or clear the entire cart.
   - Navigate to the Checkout screen (registered users only).

6. **Checkout**
   - Change drop-off address (default: registered address).
   - View total order cost.
   - Select/change payment card.
   - Place orders.

### Admin Features
1. **Admin Dashboard**
   - Access restricted to admins only.
   - Manage food items: Add, Edit, Delete menu items.
   - Update restaurant information.
   - View order history.

2. **Analytics**
   - Bar and Pie charts to visualize order status (Pending, Delivered).
   - Track total sales.

3. **Profile Management**
   - Admins can update their profile details.
   - Logout functionality included.


## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Karabo5/lettuce-eat-app.git

   cd lettuce-eat-app
   ```
2. Open with VS Code

```
code .
```

3. Switch to dev branch

```
git checkout dev
```

4. Install dependencies

   ```bash
   npm install
   ```

5. Start the app

   ```bash
   npx expo start
   ```

6. Testing on Android

```
Download Expo Go on your phone and scan the QR code
```