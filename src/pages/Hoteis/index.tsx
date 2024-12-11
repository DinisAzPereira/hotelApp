import { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import {  CircularProgress } from "@mui/material";
import {  useNavigate } from "react-router-dom";

type Amenitie = {
  id: string;
  name: string;
};

type Review = {
  id: string;
  bookingId: string;
  rating: number;
  comment: string;
  createdAt: string;
  booking: {
    user: {
      name: string;
      country: {
        name: string;
      };
    };
  };
};

type Room = {
  id: string;
  type: string;
  price: number;
  images: { id: string; url: string; roomId: string }[];
};

export type Hotel = {
  id: string;
  name: string;
  description: string;
  location: string;
  country: { id: string; name: string };
    cancellationPolicy: {
      id: string;
      name: string;
      deadline: number;
      fee: number;
    };
  rooms: Room[];
  amenities: Amenitie[];
  reviews: Review[];
  averageRating: number;
};



export const Hoteis = () => {

  const [hoteis, setHoteis] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch da lista de hotéis ao carregar a página
  useEffect(() => {
    getHoteis();
  }, []);

  const getHoteis = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://api-tma-2024-production.up.railway.app/hotels"
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar hotéis. Tente novamente.");
      }
      const data = await response.json();
      setHoteis(data.hotels);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  };


  const navigate = useNavigate();
  // Função para abrir a pagina e buscar os detalhes do hotel
  const handleOpen = (id: string) => {
    navigate(`/hoteis/${id}`);
  };


  return (
    <div>
      <h1>Bem-vindo à página de Hotéis</h1>
      <p>Aqui pode encontrar os melhores hotéis disponíveis.</p>

      {/* Exibição de loading */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Exibição de erro */}
      {error && (
        <Typography textAlign="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {/* Lista de hotéis */}
      {!loading && !error && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 2,
          }}
        >
          {hoteis.map((hotel) => (
            <Card
              onClick={() => handleOpen(hotel.id)} 
              key={hotel.id}
              variant="outlined"
              sx={{
                padding: 2,
                borderRadius: "12px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              }}
            >
              <CardContent>
                <Typography level="h4" component="h2" mb={1}>
                  {hotel.name}
                </Typography>
                <Typography mb={1}>{hotel.description}</Typography>
                <Typography mb={1}>
                  <strong>Localização:</strong> {hotel.location}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      
     
    </div>
  );
};
