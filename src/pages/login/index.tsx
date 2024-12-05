import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

export function Login() {
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
                const token = jsonResponse.token; // Extrai o token retornado pelo login
                console.log("Token:", token);

                // Armazena o token no localStorage
                localStorage.setItem("token", token);

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

                // Faz a requisição para obter os dados do usuário autenticado
                await fetchUserProfile(token);
            } else if (response.status === 400) {
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
                console.error("Erro desconhecido");
            }
        } catch (error) {
            console.error("Algo deu errado:", error);
            toast.error("Erro ao realizar login", {
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

    async function fetchUserProfile(token: string) {
        try {
            const response = await fetch("https://api-tma-2024-production.up.railway.app/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`, // Usa o token JWT para autenticação
                },
            });

            if (response.ok) {
                const userData = await response.json();
                console.log("Dados do usuário autenticado:", userData);

                toast.success("Dados do perfil carregados com sucesso", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            } else if (response.status === 401) {
                console.error("Token inválido ou expirado");
                localStorage.removeItem("token"); // Remove o token inválido
                toast.error("Sessão expirada. Faça login novamente.", {
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
                console.error("Erro ao obter os dados do usuário");
            }
        } catch (error) {
            console.error("Erro na requisição do perfil:", error);
        }
    }

    return (
        <form onSubmit={login}>
            <div>
                <h1>Olá, Login</h1>
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
    );
}
