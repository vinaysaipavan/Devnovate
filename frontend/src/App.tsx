import React from 'react'
import {router} from './router'
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './reducers/store';
import { Toaster } from 'sonner';

const App : React.FC = () => {
  return (
    <>
    <Provider store={store}>
      <Toaster position="top-right" richColors closeButton/>
      <RouterProvider router={router}/>
    </Provider>
    </>
  )
}

export default App

