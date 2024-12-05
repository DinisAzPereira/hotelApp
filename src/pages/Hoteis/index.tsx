import { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Modal from "@mui/material/Modal";
import { Button, CircularProgress } from "@mui/material";

type Room = {
  id: string;
  hotelId: string;
  type: string;
  price: number;
  bookings: {
    id: string;
    userId: string;
    roomId: string;
    checkIn: string;
    checkOut: string;
    reviews: {
      id: string;
      bookingId: string;
      rating: number;
      comment: string;
      createdAt: string;
    }[];
  }[];
};

type Hotel = {
  id: string;
  name: string;
  description: string;
  location: string;
  countryId: string;
  cancellationPolicy: {
    id: string;
    name: string;
    deadline: string;
    fee: string;
  };
  rooms: Room[];
};

export const Hoteis = () => {
  const [open, setOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
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

  // Função para buscar os detalhes de um hotel específico
  const getHotelDetails = async (hotelId: string) => {
    setError(null);
    try {
      const response = await fetch(
        `https://api-tma-2024-production.up.railway.app/hotels/${hotelId}`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar detalhes do hotel. Tente novamente.");
      }
      const data = await response.json();
      setSelectedHotel(data); // Atualizar o estado com os detalhes do hotel
    } catch (err: any) {
      setError(err.message || "Erro desconhecido.");
    } finally {
      setOpen(true); // Abrir o modal após buscar os detalhes
    }
  };

  // Função para abrir o modal e buscar os detalhes do hotel
  const handleOpen = (hotelId: string) => {
    getHotelDetails(hotelId);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedHotel(null);
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
        <Typography color="error" textAlign="center" sx={{ mt: 2 }}>
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
              onClick={() => handleOpen(hotel.id)} // Passa apenas o id do hotel para buscar os detalhes
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

      {/* Modal para exibir detalhes do hotel */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 500,
            bgcolor: "black",
            boxShadow: 24,
            p: 4,
            borderRadius: "12px",
          }}
        >
          <Typography id="modal-modal-title" color="white" component="h2">
            Detalhes do Hotel
          </Typography>
          {selectedHotel ? (
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, color: "white" }}
            >
              <strong>Nome:</strong> {selectedHotel.name}
              <br />
              <strong>Política de Cancelamento:</strong>{" "}
              {selectedHotel.cancellationPolicy?.name || "Informação indisponível"}
              <br />
              <strong>Localização:</strong> {selectedHotel.location}
              <br />
              <strong>Descrição:</strong> {selectedHotel.description}
              <br />
            </Typography>
          ) : (
            <Typography sx={{ mt: 2, color: "white" }}>
              Carregando informações...
            </Typography>
          )}
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              mt: 2,
              display: "block",
              marginLeft: "auto",
              backgroundColor: "white",
              color: "black",
            }}
          >
            Fechar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
