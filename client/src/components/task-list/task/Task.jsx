import { useEffect, useState } from 'react';

import './task.scss';
import {AiOutlineClose,AiOutlineCheck} from 'react-icons/ai';
import { DeleteTask, GetTasks, UpdateTask } from '../../../api/TaskRquests';
import { useParams } from 'react-router';

const Task = ( {task, dispatchTasks}) => {

    const [checked,setChecked] = useState(null);
    const params = useParams();

    useEffect( ()=>{
        setChecked(task.check)
    },[task.check]);

    const deleteTaskHandler = async () =>{
        await DeleteTask([task._id]);
        dispatchTasks({type: 'DELETE_TASK', payload: task});
        const result = await GetTasks(params.page);
        dispatchTasks({type: 'GET_TASKS',payload: result});
    }

    const checkHandler = async () =>{
        await UpdateTask({check: !checked, id: task._id});
        dispatchTasks({type: 'UPDATE_TASK', payload: task });
        setChecked(!checked);
    }

    return (
        <div className='task-container'>
            <div className='checkbox' onClick={checkHandler}> {checked ? <AiOutlineCheck className='checkmark'/> : null}</div>
            <div className={checked ? 'task-done' : ''}>
                <h2>{task.title}</h2>
                <p>{task.info}</p>
            </div>
            <span className='task-date'>{task.date}</span>
            <span className='delete-task' onClick={deleteTaskHandler}><AiOutlineClose /></span>
        </div>
    );
};

export default Task;