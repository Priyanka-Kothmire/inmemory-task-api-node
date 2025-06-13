// Import built-in modules
const http = require('http');
const url = require('url');

const tasks = [];   // In-memory array to store tasks
let nextId = 1;   // Unique ID for each task


// Create an HTTP server
const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);  // Parse URL and method from the request
    const method = req.method;
    const path = parsedUrl.pathname;


    // Utility function to send a JSON response
    const sendJSON = (statusCode, data) => {
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    };

    // Utility function to collect request data
    const collectRequestData = (callback) => {
        let body = '';
        req.on('data', chunk => { body += chunk; });    // Accumulate data chunks
        req.on('end', () => {
            try {
                const json = JSON.parse(body);    // Convert string to JSON
                callback(null, json);    // Success callback
            } catch {
                callback(new Error('Invalid JSON'));     // Error callback on failure
            }
        });
    };


    // --- GET /tasks --- Return all tasks
    if (method === 'GET' && path === '/tasks') {
        sendJSON(200, tasks);
    }

    // --- POST /tasks --- Add a new task
    else if (method === 'POST' && path === '/tasks') {
        collectRequestData((err, task) => {
            if (err || !task.title) {
                sendJSON(400, { error: 'Invalid payload' });
                return;
            }
            const newTask = { id: nextId++, title: task.title };
            tasks.push(newTask);     // Add new task to the list
            sendJSON(201, newTask);   // Return the newly created task
        });
    }

    // --- PUT /tasks/:id --- Update a task with given ID
    else if (method === 'PUT' && path.startsWith('/tasks/')) {
        const id = parseInt(path.split('/')[2]);   // Extract ID from URL
        collectRequestData((err, body) => {
            if (err || !body.title) {
                sendJSON(400, { error: 'Invalid payload' });
                return;
            }
            const task = tasks.find(t => t.id === id);     // Find task by ID
            if (!task) {
                sendJSON(404, { error: 'Task not found' });
                return;
            }
            task.title = body.title;    // Update the title
            sendJSON(200, task);    // Return the updated task
        });
    }


    // --- DELETE /tasks/:id --- Delete a task with given ID
    else if (method === 'DELETE' && path.startsWith('/tasks/')) {
        const id = parseInt(path.split('/')[2]);
        const index = tasks.findIndex(t => t.id === id);
        if (index === -1) {
            sendJSON(404, { error: 'Task not found' });
            return;
        }
        tasks.splice(index, 1);  // Remove the task from the array
        sendJSON(200, { message: 'Task deleted successfully' });
    }

    // --- 404 for any unknown route
    else {
        sendJSON(404, { error: 'Route not found' });
    }
});


// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

// Export the server for testing purposes
module.exports = server;