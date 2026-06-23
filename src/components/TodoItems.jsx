import TodoItem from "./TodoItem";
import styles from "./TodoItems.module.css";

const TodoItems = ({
  todoItems,
  onDeleteClick,
  onEditClick,
}) => {
  return (
    <div className={styles.itemsContainer}>
      {todoItems.map((item) => (
        <TodoItem
          key={item._id}
          todoId={item._id}
          todoDate={item.dueDate}
          todoName={item.name}
          onDeleteClick={onDeleteClick}
          onEditClick={onEditClick}
        />
      ))}
    </div>
  );
};

export default TodoItems;