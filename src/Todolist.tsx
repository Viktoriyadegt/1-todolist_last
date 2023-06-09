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
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: TodolistPropsType) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const removeTaskHandler = (taskId: string) => props.removeTask(taskId)
    const changeFilterAllHandler = () => props.changeFilterTasks('all')
    const changeFilterActiveHandler = () => props.changeFilterTasks('active')
    const changeFilterCompletedHandler = () => props.changeFilterTasks('completed')
    const changeTaskStatusHandler = (taskId: string, isDone: boolean) => {
        props.changeTaskStatus(taskId, isDone)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPress}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((task) => {
                    return (
                        <li key={task.id} className={task.isDone? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={(e) => changeTaskStatusHandler(task.id, e.currentTarget.checked)}
                            />
                            <span>{task.title}</span>
                            <button onClick={() => removeTaskHandler(task.id)}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={changeFilterAllHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={changeFilterActiveHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={changeFilterCompletedHandler}>Completed
                </button>
            </div>
        </div>
    );
}