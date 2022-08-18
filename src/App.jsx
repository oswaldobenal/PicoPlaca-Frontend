import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CreateRestriction from "./components/NewRestriction";
import { EditHorario } from "./components/EditHorario";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateRestriction />} />
        <Route path="/edit/:id" element={<EditHorario />} />
      </Routes>
    </div>
  );
}

export default App;
