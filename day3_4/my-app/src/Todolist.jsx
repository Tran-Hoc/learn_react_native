import React, { useState } from "react";

function Todolist(props) {
    const [task, setTask] = useState(""); // Contains the current task input
    const [tasks, setTasks] = useState([]); // Contains the list of tasks

    const handleAddTask = () => {
        if (task.trim() === "") return;

        const newTask = {
            id: Date.now(),
            text: task.trim(),
        };

        setTasks([...tasks, newTask]); // Add the new task to the list
        setTask(""); // Clear the input field

    };

    const handleDelete = (id) => {
        const filteredTasks = tasks.filter((t) => t.id !== id); // Remove the task with the given id
        setTasks(filteredTasks);
    }

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h2>Danh Sach viec can lam</h2>

            <div>
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Nhap cong viec can lam"
                    style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                />
                <button onClick={handleAddTask}>Them</button>
            </div>

            <ul style={{ paddingLeft: "0" }}>
                {tasks.map((item) => (
                    <li key={item.id} style={{ margin: "8px 0", listStyle: "none" }}>
                        {item.text}
                        <button onClick={() => handleDelete(item.id)}
                            style={{ marginLeft: "10px" }}>
                            Xoa
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Todolist;