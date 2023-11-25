import React from "react";
import styles from "./ShowTask.module.css";

const ShowTask = (props) => {
  // Destructure props for easier usage
  const { todo, updateHandler, delete: onDelete, completed } = props;

  return (
    <div className={styles.taskBox}>
      {/* Map over the todo list and render each task */}
      {todo.map((task) => (
        <div key={task.id} className={styles.task}>
          {/* Display the task title */}
          <h5>{task.title}</h5>
          <div className={styles.icons}>
            {/* Icon for updating a task */}
            <ion-icon onClick={() => updateHandler(task, true)} name="create-outline"></ion-icon>
            {/* Icon for deleting a task */}
            <ion-icon onClick={() => onDelete(task.id)} name="trash-outline"></ion-icon>
            {/* Icon for marking a task as completed or not */}
            <ion-icon
              onClick={() => completed(task)}
              name={task.completed ? "checkmark-done-circle" : "checkmark-done-circle-outline"}
            ></ion-icon>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowTask;
