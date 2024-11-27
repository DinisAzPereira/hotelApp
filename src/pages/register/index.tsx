import { useState, useEffect } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importa estilos básicos do Toastify
import styles from "./styles.modules.css";

type Country = {
  id: string;
  name: string;
};

export function Register() {
  const [countrys, setCountrys] = useState<Country[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [country_id, setCountryID] = useState("");
  const [terms, setTerms] = useState(false);

  useEffect(() => {
    // Carrega os países quando o componente é montado
    getCountrys();
  }, []);

  async function getCountrys() {
    // definir o url onde a info se encontra disponivel
    await fetch("https://api-tma-2024-production.up.railway.app/countries", {
      method: "GET",
    })
      .then(async (response) => {
        return await response.json();
      })
      .then((data) => {
        console.log(data);

        // conceito da imutabilidade
        // NUNCA alterar o valor diretamente
        // apenas quero atribuir um NOVO valor
        setCountrys(data.countries);
      });
  }

  async function register(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const requestBody = {
        name: name,
        email: email,
        password: password,
        birth_date: birth_date,
        country_id: country_id,
        terms: terms,
      };

      const response = await fetch(
        "https://api-tma-2024-production.up.railway.app/sign-up",
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
        console.log("jsonResponse: ", jsonResponse);

        // Exibe o toast de sucesso
        toast.success(" Registo efetuado com sucesso!", {
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

        console.log("Registo efetuado com sucesso");
      } else if (response.status === 409) {
        const jsonResponse = await response.json();
        console.error("Erro: o email já está registrado.");
        toast.error("O Email já está registado", {
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
      } else if (response.status === 400) {
        const errorData = await response.json();
        console.error("Erro de validação:", errorData);
        toast.error("Erro de validação de dados", {
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
        console.log("jsonResponse: ", jsonResponse);
      }
    } catch (error) {
      console.error("Erro ao tentar registrar:", error);
      toast.error("Erro ao tentar registrar", {
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

  return (
    <div>
      <form onSubmit={register}>
        <h2>Register</h2>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            name="name"
            placeholder="Enter your name (at least 3 characters)"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div>
          <label htmlFor="birth_date">Birth Date</label>
          <input
            type="text"
            id="birth_date"
            value={birth_date}
            name="birth_date"
            placeholder="YYYY-MM-DD"
            onChange={(e) => setBirth_date(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <select
            id="country"
            value={country_id}
            onChange={(e) => setCountryID(e.target.value)}
          >
            <option value="">Select your country</option>
            {countrys.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="terms">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />{" "}
            I accept the terms and conditions
          </label>
        </div>
        <button type="submit">Register</button>
      </form>

      {/* Adiciona o ToastContainer ao final do componente */}
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
  );
}
