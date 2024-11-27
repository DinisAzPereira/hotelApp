import { useState, useEffect } from "react";
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

type Hotel = {
  id: string;
  name: string;
  description: string;
  location: string;
  countryId: string;
  cancellationPolicyId: string;
};

export const Hoteis = () => {
  // State para armazenar a lista de hotéis
  const [hoteis, setHoteis] = useState<Hotel[]>([]);

  // UseEffect para buscar hotéis ao carregar a página
  useEffect(() => {
    getHoteis();
  }, []);

  // Função para buscar a lista de hotéis da API
  async function getHoteis() {
    await fetch("https://api-tma-2024-production.up.railway.app/hotels", {
      method: "GET",
    })
      .then(async (response) => {
        return await response.json();
      })
      .then((data) => {
        console.log(data);
        // Atualiza o state com os hotéis recebidos
        setHoteis(data.hotels);
      });
  }

  return (
    <div>
      <h1>Bem-vindo à página de Hotéis</h1>
      <p>Aqui você pode encontrar os melhores hotéis disponíveis.</p>

      {/* Renderizando os hotéis em uma grid de 3 colunas */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 2,
        }}
      >
        {hoteis.map((hotel) => (
          <Card
            key={hotel.id}
            variant="outlined"
            sx={{
              padding: 2,
              borderRadius: "12px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              <Typography level="h4" component="h2" mb={1}>
                {hotel.name}
              </Typography>
              <Typography level="body1" mb={1}>
                {hotel.description}
              </Typography>
              <Typography level="body2" mb={1}>
                <strong>Localização:</strong> {hotel.location}
              </Typography>
          
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};
