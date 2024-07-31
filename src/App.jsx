import Dash2 from "./pages/Dash";
import Dash from "./pages/Dash2"
import Login from "./pages/Login";
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Wlogin from "./pages/Wlogin"
import Wologin from "./pages/Wologin"
import Dash3 from "./pages/Dash3"
import Complaint1 from "./pages/Complaint1";
import Success from "./pages/Success";
import Datadis from "./pages/Datadis"
import Dd1 from "./pages/Dd1"
import Update2 from "./pages/Update2"
import Assign from "./pages/Assign"
import Dd3 from "./pages/Dd3"
import Wdatadis from "./pages/Wdatadis"
import Admin2 from "./pages/Admin2";
import Adminlog from "./pages/Adminlog";
import Logf2 from "./pages/Logf2";
import Logfw2 from "./pages/Logfw2"
import Logfwo2 from "./pages/Logfwo2";
import Dels2 from "./pages/Dels2"
import Sucf2 from "./pages/Sucf2";
const router=createBrowserRouter([
    {
      path:"/",
      element:<Dash />,
    },
    {
      path:"/student/login",
      element:<Login />,
    },
    {
       path:"/warden/login",
       element:<Wlogin />
    },
    {
        path:"/worker/login",
        element:<Wologin />
    },
   {
      path:"/dash/student/:username",
      element:<Dash2 />
    },
    {
     path:"/dash/warden/:HostelName",
      element:<Dash3 />
    },
    {
      path:"/electrical/:username",
      element:<Complaint1 />
    },
    {
      path:"/success/:username",
      element:<Success />
    },
    {
      path:"/data-display/:username",
      element:<Datadis />
    },
    {
      path:"/dd1/:HostelName/:category",
      element:<Dd1 />,
    },
    {
      path:"/update/:id/:index/:HostelName/:category",
      element:<Update2 />,
    },
    {
      path:"/assign/:id/:index/:HostelName",
      element:<Assign />,
    },
    {
      path:"/dd3/:HostelName",
      element:<Dd3 />
    },
    {
        path:"/worker/:username/:category",
        element:<Wdatadis />
    },
    {
      path:"/admin",
      element:<Adminlog />
    },
    {
      path:"/admin2",
      element:<Admin2 /> 
    },{
      path:"/logf",
      element:<Logf2 />
    },{
      path:"/logfw",
      element:<Logfw2 />
    },
    {
      path:"/logfwo",
      element:<Logfwo2 />
    },{
      path:"/dels",
      element:<Dels2 />
    },{
      path:"/sucf2/Student",
      element:<Sucf2 />
    }
   /* 
    {
      path:"/general",
      element:<Complaint22 />
    },
    {
      path:"/update2/:HostelName",
      element:<Dash2 />
    },
    {
      path:"/cleaning",
      element:<Complaint3 />
    },
    {
      path:"/update/:id/:index",
      element:<Update2 />,
    },
    {
      path:"/dd3/:HostelName",
      element:<Dd3 />
    },
    {
      path:"/worker/:username/:category",
      element:<Wdatadis />*/
  ]);
  
  function App() {
    return (
       <RouterProvider router={router} />
    )
  }
  
  export default App
  
