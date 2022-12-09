import {
  createBrowserRouter,
  RouterProvider,
  } from "react-router-dom";
import { redirect } from "react-router-dom";


import { Layout } from "./Components/Layout";
import Home from "./Routes/Home";
import Login from "./Routes/Login";


function App() {

  const appRouter = createBrowserRouter([   
    {
      path: '', 
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Home/>
        },
        {
          path: '*',
          loader: () => redirect('')
        },
        {
          path: 'login',
          element: <Login/>          
        }       
      ]
    }    
  ])

  return (    
    <RouterProvider router={appRouter} />
  );
}

export default App;
