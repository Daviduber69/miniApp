import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";


const Login: React.FC = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [successfulLogin, setSuccessfulLogin] = useState<boolean>();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingText, setLoadingText] = useState<string>("");
    const navigate = useNavigate();
    const handleGoBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSuccessfulLogin(false);
        setUsername("");
        setPassword("");
    }

    const handleLoginText = () => {
      let dots = 0;
      const maxDots = 3;
        const interval = setInterval(() => {
            dots = (dots + 1) % (maxDots + 1);
        setLoadingText("LOADING"+ ".".repeat(dots))
            if(dots === maxDots){
                clearInterval(interval);
            }
      },600)



    }
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        handleLoginText();

        fetch(`${import.meta.env.VITE_API_URL}/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            credentials: 'include'
            })

            .then(response => {
                if (response.ok) {

                return response.json();
                }
                else{
                    return Promise.reject("LOGIN FAILED!!!");
                }
                })
            .then(data => {
                setTimeout(() => {
                        setLoading(false);
                        setSuccessfulLogin(true);
                        setLoadingText("");
                        navigate('/customers');
                        console.log("Login successful:", data);
                    },2000
                );
            })

         .catch (error => {
             setError("There was an error, sir.");
             setLoading(false);
             setSuccessfulLogin(false);
             console.error("Login error:", error);

         });
    }



    return (

        <form className="login" onSubmit={handleLogin}>
            {successfulLogin && (

                <div className="loginScreen">

                   <h1 style={{color: 'green'}}> DU LOGGADE IN! </h1>
                </div>

            )}
            {loading && (
                <h3 style={{color: 'green'}} >{loadingText}</h3>
            )}
            <br/>

            {!successfulLogin && (
                <>

                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />

                    <br/>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <br/>
                    <button type="submit">
                        Log in
                    </button>
                    <br/>
                    {!successfulLogin && (
                        <>{error}</>
                    )}


                    <br/>
                </>
            )}

            {successfulLogin && (

                <button type="submit" onClick={handleGoBack}> GO BACK</button>

            )}


        </form>

    );
};

export default Login;