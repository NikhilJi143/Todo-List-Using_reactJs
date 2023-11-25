import React, { useEffect, useRef } from "react";
import styles from "./AddTask.module.css";

const AddTask = (props) => {
  // Ref for the input field
  const titleRef = useRef();

  // Effect to update the input value when editing a task
  useEffect(() => {
    // Set the input value to the task title if in edit mode
    titleRef.current.value = props.isEdit.edit ? props.isEdit.task.title : "";
  }, [props.isEdit]);

  // Handle form submission for adding a new task
  const handleSubmit = (e) => {
    // Prevent the default form submission
    e.preventDefault();
    // Call the addtask function with the input value
    props.addtask(titleRef.current.value);
    // Clear the input field after submission
    titleRef.current.value = "";
  };

  // Handle saving changes when updating a task
  const handleSave = () => {
    // Destructure the task object from isEdit prop
    const { task } = props.isEdit;
    // Update the task title with the input value
    task.title = titleRef.current.value;
    // Call the updateHandler function with the updated task and set edit mode to false
    props.updateHandler(task, false);
  };

  return (
    <div className={styles.taskContainer}>
      {/* Form for adding or updating a task */}
      <form onSubmit={handleSubmit}>
        <div className={styles.insideBox}>
          <br />
          {/* Input field for task title */}
          <input ref={titleRef} type="text" required placeholder="Enter the task..." />
        </div>
        <div>
          {/* Conditional rendering of buttons based on edit mode */}
          {props.isEdit.edit ? (
            // Button for updating a task
            <button type="button" onClick={handleSave}>
              Update
            </button>
          ) : (
            // Button for adding a new task
            <button type="submit">ADD TASK</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTask;
