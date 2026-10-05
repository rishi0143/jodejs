const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

let users = [
    {
        id: 1,
        name: "Rajesh",
        role: "DevOps Engineer"
    },
    {
        id: 2,
        name: "Ravi",
        role: "Developer"
    }
];

// Home API
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Node.js User Management App",
        version: "1.0"
    });
});

// Health check
app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        application: "Node.js App"
    });
});

// Get all users
app.get("/users", (req, res) => {
    res.json(users);
});

// Get user by ID
app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
});

// Add new user
app.post("/users", (req, res) => {

    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        role: req.body.role
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });
});

app.listen(PORT, () => {
    console.log(`Node.js application running on port ${PORT}`);
});
