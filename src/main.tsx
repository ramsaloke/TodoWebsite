import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TodosProvider } from './store/Todos.tsx'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <TodosProvider>
    <App />
    </TodosProvider>
    </BrowserRouter>
  </StrictMode>,
)
