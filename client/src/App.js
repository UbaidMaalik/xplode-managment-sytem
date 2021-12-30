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
import CourseGroup from "./components/pages/course/CourseGroup";
import BatchGroup from "./components/pages/batch/BatchGroup";
import ManageStudent from "./components/pages/students/ManageStudent";
import StudentPreview from "./components/pages/students/StudentPreview";
import UpdateForm from "./components/pages/students/UpdateForm";

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
              <ProtectedRoute
                exact
                path="/createstudent"
                component={AddStudent}
              />
              <ProtectedRoute
                exact
                path="/managestudent"
                component={ManageStudent}
              />
              <ProtectedRoute
                exact
                path="/courses/create"
                component={AddCourse}
              />
              <ProtectedRoute exact path="/managecourses" component={Courses} />
              <ProtectedRoute
                exact
                path="/coursegroup"
                component={CourseGroup}
              />
              <ProtectedRoute exact path="/batchgroup" component={BatchGroup} />
              <ProtectedRoute
                exact
                path="/students/:id/update"
                component={UpdateForm}
              />
            </Layout>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
