import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Construction, Home, Movie,Tv } from "./pages";

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
   
  },{
    path:'/movie/:movieID',
    element:<Movie/>
  },{
    path:'/tv/:seriesID',
    element: <Tv/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <Construction /> */}
      <RouterProvider router={router}/>

    </Provider>
  </React.StrictMode>,
)
