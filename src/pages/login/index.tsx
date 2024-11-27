import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

export function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function login(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Evita o refresh da página

       
        try {
            const requestBody = {
                email: email,
                password: password,
               
            };


            const response = await fetch(
                "https://api-tma-2024-production.up.railway.app/sign-in",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            if (response.status === 201) {
                const jsonResponse = await response.json();
                console.log("jsonResponse: ", jsonResponse);
                toast.success("Login efetuado com sucesso", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }  else if (response.status === 400 ) {
                const errorData = await response.json();
                console.error("Credenciais erradas:", errorData);
                toast.error("Credenciais erradas", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                
            } else {
                const jsonResponse = await response.json();
                console.log("jsonResponse: ", jsonResponse);
            }
        } catch (error) {
            console.error("Algo de errado não esta certo", error);
            toast.success("", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }

   
    return(



        <form onSubmit={login}>

        <div>
        <h1>Ola Login</h1>
        <div>
        <label htmlFor="email">Email</label>
        <input
            type="email"
            id="email"
            value={email}
            name="email"
            placeholder="Enter a valid email"
            onChange={(e) => setEmail(e.target.value)}
        />
    </div>
    <div>
        <label htmlFor="password">Password</label>
        <input
            type="password"
            id="password"
            value={password}
            name="password"
            placeholder="Enter your password (at least 6 characters)"
            onChange={(e) => setPassword(e.target.value)}
        />
    </div>
    <button type="submit">Login</button>
    <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />

    </div>
    </form>

    
    

    )
}