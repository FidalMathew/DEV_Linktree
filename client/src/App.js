import './App.css';
import Ruser from './Components/Ruser'
import Home from './Components/Home'
import Login from './Components/Login'
import Register from './Components/Register'
import Notfound from './Components/Notfound'
import { useContext } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Edit from './Components/Edit';
import { Context } from "./Context/Context";
function App() {

  const { user } = useContext(Context);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route exact path="/register" element={user ? <Home /> : <Register />}></Route>
          <Route exact path="/login" element={user ? <Home /> : <Login />}></Route>
          <Route exact path="/edit" element={user ? <Edit /> : <Login />}></Route>
          <Route exact path="/user/:uname" element={<Ruser />}></Route>
          <Route path="*" element={<Notfound />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
