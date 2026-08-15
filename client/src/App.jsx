import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";


function App() {

   const token = localStorage.getItem("token");

  return token ? <Dashboard /> : <Login />;



 
}

export default App;
