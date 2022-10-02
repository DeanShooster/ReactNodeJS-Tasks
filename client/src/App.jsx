import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.scss';

import Header from './components/header/Header';
import TaskList from './components/task-list/TaskList';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/tasks/:page' element={<TaskList />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
