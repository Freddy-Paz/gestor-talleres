import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Alumnos from './Pages/Alumnos';
import Talleres from './Pages/talleres';
import Inscripciones from './Pages/Inscripciones';
import Pagos from './Pages/Pagos';

// Puedes agregar también Talleres, Asistencia, Pagos...

function App() {
  return (

    <Routes>
      <Route path="/" element={<Navigate to="/alumnos" />} />
      <Route path="/alumnos/*" element={<Alumnos />} />
      <Route path="/talleres/*" element={<Talleres />} />
      <Route path="/inscripciones/*" element={<Inscripciones />} />
      <Route path="/pagos/*" element={<Pagos />} />
    </Routes>
   
  );
}

export default App;
