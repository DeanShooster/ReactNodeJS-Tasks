import { Fragment, useState } from 'react';

import './new-task.scss';
import {AiOutlineClose} from 'react-icons/ai';

import { AddNewTask } from '../../../api/TaskRquests';

const NewTask = ( {setNewTaskModal,dispatchTasks} ) => {

    const [errorMsg,setErrorMsg] = useState(null);

    const submitTaskHandler = async (event) =>{
        event.preventDefault();
        const task = {
            title: event.target[0].value,
            info: event.target[1].value,
            check : false,
            date: new Date().toISOString()
        };
        if(task.title === '' || task.info === ''){
            setErrorMsg('Missing information');
            return;
        }
        await AddNewTask(task);
        dispatchTasks({type: 'NEW_TASK', payload: task});
        setNewTaskModal(false);
    }

    return (
        <Fragment>
            <div className='wall'></div>
            <div className='new-task-container'>
                <AiOutlineClose className='close-form' onClick={()=>setNewTaskModal(false)}/>
                <h2>New Task Form</h2>
                <form onSubmit={submitTaskHandler}>
                    <input type='text' placeholder='Task Title'/>
                    <textarea placeholder='Task Information'/>
                    <button>Add New Task</button>
                </form>
                {errorMsg && <p className='error-msg'>{errorMsg}</p>}
            </div>
        </Fragment>
    );
};

export default NewTask;