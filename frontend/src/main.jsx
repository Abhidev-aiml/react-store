

import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route,RouterProvider,createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'


const router = createBrowserRouter(
  createRoutesFromElements(<Route path='/' element={<App/>}/>)
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>,
)
