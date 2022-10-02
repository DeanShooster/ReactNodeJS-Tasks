
export function TaskReducer(state,action)
{
    switch(action.type){
        case 'GET_TASKS':{
            const tasks = action.payload;
            const done = checkCounter(tasks);
            return { tasks , done };
        }
        case 'NEW_TASK':{
            const tasks = state.tasks;
            const done = checkCounter(tasks);
            return {...state,tasks,done };
        }
        case 'SEARCH_TASK':{
            const tasks = [];
            if(action.payload) tasks.push(action.payload);
            const done = checkCounter(tasks);
            return {...state,tasks,done };
        }
        case 'UPDATE_TASK':{
            const tasks = state.tasks;
            for(let i = 0; i < tasks.length; i++)
                if(tasks[i]._id === action.payload._id )
                    tasks[i].check = !tasks[i].check;
            const done = checkCounter(tasks);
            return {...state,tasks,done };
        }
        case 'DELETE_TASK':{
            const tasks = state.tasks;
            tasks.splice(tasks.indexOf(action.payload._id),1);
            const done = checkCounter(tasks);
            return {...state,tasks,done };
        }
        default: { return state; }
    }
}

function checkCounter(tasks)
{
    let done = 0;
    for(let i = 0; i < tasks.length; i++)
        if( tasks[i].check ) done++;
    return done;
}