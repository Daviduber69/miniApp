import { Link} from "react-router-dom";
//import Home from "./Home.tsx";
//import Login from "./loginForm.tsx";
//import Home from "./Home.tsx";
//import Login from "./loginForm.tsx";


export default function Nav(){
    return(

            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/loginForm.tsx">Login Page</Link></li>
                </ul>
            </nav>

    )
}
