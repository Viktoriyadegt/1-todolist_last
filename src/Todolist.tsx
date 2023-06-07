import React from "react";
import {FilterValuesType} from "./App";


export type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (taskId:number) => void
    changeFilterTasks: (filter:FilterValuesType) => void

}

export function Todolist(props: TodolistPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={()=>props.removeTask(task.id)}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={()=>props.changeFilterTasks('all')}>All</button>
                <button onClick={()=>props.changeFilterTasks('active')}>Active</button>
                <button onClick={()=>props.changeFilterTasks('completed')}>Completed</button>
            </div>
        </div>
    );
}