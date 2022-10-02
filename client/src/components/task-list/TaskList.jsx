import { Fragment, useEffect, useMemo, useReducer, useState } from 'react';
import { useParams } from 'react-router';

import { GetTasks } from '../../api/TaskRquests';
import { TaskReducer } from '../../reducer/TaskReducer';
import NewTask from './new-task/NewTask';
import Pagination from './pagination/Pagination';

import './task-list.scss';
import Task from './task/Task';

const TaskList = () => {

    const [tasksState,dispatchTasks] = useReducer(TaskReducer,{ tasks: [], done: 0 });
    const tasksDone = useMemo( ()=> doneCounter(tasksState.done),[tasksState.done]);
    const [newTaskModal,setNewTaskModal] = useState(false);
    const params = useParams();
    
    useEffect(()=>{
        const fetchTasks = async () =>{
            const result = await GetTasks(params.page);
            dispatchTasks({type: 'GET_TASKS',payload: result});
        }
        fetchTasks();
    },[params.page,tasksDone]);

    function doneCounter(tasks){
        let done = 0;
        for(let i = 0; i < tasks.length; i++)
            if( tasks[i].check ) done++;
        return done;
    }

    return (
        <Fragment>
            <h1 className='task-list-title'>Task List</h1>
            <div className='task-control-panel'>
                <div>Total Tasks: {tasksState.tasks.length}</div>
                <div>Tasks Done: {tasksState.done}</div>
                <div>Tasks Undone: {tasksState.tasks.length - tasksState.done}</div>
                <span onClick={()=>setNewTaskModal(true)}>New Task</span>
            </div>
            <section className='task-list-container'>
                {tasksState.tasks.map( (task,index)=> {return <Task task={task} key={`task`+task.title+index} dispatchTasks={dispatchTasks}/>})}
                {tasksState.tasks.length === 0 && <h1 className='empty-list'>No Tasks in this page.</h1>}
            </section>
            {newTaskModal && <NewTask setNewTaskModal={setNewTaskModal} dispatchTasks={dispatchTasks}/>}
            <Pagination taskAmount={tasksState.tasks.length}/>
        </Fragment>
    );
};

export default TaskList;