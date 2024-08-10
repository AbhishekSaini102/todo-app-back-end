import express from "express";

const app = express();

const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello from Abhishek Kumar Saini | daily-notes");
// });

// app.get("/about", (req, res) => {
//   res.send("Abhishek | daily-notes | about");
// });

app.use(express.json());

let nextId = 1; // Initialize nextId
const todoData = []; // Initialize todoData array

// create a new todo
app.post("/todos", (req, res) => {
  const { name, completed } = req.body;

  // Check if 'name' is provided
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  // Create a new todo object with auto-incremented ID
  const newTodo = {
    id: nextId, // Use nextId for the ID
    name: name,
    completed: true || false, // Default to false if not provided
  };

  nextId++; // Increment nextId after assigning it to the new todo
  todoData.push(newTodo);

  // Respond with the created todo
  res.status(201).json(newTodo);
});

// get all todos
app.get("/todos", (req, res) => {
  res.status(201).json(todoData);
});

// get a todo by id
app.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  console.log("Requested ID:", id);
  console.log("Todo Data:", todoData);

  // Find the todo with the requested ID
  const todo = todoData.find((t) => t.id === id);

  // Check if the todo exists
  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

//update todo
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, completed } = req.body;

  // Find the todo with the requested ID
  const todo = todoData.find((t) => t.id === id);

  // Check if the todo exists
  if (todo) {
    // Update the todo with the provided data
    todo.name = name || todo.name;
    todo.completed = completed || todo.completed;

    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

//delete todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Find the index of the todo with the requested ID
  const index = todoData.findIndex((t) => t.id === id);

  // Check if the todo exists
  if (index !== -1) {
    // Remove the todo from the array
    const deletedTodo = todoData.splice(index, 1);

    res.status(200).json(deletedTodo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// app.post("/todos", (req, res) => {
//   const todos = req.body;

//   // Check if the request body is an array
//   if (!Array.isArray(todos)) {
//     return res
//       .status(400)
//       .json({ message: "Request body must be an array of todos" });
//   }

//   const addedTodos = [];

//   todos.forEach((todo) => {
//     const { id, name, completed } = todo;

//     // Validate each todo
//     if (!name) {
//       return res
//         .status(400)
//         .json({ message: "Name is required for each todo" });
//     }

//     const newTodo = {
//       id: id || nextId, // Use provided id or generate a new one
//       name: name,
//       completed: completed || false,
//     };

//     // Check for existing todo with the same id
//     if (!todoData.some((t) => t.id === newTodo.id)) {
//       todoData.push(newTodo);
//       if (!id) nextId++;
//       addedTodos.push(newTodo);
//     }
//   });

//   res.status(201).json(addedTodos);
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// app.listen(port, "0.0.0.0", () => {
//   console.log(`Server running at http://0.0.0.0:${port}/`);
// });
