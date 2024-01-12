import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Construction, Home, Movie,Tv,Error,Loader } from "./pages";

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
    errorElement:<Error/>
   
  },{
    path:'/movie/:movieID',
    element:<Movie/>,
    errorElement:<Error/>
  },{
    path:'/tv/:seriesID',
    element: <Tv/>,
    errorElement:<Error/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Construction />
      {/* <RouterProvider router={router}/> */}
    </Provider>
  </React.StrictMode>,
)
