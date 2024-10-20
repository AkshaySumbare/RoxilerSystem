import "./App.css";
import { Header } from "./components/Header";
import { MonthWiseData } from "./pages/MonthWiseData";
import { TransctionsBarChart } from "./pages/TransctionsBarChart";
import { TransctionsTable } from "./pages/TransctionsTable";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<TransctionsTable />} />
          <Route path="/monthwisedata" element={<MonthWiseData />} />
          <Route path="/barchart" element={<TransctionsBarChart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
