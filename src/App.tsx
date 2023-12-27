import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ApplicationEdit from "./components/ApplicationEdit";
import NoMatch from "./components/NoMatch";
import { ApplicationContextProvider } from "./contexts/ApplicationContext";
import Login from "./components/Login";
import { UserContextProvider } from "./contexts/AuthContext";

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <ApplicationContextProvider>
        <Router>
          <Routes>
            <Route path="/">
              <Route index element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/applications/:id" element={<ApplicationEdit />} />
              <Route path="/not-found" element={<NoMatch />} />
            </Route>
          </Routes>
        </Router>
      </ApplicationContextProvider>
    </UserContextProvider>
  );
};

export default App;
