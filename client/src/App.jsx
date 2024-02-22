import Home from './pages/Home';
import Admin from './pages/Admin';
import {  
  BrowserRouter as Router,  
  Routes,  
  Route,  
  Link  
}   
from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/admin" element = {<Admin/>}/>
      </Routes>
    </Router>
  )

}
export default App;