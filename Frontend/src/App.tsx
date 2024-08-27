import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import GradeCalculator from "./components/gpaCal";
import Grades from "./components/grades";

function App() {

  return (
    // <div>
    //   <GradeCalculator></GradeCalculator>
    //   <Grades></Grades>
    // </div>
    <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/grades" element={<Grades />} />
      <Route path="/grade-calculator" element={<GradeCalculator />} />
    </Routes>
  </Router>
  );
}

export default App;
