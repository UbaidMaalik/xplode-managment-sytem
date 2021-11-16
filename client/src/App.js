import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AddStudent from "./components/AddStudent";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <div className="App" style={{ backgroundColor: "#eee" }}>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>

          <Layout>
            <Route exact path="/pagetwo">
              <Dashboard />
            </Route>
            <Route exact path="/addstudent">
              <AddStudent />
            </Route>
          </Layout>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
