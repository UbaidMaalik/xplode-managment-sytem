import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AddStudent from "./components/pages/students/AddStudent";
import Dashboard from "./components/Dashboard";
import { useEffect } from "react";
import { loadUser } from "./actions/auth";
import { Provider } from "react-redux";
import store from "./store";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import AddCourse from "./components/pages/course/AddCourse";
import Courses from "./components/pages/course/Courses";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Provider store={store}>
      <Router>
        <div className="App" style={{ backgroundColor: "#fff" }}>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>

            <Layout>
              <ProtectedRoute exact path="/dashboard" component={Dashboard} />
              <ProtectedRoute exact path="/addstudent" component={AddStudent} />
              <ProtectedRoute
                exact
                path="/courses/create"
                component={AddCourse}
              />
              <ProtectedRoute exact path="/managecourses" component={Courses} />
            </Layout>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
