import "./Tasks.css";
import removeTaskIcon from "../../assets/remove-task-icon.svg";
import checkTaskIcon from "../../assets/check-task-icon.svg";
import { useEffect, useState, useContext, useRef, use } from "react";
import taskService from "../../services/taskService";
import { NotificationContext, WidgetContext } from "../../contexts";
import Draggable from "react-draggable";

export default function Tasks({ visible, draggable }) {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(true);
  const [overInput, setOverInput] = useState(false);
  const { setNotification, setVisibleNotification } =
    useContext(NotificationContext);
  const nodeRef = useRef(null);
  const { positions, setPositions } = useContext(WidgetContext);

  useEffect(() => {
    async function getTasks() {
      const tasks = await taskService.getTasks();
      setTasks(tasks);
    }
    getTasks();
  }, []);

  function updatePosition(event, data) {
    const newPositions = { ...positions, tasks: { x: data.x, y: data.y } };
    setPositions(newPositions);
    localStorage.setItem("positions", JSON.stringify(newPositions));
  }

  async function deleteTask(id) {
    const isDeleted = await taskService.deleteTask(id);
    if (isDeleted) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  }

  async function completeTask(task) {
    task.completed = true;
    const updatedTask = await taskService.updateTask(task.id, task);
    if (updatedTask) {
      setTasks(
        tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    }
  }

  async function handleSubmission(e) {
    e.preventDefault();

    let errorMessage = null;
    if (!taskName) {
      errorMessage = "Please enter a task";
    }
    if (taskName.length > 25) {
      errorMessage = "Max character limit exceeded";
    }

    if (errorMessage) {
      setNotification({ content: errorMessage, type: "error" });
      setVisibleNotification(true);
      setTimeout(() => {
        setVisibleNotification(false);
      }, 5000);
    } else {
      const newTask = await taskService.postTask(taskName.trim());
      setTasks([...tasks, newTask]);
    }
  }

  function handleSearch(event) {
    setSearchValue(event.target.value);
  }

  return (
    <Draggable
      position={positions.tasks}
      onDrag={updatePosition}
      disabled={overInput || !draggable}
      nodeRef={nodeRef}
    >
      <div
        ref={nodeRef}
        className="tasks"
        style={{ display: visible ? "" : "none" }}
      >
        <div className="settings-selector">
          <button
            onClick={() => {
              setIsSearching(true);
            }}
            style={{
              backgroundColor: isSearching ? "#2196F3" : "",
              color: isSearching ? "var(--active-color)" : "",
            }}
          >
            Filter
          </button>
          <button
            onClick={() => {
              setIsSearching(false);
            }}
            style={{
              backgroundColor: isSearching ? "" : "#2196F3",
              color: isSearching ? "" : "var(--active-color)",
            }}
          >
            Add
          </button>
        </div>
        {isSearching ? (
          <form
            className="task-form "
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="search-task-input" style={{ display: "none" }}>
              Filter tasks
            </label>
            <input
              type="text"
              value={searchValue}
              onChange={handleSearch}
              onMouseEnter={() => setOverInput(true)}
              onMouseLeave={() => setOverInput(false)}
              id="search-task-input"
            />
          </form>
        ) : (
          <form className="task-form" onSubmit={handleSubmission}>
            <label htmlFor="add-task-input" style={{ display: "none" }}>
              Add task
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(event) => setTaskName(event.target.value)}
              onMouseEnter={() => setOverInput(true)}
              onMouseLeave={() => setOverInput(false)}
              id="add-task-input"
            />
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
        )}
        <>
          <ul className="tasks-list">
            {tasks
              .filter((task) =>
                task.name
                  .toLowerCase()
                  .includes(searchValue.toLowerCase().trim())
              )
              .map((task) => {
                return (
                  <li
                    key={task.id}
                    style={{
                      backgroundColor: task.completed
                        ? "var(--success-color)"
                        : null,
                    }}
                  >
                    <button
                      style={{
                        visibility:
                          !visible || task.completed ? "hidden" : "visible",
                      }}
                      className="check-btn"
                      onClick={() => completeTask(task)}
                    >
                      <img src={checkTaskIcon} alt="complete task" />
                    </button>
                    {task.name}
                    <button
                      className="remove-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      <img src={removeTaskIcon} alt="delete task" />
                    </button>
                  </li>
                );
              })}
          </ul>
        </>
      </div>
    </Draggable>
  );
}
