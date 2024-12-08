## **Prerequisites**
1. Install [Node.js](https://nodejs.org/) on your system.
2. Ensure you have `npm` (Node Package Manager) installed. It comes bundled with Node.js.

---

## **Steps to Get Started**

### **1. Clone the Repository**
```bash
git clone <repository_url>
cd <repository_folder>
```

### **2. Install Dependencies
  ```
cd src
npm install
cd ../server
npm install
```

Configuration

Environment Variables

Create a .env file inside the server folder with the following content:

```
PORT=3050
MONGO_URI=<Your MongoDB connection string>
```


Project Structure
```
root/
├── src/               # Frontend React application
│   ├── components/    # React components
│   ├── App.js         # Main React App file
│   └── ...            # Other frontend files
├── server/            # Backend Node.js application
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── server.js      # Entry point for the backend
│   └── ...            # Other backend files
└── README.md          # Documentation
```


Technologies Used

	•	Frontend: React, Tailwind CSS
	•	Backend: Node.js, Express.js
	•	Database: MongoDB
	•	Encryption: Lit Protocol
