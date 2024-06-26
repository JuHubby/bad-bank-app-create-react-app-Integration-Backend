
# Secured Banking App 

## Description of the project:
 This is a banking app implementing security measures such as Firebase middleware authentication. It's a project aimed at practicing my first React app creation using the CREATE REACT APP toolchain for the frontend and Node/Express for the backend. The app allows users to create an account with minimal requirements and validations. It supports basic transactions like depositing to their balance, withdrawing to a specific user, and saving balances in a MongoDB database named "All Data."

I plan to enhance this project by developing a more realistic and secure banking application. Future updates will include adding roles and authorization processes for roles such as admin and customer. Customers will only be able to view their own data, while accounts with admin roles can access the entire database and modify customer information.

Additionally, I aim to implement cookie caching attributes to prevent users from needing to log in again when they reload the page. I also intend to incorporate a timer for the authentication feature, so users are prompted to confirm if they want to remain logged in after a certain period of time has passed.

## Installation Guidelines:
 This project was initiated using the Create React App tool (found in the client folder), and the backend was integrated in its respective server folder, connecting with the browser as follows:

 

#### Cloning this repository to your local machine:
- Open your terminal or VS Code and navigate to the directory where you want the local repository to be copied.
- type `git clone https://github.com/JuHubby/bad-bank-app-create-react-app-Integration-Backend.git`
- Wait for the cloning process to complete, and you will have a local copy of the repository.

**Note 1: Ensure you are using Node.js version 18 or higher. Also, make sure to have MongoDB running in Docker. Start MongoDB first, then run the server, and finally, run the client-side application.**

**Note 2: This app also utilizes libraries such as Bootstrap React, React-DOM, Formik, and others in both the client and server folders. Ensure you install these dependencies by running npm install in each folder (client and server).**

#### Running the Application:

In your CLI:

- To start the client side (frontend), navigate to the client folder: `cd client`
Then run: `npm start`
This command runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

- To monitor the server side (backend), navigate to the server folder through your CLI: `cd server`

Then type the following command: `node -r dotenv/config .`
This command allows you to observe responses from the backend part of the application in action.

## Screenshots:

![til](./client/public/Animation.gif)

## Technologies used:

This is a MERN web application. MERN is an acronym for the four technologies that form the stack: MongoDB, Express, React, and Node.js.


## Roadmap of future improvements:
There are numerous improvements and additions that can be implemented in this code. For example: 
One of the notable features of this banking app project is the implementation of authentication. However, lacks authorization processes. I plan to include two roles between admin and customer:

Admin Role: Allows access to the entire database and the ability to modify customer information.
Customer Role: Limits access to only view their own data, ensuring privacy and security.
This feature will enhances security and usability by controlling access based on user roles, ensuring that sensitive information is appropriately protected and managed within the application.

I also want to synchronize the database between Firebase and MongoDB so that they contain identical information. This ensures that if someone creates an account, it will be reflected consistently in both databases. This approach is especially useful for apps that share authentication data across different parts of the application, ensuring uniformity and seamless authentication across the entire app.

## License information:
MIT license.

## Support
If you have any questions, please don't hesitate to contact me email <juliethpbautista@gmail.com>
 . Also I'm open to your ideas and suggestions, and I'm confident that our combined talents could lead to exciting and innovative results. If you're interested in discussing potential projects or exchanging ideas, please let me know.

Let's start a conversation and see where our collaboration might take us.

