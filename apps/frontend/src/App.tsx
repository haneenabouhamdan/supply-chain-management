import { Outlet } from "react-router";
import { MainHelmet } from "./components/pages/MainHelmet";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <MainHelmet />
      <Outlet />
    </div>
  );
};

export default App;
