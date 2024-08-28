import {useNavigate, useParams} from "react-router-dom";
import React from "react";
import {useQuery} from "@tanstack/react-query";

const CustomerInfo: React.FC = () =>{
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();


    const {data, error, isLoading} = useQuery({
        queryKey: ['customer'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/customer/${id}`, {credentials: 'include'});
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong, sir!');
            }
        }
    });

    if(isLoading) return <h2>LOADING...</h2>
    if(error) return <p>{error.message}</p>


function handleGoBack(){

    navigate('/customers');
}

    return (
        <>
            <h3>
                {data.firstName} {data.lastName} - {data.email} - {data.phoneNumber} <br />
                {data.personalIdentityNumber}

            </h3>
            <button onClick={handleGoBack}>GO BACK</button>
        </>
    )
}

export default CustomerInfo;