import { useState } from "react";

function AddTodo({ onNewItem }) {
  const [todoName, setTodoName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAddButtonClicked = () => {
    onNewItem(todoName, dueDate);
    setTodoName("");
    setDueDate("");
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(10px)",
        padding: "25px",
        borderRadius: "20px",
        marginBottom: "30px",
      }}
    >
      <div className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            placeholder="📝 Enter your task"
            className="form-control"
            value={todoName}
            onChange={(e) =>
              setTodoName(e.target.value)
            }
          />
        </div>

        <div className="col-md-4">
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
          />
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-success w-100"
            onClick={handleAddButtonClicked}
          >
            ➕ Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;