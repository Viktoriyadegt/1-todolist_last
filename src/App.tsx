import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "restApi", isDone: false},
        {id: v1(), title: "GraphQl", isDone: false},
    ])

    const [filter, setFilter] = useState <FilterValuesType>('all')
    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    const changeFilterTasks = (filter: FilterValuesType) =>{
        setFilter(filter)
    }

    const addTask = (title:string) => {
        const newTask = {id:v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }


    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((task) => task.id !== taskId))
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilterTasks={changeFilterTasks}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;

