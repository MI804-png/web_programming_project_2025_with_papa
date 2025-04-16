const TodoApp = () => {
    const [tasks, setTasks] = React.useState([]);
    const [task, setTask] = React.useState("");

    const addTask = () => {
        if (task.trim()) {
            setTasks([...tasks, task]);
            setTask("");
        }
    };

    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    return (
        <div className="todo-app">
            <h1>To-Do List</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter a task"
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((t, index) => (
                    <li key={index}>
                        {t} <button onClick={() => deleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<TodoApp />);