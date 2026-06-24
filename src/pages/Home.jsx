import AppName from "../components/AppName";
import AddTodo from "../components/AddTodo";
import TodoItems from "../components/TodoItems";
import WelcomeMessage from "../components/WelcomeMessage";
import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://todo-backend-eh89.onrender.com";

function Home() {
  const [todoItems, setTodoItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  const navigate = useNavigate();

  // ✅ GET LOGGED IN USER
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    fetchTodos();
    fetchHistory();
  }, []);

  // ---------------- TODOS (USER FILTERED)
  const fetchTodos = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/todos?userId=${user._id}`
      );

      setTodoItems(res.data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  // ---------------- HISTORY (USER FILTERED)
  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/todos/history?userId=${user._id}`
      );

      setHistory(res.data);
    } catch (error) {
      console.log("Error fetching history:", error);
    }
  };

  // ---------------- LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // ---------------- CREATE TODO (ADD USER ID)
  const handleNewItem = async (itemName, itemDueDate) => {
    if (!itemName?.trim() || !itemDueDate) {
      alert("Please enter task and date");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/todos`, {
        name: itemName,
        dueDate: itemDueDate,
        userId: user._id,
      });

      fetchTodos();
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  // ---------------- DELETE TODO
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/todos/${id}`);

      fetchTodos();
      fetchHistory();
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  // ---------------- EDIT TODO (LOCAL ONLY)
  const handleEditItem = async (id) => {
  const todo = todoItems.find((item) => item._id === id);

  if (!todo) return;

  const newName = prompt(
    "Enter new task name",
    todo.name
  );

  if (!newName || !newName.trim()) return;

  try {
    await axios.put(
      `${BASE_URL}/api/todos/${id}`,
      {
        name: newName,
        dueDate: todo.dueDate,
      }
    );

    fetchTodos();
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="d-flex">

      {/* Sidebar Toggle */}
      <button
        className="btn btn-dark m-2"
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          zIndex: 1000,
        }}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        ☰
      </button>

      {/* Logout */}
      <button
        className="btn btn-danger"
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 1000,
        }}
        onClick={handleLogout}
      >
        Logout
      </button>

      {/* Sidebar */}
      {showSidebar && (
        <div
          className="border-end p-3"
          style={{
            width: "250px",
            minHeight: "100vh",
            backgroundColor: "#f8f9fa",
          }}
        >
          <h4 className="text-muted">History</h4>

          {history.length === 0 ? (
            <p>No Tasks</p>
          ) : (
            history.map((item) => (
              <div key={item._id} className="border rounded p-2 mb-2">
                <strong>{item.name}</strong>
                <br />
                <small>{item.dueDate}</small>
              </div>
            ))
          )}
        </div>
      )}

      {/* MAIN */}
      <div className="flex-grow-1">
        <center className="todo-container">
          <AppName />

          <AddTodo onNewItem={handleNewItem} />

          {todoItems.length === 0 && <WelcomeMessage />}

          <TodoItems
            todoItems={todoItems}
            onDeleteClick={handleDeleteItem}
            onEditClick={handleEditItem}
          />
        </center>
      </div>
    </div>
  );
}

export default Home;