import logo from './logo.svg';
import './App.css';
import LoginRegister from './components/Login/Login';
import StudentDashboard from './components/Student/StudentDashboard';
import TeacherDashboard from './components/Teacher/TeacherDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';

function App() {
  /**      <LoginRegister/>      <StudentDashboard/>    <TeacherDashboard/>        */
  return (
    <div className="App">
   <AdminDashboard/> 
    </div>
  );
}
export default App;
