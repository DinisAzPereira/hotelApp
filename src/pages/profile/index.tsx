import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router-dom';

export function Profile() {

    function formatDate(DateC: string ) {
           const date = new Date(DateC) ;
           return date.toLocaleDateString();


    }
    
    type UserDetails = {

        
            id: string;
            birthDate: string;
            country: {
                id: string;
                name: string;

            }
            name: string
            email: string; 
          
     
};

const [error, setError] = useState<string | null>(null);
const [user, setUser] = useState<UserDetails | null>(null); 
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const updateEmail = async ( ) => {

        
    try{

        console.log({ email, password });
        console.log(`Bearer ${localStorage.getItem("token")}`);


     const response = await fetch(
         "https://api-tma-2024-production.up.railway.app/me/change-email" , {

         
             method: "PATCH",
             headers: {
                 "Content-Type": "application/json",
                 Authorization: `Bearer ${localStorage.getItem("token")}`
             },
             body: JSON.stringify({
                 email: email,
                 password: password,


             }),
         
         } );
     
    

     if (response.ok) {

        const data = await response.json();           
        console.log("Resposta da api" , data) // verificar o que a api responde consoante o request


     }

     } catch (error: any) {
         console.log("Erro no patch", error)

     } 
      
     
 };

useEffect(() => {



    const fetchUserDetails = async () => {
        setError(null);
      try {
        const response =  await fetch("https://api-tma-2024-production.up.railway.app/me", {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (response.ok) {

            
            const data = await response.json();
            console.log(data);
            setUser(data.user); //atualiza os dados do utilizador no estado
        }
     
      }  catch(err: any){
            console.error("Token inválido ou expirado");
            console.error()
            localStorage.removeItem("token");
            navigate("/login", { replace: true });

      }
   };

    

   fetchUserDetails();
}, []);





    


return (
    <div>
        <h1>Olá, Bem-vindo ao teu perfil</h1>
        {user ? (
            <>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Nome:</strong> {user.name}</p>
                    <p><strong>País:</strong> {user.country.name}</p>
                    <p><strong>Data de nascimento: </strong> {formatDate(user.birthDate)}</p>
            </>
        ) : (
            <p>A carregar os dados do perfil...</p>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <h1>Atualizar email do utilizador</h1>
        <input
        type='text'
        value={email}
        onChange={(e) =>setEmail(e.target.value)} //Atualiza o email no estado
        placeholder='Digite o email novo'
        >
       

      
        
        
        </input>
        <input
        type='text'
        value={password}
        onChange={(e) =>setPassword(e.target.value)} //Atualiza a password no estado
        placeholder='Digite a sua password '
        >
            
            </input>
        <Button onClick={updateEmail}> Enviar</Button>
    </div>
);
}
