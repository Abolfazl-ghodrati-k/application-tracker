import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ApplicationEdit from "./components/ApplicationEdit";
import NoMatch from "./components/NoMatch";
import { ApplicationContextProvider } from "./contexts/ApplicationContext";

const App: React.FC = () => {
  return (
    <ApplicationContextProvider>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/applications/:id" element={<ApplicationEdit />} />
            <Route path="/not-found" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ApplicationContextProvider>
  );
};

export default App;
