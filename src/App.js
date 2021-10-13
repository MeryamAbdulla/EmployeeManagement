import './App.css';
import {Home} from './components/Home';
import { Department } from './components/Departments';
import { Employee } from './components/Employee';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
      <h3 className="m-3 d-flex justify-content-center">
        Employee Management Portal
      </h3>
      <Navigation/>
      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/department' component={Department}/>
        <Route path='/employee' component={Employee}/>
      </Switch>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
