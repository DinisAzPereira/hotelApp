import { Box, CircularProgress, Typography,  Card, CardContent } from '@mui/joy';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Hotel } from '../Hoteis';
import { Bounce, toast } from 'react-toastify';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import Button from '@mui/material/Button';

export const HotelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Vai buscar o ID que tem no URL
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roomId, setRoomId] = useState("");
  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs('2022-04-17'));




  useEffect(() => {
    const fetchHotelDetails = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch(
          `https://api-tma-2024-production.up.railway.app/hotels/${id}`
        );
        if (!response.ok) {
          throw new Error('Erro ao buscar detalhes do hotel. Tente novamente.');
        }
        const data = await response.json();
        setHotel(data.hotel); // Atualiza o estado com os detalhes do hotel
      } catch (err: any) {
        setError(err.message || 'Erro desconhecido.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  async function makeReservation(){

    try{

      const requestBody = {
        roomId: roomId,
        startDate: startDate,
        endDate: endDate,

      };
      const response = await fetch(
        "https://api-tma-2024-production.up.railway.app/booking",
        {
          method: "POST",
          headers:{
            "Content-Type" : "application/json"
          },
            body: JSON.stringify(requestBody),
            }
          );
            console.log("Response headers:", response.headers);

            if(response.status === 201) {

              const jsonResponse = await response.json;
              console.log("jsonResponse:", jsonResponse);
              toast.success("Reserva efetuada com sucesso!", {
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
              console.log("Reserva efetuado com sucesso rei");
            } else if (response.status === 400){
              const data = await response.json(); 
              console.error(response.json);
              
              toast.error(data.massage, {
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

              console.error("Erro inesperado", response);
              toast.error("Erro inesperado ao processar a reserva", {
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
          }catch (error) {
            console.error("Erro ao tentar fazer a reserva:", error);
            toast.error("Erro ao tentar fazer a reserva", {
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
    <Box sx={{ padding: 4 }}>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography color="error" textAlign="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {hotel && (
        <>
          <Typography level="h1">{hotel.name}</Typography>
      
          <Grid container spacing={2}>

          <Typography sx={{ mt: 4 }} variant="h5">
            Comodidades
          </Typography>



         {hotel.amenities.map((Amenitie) => (
    <Grid item xs={12} sm={6} md={4} key={Amenitie.id}>
      <Card variant="outlined" sx={{ padding: 2, borderRadius: '12px' }}>
        <CardContent>
          <Typography>{Amenitie.name}</Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

          {/* Exibição dos quartos */}
          <Typography sx={{ mt: 4 }} variant="h5">
            Quartos disponíveis
          </Typography>
          <Grid container spacing={2}>
            {hotel.rooms.map((room) => (
              <Grid item xs={12} sm={6} key={room.id}>
                <Card variant="outlined" sx={{ padding: 2, borderRadius: '12px' }}>
                  <CardContent>
                    <Typography variant="h6">{room.type}</Typography>
                    <Typography>
                      <strong>Preço:</strong> ${room.price} por noite
                    </Typography>
                    <Grid container spacing={1}>
                      {room.images.map((image) => (
                        <Grid item xs={6} sm={4} key={image.id}>
                          <img src={image.url} alt={room.type} width="100%" style={{ borderRadius: '8px' }} />
                        </Grid>
                      ))}
                    </Grid>
                    <h6>Fazer Reserva</h6>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateField', 'DateField']}>
                  <DateField
                      label="Inicio"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                    />
                    <DateField
                      label="Fim"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <Button variant="contained" onClick={makeReservation}>Fazer Reserva</Button>

                        
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography sx={{ mt: 4 }} variant="h5">
            Reviews
          </Typography>
          <Grid container spacing={2}>
            {hotel.reviews.map((Review) => (
              <Grid item xs={12} sm={6} key={Review.id}>
                <Card variant="outlined" sx={{ padding: 2, borderRadius: '12px' }}>
                  <CardContent>
                   
                    <Typography variant="h6">{Review.booking.user.name} do País de {Review.booking.user.country.name} </Typography>
                    <Typography>
                      <strong>Comentario</strong> {Review.comment} por noite
                    </Typography>
                   
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
        </>

        
      )}

            
    </Box>
  );
};

export default HotelDetails;
