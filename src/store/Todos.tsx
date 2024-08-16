import { createContext, ReactNode, useContext, useState } from "react";

export type TodosProviderProps = {
  children: ReactNode
}

export type Todo = {
  id:string 
  task:string 
  completed: boolean
  createdAt: Date
}

export type TodosContext = {
  todos:Todo[]
  handleAddTodo: (task:string) => void;
  toggleTodoAsCompleted: (id:string)=> void;
  handleDeleteTodo: (id:string)=> void
}

export const todosContext =  createContext<TodosContext | null>(null)

export const TodosProvider = ({children}:TodosProviderProps) =>{

const [todos , setTodos] = useState<Todo[]>(()=>{
  try {
    const newTodos = localStorage.getItem("todos") || "[]" ;
    return JSON.parse (newTodos) as Todo[]
  }catch(error){
    console.error("Failed to parse todos from localStorage:", error);
    return []
  }
 
})

const handleAddTodo = (task:string) => {
  if (task.trim() === "") {
    // Optionally handle the case where the task is empty, e.g., show an error message.
    console.warn("Cannot add an empty task.");
    return;
  }
setTodos((prev)=>{
  const newTodos:Todo[] = [
    {
      id: Math.random().toString(),   
      task: task,
      completed:false,
      createdAt: new Date()
    },
    ...prev
  ]
 localStorage.setItem("todos", JSON.stringify(newTodos))

  return newTodos
})
}

// toggle completed

const toggleTodoAsCompleted = (id:string) =>{
  setTodos((prev)=>{
    let newTodos = prev.map((todo)=>{
      if(todo.id === id){
        return{...todo , completed:!todo.completed}
      }
      return todo;
    })
    return newTodos
  })
}
const handleDeleteTodo = (id:string)=>{
  setTodos((prev)=>{
    let newTodos = prev.filter((filterTodo)=> filterTodo.id !== id);
 localStorage.setItem("todos", JSON.stringify(newTodos))

    return newTodos;
  })

}

return <todosContext.Provider value={{todos , handleAddTodo , toggleTodoAsCompleted , handleDeleteTodo}}>
  {children}
</todosContext.Provider>
}

// consumer

export const useTodos = () =>{
  const todosConsumer = useContext(todosContext)
  if(!todosConsumer){
    throw new Error ("useTodos used outside of provider")
  }
  return todosConsumer
}