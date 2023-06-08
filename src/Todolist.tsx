import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";


export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (taskId: string) => void
    changeFilterTasks: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: TodolistPropsType) {
    const [title, setTitle] = useState('')
    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const removeTaskHandler = (taskId: string) => props.removeTask(taskId)
    const changeFilterAllHandler = () => props.changeFilterTasks('all')
    const changeFilterActiveHandler = () => props.changeFilterTasks('active')
    const changeFilterCompletedHandler = () => props.changeFilterTasks('completed')
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPress}
                />
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={() => removeTaskHandler(task.id)}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={changeFilterAllHandler}>All</button>
                <button onClick={changeFilterActiveHandler}>Active</button>
                <button onClick={changeFilterCompletedHandler}>Completed</button>
            </div>
        </div>
    );
}