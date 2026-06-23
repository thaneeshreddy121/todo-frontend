function TodoItem({
  todoId,
  todoName,
  todoDate,
  onDeleteClick,
  onEditClick,
}) {
  return (
    <div className="container">
      <div className="row kg-row">
        <div className="col-5">{todoName}</div>

        <div className="col-3">{todoDate}</div>

        <div className="col-2">
          <button
            type="button"
            className="btn btn-warning kg-button"
            onClick={() => onEditClick(todoId)}
          >
            Edit
          </button>
        </div>

        <div className="col-2">
          <button
            type="button"
            className="btn btn-danger kg-button"
            onClick={() => onDeleteClick(todoId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;