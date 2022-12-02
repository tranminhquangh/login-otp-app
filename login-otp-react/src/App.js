import Login from "./components/Login";
import LoginOtp from "./components/LoginOtp";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
          
           <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/loginotp/:phone">
            <LoginOtp />
          </Route>
        </Switch>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
