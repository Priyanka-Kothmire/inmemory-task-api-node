# In-Memory Task API (Node.js)

This is a simple Node.js application that provides a RESTful API to manage a list of tasks.  
It uses **only built-in Node.js modules** – no frameworks like Express.

---

## 🚀 Features

- ✅ Add a new task
- ✅ Get all tasks
- ✅ Update a task by ID
- ✅ Delete a task by ID
- ✅ In-memory data storage (no database needed)

---

## 🛠️ How to Run

node server.js
Server runs at: http://localhost:3000

---

## ⚠️ Notes
All tasks are stored in memory – once the server restarts, data is lost.

If a task is not found (wrong ID), returns: 404 Not Found.

For invalid JSON input, returns: 400 Bad Request.

---


## 👩‍💻 Author

Priyanka Kothmire
GitHub: Priyanka-Kothmire




