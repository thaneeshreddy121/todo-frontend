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
  const [showProfile, setShowProfile] = useState(false);

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


const handleEditProfile = async () => {
  const newName = prompt(
    "Enter Name",
    user.name
  );

  if (!newName) return;

  const newAddress = prompt(
    "Enter Address",
    user.address || ""
  );

  try {
    const res = await axios.put(
      `${BASE_URL}/api/auth/update-profile/${user._id}`,
      {
        name: newName,
        address: newAddress,
      }
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    alert("Profile Updated");

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};




  return (
    <>
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
  className="btn btn-light"
  style={{
    position: "fixed",
    top: "10px",
    right: "10px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    zIndex: 1000,
    fontSize: "22px",
  }}
  onClick={() =>
    setShowProfile(!showProfile)
  }
>
  👤
</button>                                                             

      {/* Sidebar */}
      {showSidebar && (
     
     <div className="history-sidebar">
          <h4 className="text-muted">History</h4>

          {history.length === 0 ? (
            <p>No Tasks</p>
          ) : (
            history.map((item) => (
              <div key={item._id} className="history-card">
                <strong>{item.name}</strong>
                <br />
                <small>{item.dueDate}</small>
              </div>
            ))
          )}
        </div>
      )}


{showProfile && (
  <div className="profile-sidebar">
    <div className="text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt="profile"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
        }}
      />

      <h4 className="mt-3">
        {user?.name}
      </h4>

      <p>{user?.email}</p>

      <p>
        <strong>Address:</strong>
        <br />
        {user?.address || "Not Added"}
      </p>

      <button
        className="btn btn-warning w-100 mb-3"
        onClick={handleEditProfile}
      >
        Edit Profile
      </button>

      <button
        className="btn btn-danger w-100"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  </div>
)}



      {/* MAIN */}
      <div className="flex-grow-1">
      <center
  className="todo-container"
  style={{
    maxWidth: "1000px",
    margin: "40px auto",
  }}
>
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

    <footer className="footer">
  <p>
    © 2026 Smart Todo Manager | Built by Thaneesh
  </p>
</footer>
</>
  );
}

export default Home;