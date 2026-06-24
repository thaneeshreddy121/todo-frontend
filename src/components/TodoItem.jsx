function TodoItem({
  todoId,
  todoName,
  todoDate,
  onDeleteClick,
  onEditClick,
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow:
          "0 10px 25px rgba(0,0,0,0.12)",
        transition: "0.3s",
      }}
    >
      <div className="d-flex justify-content-between align-items-center flex-wrap">

        <div>
          <h4
            style={{
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            📌 {todoName}
          </h4>

         <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#666",
  }}
>
  <span>📅</span>
  <span>{todoDate}</span>
</div>
        </div>

        <div className="d-flex gap-2 mt-3 mt-md-0">
          <button
            className="btn btn-warning"
            onClick={() =>
              onEditClick(todoId)
            }
          >
            ✏️ Edit
          </button>

          <button
            className="btn btn-danger"
            onClick={() =>
              onDeleteClick(todoId)
            }
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;