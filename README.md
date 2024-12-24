# BookScope - Book Review Application

## Introduction
BookScope is an application designed to facilitate the review of various books. Users can add, edit, delete, and browse book reviews efficiently. The platform supports sorting reviews by date updated or alphabetically, and provides a search function to quickly find reviews by book title.

## Key Features
- **Add a Review:** Users can submit new reviews with details such as book title, author, rating, and their personal review text.
- **Edit Reviews:** Existing reviews can be updated to modify any incorrect or outdated information.
- **Delete Reviews:** Reviews can be removed from the system as needed.
- **Search Functionality:** Users can search for reviews by the book title.
- **Sort Reviews:** Reviews can be sorted alphabetically or by the date they were last updated.

## How to Run the Application

### Prerequisites
- Node.js installed
- npm or yarn installed
- Access to a MongoDB database

### Installation Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/BookScope---Book-Review-Application.git
   cd BookScope---Book-Review-Application
   git clone https://github.com/your-username/BookScope---Book-Review-Application.git
   cd BookScope---Book-Review-Application

2. Install dependencies
Navigate to the client and server directories in separate terminal windows and run:

       npm install

3. Set up environment variables
    In the server directory, create a .env file and specify your MongoDB URI:

       MONGO_URI=your_mongodb_uri

   Optionally, specify the port for the backend server (default is 5000):
   
      PORT=5000

4. Run the application
   
       npm start
 in another terminal, start the frontend client
      cd client
      npm start

5. The application should now be running locally on http://localhost:3000 (or whichever port you configured for the client).




      






