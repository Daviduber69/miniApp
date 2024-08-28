import React /*{useState}*/ from "react";
import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";


//const [customers, setCustomers] = useState<string>("");
  //  const [error, setError] = useState<string>("");
 //   const [loading, setLoading] = useState<boolean>(false);



const Customer: React.FC = () => {
    const navigate = useNavigate();
    const {data, error, isLoading} = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/customer`, {credentials: 'include'});
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong, sir!');
            }
        }
    });

    if(isLoading) return <h2>LOADING...</h2>
    if(error) return <p>{error.message}</p>

function handleClick(customerId: number){
    navigate(`/customerInfo/${customerId}`);
};


return(
    <>
        <h1>CUSTOMER SUPPORT HELLO HOW CAN I HELP YOU</h1>
        <ul>
            {data?.customers.map((customer: any) => (
                <button onClick={() => handleClick(customer.id)} key={customer.id}>{customer.firstName}</button>
            ))}
        </ul>
    </>
)


}
export default Customer;