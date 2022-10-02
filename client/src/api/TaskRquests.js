
const server = 'http://localhost:8000';

async function AddNewTask(task)
{
    const result = await fetch(`${server}/task`,{
        method: 'POST',
        headers:  { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    });
    return await result.json();
}

async function GetTasks(page)
{
    const result = await fetch(`${server}/tasks/${page}`,{method: 'GET'});
    return await result.json();
}

async function UpdateTask(check)
{
    const result = await fetch(`${server}/task`,{
        method: 'PATCH',
        headers:  { 'Content-Type': 'application/json' },
        body: JSON.stringify(check)
    });
    return await result.json();
}

async  function DeleteTask(id)
{
    const result = await fetch(`${server}/tasks`,{
        method: 'DELETE',
        headers:  { 'Content-Type': 'application/json' },
        body: JSON.stringify(id)
    });
    return await result.json();
}

async function SearchTask(taskName)
{
    const result = await fetch(`${server}/task/${taskName}`,{method: 'GET'});
    return await result.json();
}

module.exports = {AddNewTask,GetTasks,UpdateTask,DeleteTask,SearchTask};