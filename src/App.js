import React, {useState} from 'react'
import './App.css';
/*import Laskuri from './laskuri'*/
import CustomerList from './CustomerList'
import Kello from './Kello'
import Message from './Message'
import LoginList from './LoginList'
import ProductList from './ProductList'
import EmployeeList from './EmployeeList'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {

// const [luku, setLuku] = useState(0)
const [clock, setClock] = useState(false)



/*setTimeout(() => {
  setLuku(luku + 1)
}, 1000
)*/

  return (
    <div className="App">
      <header className="App-header">
        <h1 onClick={() => setClock(!clock)} style={{ cursor: 'pointer'}} >Northwind 2021</h1>   {/*lisätty: style={{ cursor: 'pointer'}} , postettu <marquee> */}
      </header>

<Router>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Link to={'/Customers'} className="nav-link">Customers</Link>
      <Link to={'/Logins'} className="nav-link">Logins</Link>
      <Link to={'/Products'} className="nav-link">Products</Link>
      <Link to={'/Employees'} className="nav-link">Employees</Link>
    </Nav>
  </Navbar>
  
  <Switch>
    <Route path='/Customers' component={CustomerList} />
    <Route path='/Logins' component={LoginList} />
    <Route path='/Products' component={ProductList} />
    <Route path='/Employees' component={EmployeeList} />
  </Switch>
</Router>
        
      
        {clock && <Kello koko={350} />}

    

    </div>
  );
}

export default App;
