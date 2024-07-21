import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbarbody from './components/Navbar/Navbar';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import DoctorCard from './components/DoctorCard/DoctorCard';
import PrivateComponent from './components/privateComponent';
import PDFList from './components/PdfList/PdfList';
import PatientDetails from './components/PatientCard/PatientCard';
import AddPatient from './components/AddPatient/AddPatient';
import PatientUndertaken from './components/PatientUndertaken.js/PatientUndertaken';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbarbody />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<DoctorCard />} />
            <Route path='/pdflist' element={<PDFList />} />
            <Route path='/patient' element={<PatientDetails />} />
            <Route path='/addpatient' element={<AddPatient />} />
            <Route path='/patientundertaken' element={<PatientUndertaken />} />

          </Route>

          
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
