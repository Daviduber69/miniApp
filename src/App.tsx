
import './App.css'
import Login from './loginForm.tsx';
//import MyComponent from'./APIComponent.tsx';
import Nav from "./Navigation.tsx";
import Home from "./Home.tsx";
import Customer from "./Customers.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerInfo from "./CustomerInfo.tsx";
const App: React.FC = () => {

  return (
      <>
          <Router>
              <Nav />
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/loginForm.tsx" element={<Login />} />
                  <Route path="/customers" element={<Customer />} />
                  <Route path="/customerInfo/:id" element={<CustomerInfo />} />

              </Routes>
          </Router>

      </>
  )
}

export default App
