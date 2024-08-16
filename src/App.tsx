
import AddTodo from './components/AddTodo';
import Navbar from './components/Navbar';
import Todos from './components/Todos';
import './App.css';

const App = () =>{ 
 

  
  return (
   <main>
      <h1 className="text-6xl font-semibold text-indigo-600 mb-3">Your Daily Tasks</h1>
      <p className=" cursor-pointer dark:text-gray-600 text-xl mt-3 mb-3 font-semibold 
       hover:font-bold hover:text-[#1abc9c] transform hover:scale-110 transition-transform duration-300"> 
        Every task completed brings you one step closer to your goals—make today count!
      </p>
      <Navbar />
      <AddTodo />
      <Todos />
      </main>
  );
};

export default App;
