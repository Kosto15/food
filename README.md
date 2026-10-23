# Food Delivery & Calorie Calculator (Food)

## About the Project
This project is an interactive web application for a food delivery service. It allows users to explore different meal plans, view menus, calculate their daily calorie needs, and submit a callback request. 

**Project Background:**
This started as a practice project during my programming courses. The initial HTML and CSS template was provided to me as a starting point. **I wrote all the Vanilla JavaScript and the backend server code myself** to make the website fully interactive and functional. I also modified parts of the HTML as needed.

I originally started this JavaScript practice a year ago but didn't finish it. During my summer holidays, I decided to return to it, rewrite my old code, and finally complete the interactive logic. 

## Features (Implemented via my JavaScript)
* **Interactive Meal Plans:** Users can click to switch between different dietary styles (Fitness, Premium, Lean, Balanced). The image, description, and price update dynamically on the screen.
* **Image Slider:** A functional slider to view different menu offerings (01/04 to 04/04).
* **Calorie Calculator:** A dynamic tool with default values where users input their gender, height, weight, age, and activity level to calculate their daily calorie intake. It includes **input validation** — if a user types letters instead of numbers, the input field turns red to warn them.
* **Contact/Support Modal:** A pop-up form where users can enter their name and phone number to request a call back. Clicking outside the box closes it smoothly.
* **Countdown Timer:** A live countdown timer for special offers.

## Technologies Used
* **Frontend:** HTML5, CSS3 (Initial template provided), **Vanilla JavaScript (Written by me)**
* **Backend:** Node.js, Express.js, SQLite3 **(Written by me for the project)**

## How to Run the Project Locally?

### 1. Frontend
Because this project uses a local server setup:
1. Start Apache in your XAMPP Control Panel.
2. Click the "Admin" button next to Apache.
3. Change the link to `http://localhost/food/frontend/` to view the website.

### 2. Backend Server
1. Open your terminal.

2. Navigate to the backend folder:
```bash
cd backend/
```

3. Install the required dependencies:
```bash
npm install
```

4. Start the server:
```bash
npm run dev
```
(The server will run on port 9999 to handle form submissions)

## What I Learned
Finishing this project taught me that consistency is more important than perfection. By returning to old code, debugging, and writing both the interactive JavaScript and the backend server (**server.js file**), I learned how to read my own code, solve problems independently, and push through the moments when I wanted to give up. 

I also learned that a project is never truly "finished." I know there are still areas to improve — like optimizing how some data is saved and fixing minor bugs. But getting it to this point has given me the confidence to keep building and fixing things step by step.

## Future Improvements
If I decide to continue developing this project in the future, I plan to:
- Add full functionality to all currently inactive buttons on the website (including the Food Delivery navigation tab).
- Improve data handling to ensure every piece of information entered by users is saved correctly to the database.
- Write tests to check for and fix minor bugs.