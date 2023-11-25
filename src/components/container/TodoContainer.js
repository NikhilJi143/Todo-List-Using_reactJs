import React, { useEffect, useState, useMemo } from "react";
import { Store } from "react-notifications-component";
import { addTaskHandler, deleteTask, fetchTodo, updateTask } from "../../api/index.js";
import AddTask from "../addTask/AddTask";
import Spinner from "../spinner/Spinner";
import ShowTask from "../showTask/ShowTask";
import Classes from "./TodoContainer.module.css";
import "react-notifications-component/dist/theme.css";

const TodoContainer = () => {
  // State for loading status
  const [isLoading, setIsLoading] = useState(true);

  // State for storing todo list
  const [todo, setTodo] = useState([]);

  // State for handling edit mode
  const [isEdit, setIsEdit] = useState({ edit: false, task: {} });

  // User ID for API requests
  const userId = 1;

  // Memoized notifications configuration
  const notifications = useMemo(() => ({
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 1000,
      onScreen: true,
    },
  }), []);

  // Function to show notifications
  const notify = (title, message, type) => {
    Store.addNotification({ title, message, type, ...notifications });
  };

  // Function to mark a task as completed
  const completed = async (task) => {
    const index = todo.findIndex((elm) => elm.id === task.id);
    setTodo((prev) => {
      prev[index].completed = true;
      return [...prev];
    });

    notify("Congratulations", "Task Completed Successfully", "success");
  };

  // Function to handle updating a task
  const updateHandler = async (task, requested) => {
    if (requested) {
      setIsEdit({ edit: true, task });
      return;
    }

    notify("In Progress", "Updating Data", "info");

    const data = await updateTask(task);

    if (data.success) {
      notify("Hurray", "Task updated successfully", "success");
    } else {
      notify("Oh God!", data.message, "error");
    }

    setIsEdit({ edit: false, task: {} });
  };

  // Function to handle deleting a task
  const deleteHandler = async (id) => {
    notify("In Progress", "Deleting Data", "info");

    const result = await deleteTask(id);

    if (result.success) {
      const updatedTodo = todo.filter((data) => data.id !== id);
      setTodo(updatedTodo);

      notify("Hurray", "Task deleted successfully", "success");
    } else {
      notify("Sorry", result.message, "error");
    }
  };

  // Function to add a new task
  const addData = async (title) => {
    notify("In Progress", "Adding Data", "info");

    const data = await addTaskHandler(title, userId);

    if (data.success) {
      notify("Hurray", "Task added successfully", "success");
      setTodo([data.data, ...todo]);
    } else {
      notify("Sorry", data.message, "error");
    }
  };

  // Fetch initial data when the component mounts
  useEffect(() => {
    async function fetchData() {
      notify("Loading...", "Fetching Data", "info");

      const data = await fetchTodo();

      if (data.success) {
        setIsLoading(false);
        setTodo(data.data);
      } else {
        setIsLoading(false);
        notify("Sorry", data.message, "error");
      }
    }

    fetchData();
  }, [notifications]);

  // Render the component
  return (
    <div className={Classes.container}>
      <h1>TODO APP</h1>
      <AddTask addtask={addData} isEdit={isEdit} updateHandler={updateHandler} />
      {isLoading ? <Spinner /> : <ShowTask todo={todo} delete={deleteHandler} completed={completed} updateHandler={updateHandler} />}
    </div>
  );
};

export default TodoContainer;
