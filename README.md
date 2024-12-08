## **Prerequisites**
1. Install [Node.js](https://nodejs.org/) on your system.
2. Ensure you have `npm` (Node Package Manager) installed. It comes bundled with Node.js.

---

## **Exmaple with image**
<img width="1440" alt="Screenshot 2024-12-08 at 3 13 14 PM" src="https://github.com/user-attachments/assets/4bc4cf1b-ac59-448d-a3bf-749970618c3d">
<img width="1439" alt="Screenshot 2024-12-08 at 3 13 30 PM" src="https://github.com/user-attachments/assets/72b1dc5c-fd2e-4f95-b853-55e0c8e35532">
<img width="1440" alt="Screenshot 2024-12-08 at 3 13 22 PM" src="https://github.com/user-attachments/assets/c0eb3304-2cf0-4b4c-a843-0e42576d1d3d">


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
