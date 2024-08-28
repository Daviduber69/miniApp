import './App.css'
import Login from './loginForm.tsx';
//import MyComponent from'./APIComponent.tsx';
import Nav from "./Navigation.tsx";
//import Home from "./Home.tsx";
import Customer from "./Customers.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerInfo from "./CustomerInfo.tsx";
import {useEffect, useState} from "react";

const App: React.FC = () => {
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    async function verifyFn() {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/auth/verify`, {credentials: 'include'});
        if (response.ok) {
            console.log("IS OKAY!!!!")
            return response.json();
        } else {
            console.log("IS NOT OKAY!!!!")
            throw new Error('Something went wrong, sir!');
        }
    }
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                await verifyFn();
                setIsLoggedIn(true);
            } catch {
                setIsLoggedIn(false);
            } finally {
                setIsAuthLoading(false);
            }
        };

        verifyAuth();
    }, []);

    if (isAuthLoading) {
        return <h2>Loading...</h2>;
    }


    //<Route path="/loginForm.tsx" element={<Login />} />

    return (
        <>
            <Router>
                {isLoggedIn ? (
                    <>

                        <Nav />
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/customers" element={<Customer />} />
                            <Route path="/customerInfo/:id" element={<CustomerInfo />} />

                        </Routes>
                    </>
                ) : (
                    <Routes>
                        <Route path="*" element={<Login />} />
                    </Routes>
                )}
            </Router>

        </>
    )
}

export default App