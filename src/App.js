import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Root} from "./Pages/Root/Root";
import {Homepage} from "./Pages/Homepage/Homepage";
import Properties from "./Pages/Properties/Properties";
import SingleProperty from "./Pages/SingleProperty/SingleProperty";

function App() {
    const router = createBrowserRouter([
        {
            path:'/',
            element: <Root />,
            children:[
                {index: true, element: <Homepage/>},
                {path: '/properties', element: <Properties />},
                {path: '/property/:mlsNumber', element: <SingleProperty />}
            ]
        }
    ])
  return (
    <>
      <RouterProvider router={ router } />
    </>
  );
}

export default App;
