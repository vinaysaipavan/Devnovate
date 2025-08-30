import { router } from './router'
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './reducers/store';
import { Toaster } from 'sonner';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <Provider store={store}>
      <Toaster position="top-right" richColors closeButton />
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App











// import React from 'react'
// import {router} from './router'
// import { RouterProvider } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './reducers/store';
// import { Toaster } from 'sonner';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";


// const App : React.FC = () => {
//   return (
//     <>
//     <Provider store={store}>
//       <Toaster position="top-right" richColors closeButton/>
//       <RouterProvider router={router}/>
//     </Provider>
//     </>
//   )
// }

// export default App

