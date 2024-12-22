import { Card, CardContent, Typography } from '@mui/joy';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rating } from '@mui/material';
import { Bounce, toast } from 'react-toastify';

export function Profile() {

    function formatDate(DateC: string) {
        const date = new Date(DateC);
        return date.toLocaleDateString();
    }

    type Review = {
        bookingId: string;
        id: string;
        comment: string;
        createdAt: string;
        rating: number;
    };

    type Booking = {
        checkIn: string;
        checkOut: string;
        id: string;
        reviews: Review[];
        room: {
            id: string;
            type: string;
            price: number;
            hotel: {
                id: string;
                name: string;
                description: string;
                location: string;
                countryId: string;
            };
        };
    };

    type UserDetails = {
        id: string;
        birthDate: string;
        country: {
            id: string;
            name: string;
        };
        name: string;
        email: string;
        bookings: Booking[];
    };

    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<UserDetails | null>(null);
    const [bookings, setBookings] = useState<Booking[] | null>(null);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");
    const [bookingId, setBookingId] = useState("");
    const [editComment, setEditComment] = useState("");
    const [editRating, setEditRating] = useState("");
    const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function makeReview() {
        try {
            const requestBody = {
                rating: Number(rating),
                comment: comment,
                bookingId: bookingId,
            };
    
            console.log("A enviar pedido para criar review:", requestBody);
    
            const response = await fetch(
                "https://api-tma-2024-production.up.railway.app/review",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(requestBody),
                }
            );
    
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log("Resposta da API (criar review):", jsonResponse);
                toast.success("Review criada com sucesso!", {
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
    
                setComment("");
                setRating("");
            } else {
                const errorResponse = await response.json();
                console.error("Erro da API (criar review):", errorResponse);
                toast.error("Erro ao criar a review", {
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
        } catch (error) {
            console.error("Erro ao criar a review:", error);
            toast.error("Erro ao criar a review", {
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
    
    async function editReview(reviewId: string) {
        try {
            const requestBody = {
                rating: Number(editRating),
                comment: editComment,
            };
    
            console.log("A enviar pedido para editar review:", {
                reviewId,
                requestBody,
            });
    
            const response = await fetch(
                `https://api-tma-2024-production.up.railway.app/review/${reviewId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(requestBody),
                }
            );
    
            if (response.ok) {
                const updatedReview = await response.json();
                console.log("Resposta da API (editar review):", updatedReview);
                toast.success("Review editada com sucesso!", {
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
                const errorResponse = await response.json();
                console.error("Erro da API (editar review):", errorResponse);
                toast.error("Erro ao editar a review", {
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
        } catch (error) {
            console.error("Erro ao editar a review:", error);
            toast.error("Erro ao editar a review", {
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
    
    const updateEmail = async () => {
        try {
            const requestBody = {
                email: email,
                password: password,
            };
    
            console.log("A enviar pedido para atualizar email:", requestBody);
    
            const response = await fetch(
                "https://api-tma-2024-production.up.railway.app/me/change-email",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(requestBody),
                }
            );
    
            if (response.ok) {
                const data = await response.json();
                console.log("Resposta da API (atualizar email):", data);
                toast.success("Email atualizado com sucesso!", {
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
                const errorResponse = await response.json();
                console.error("Erro da API (atualizar email):", errorResponse);
                toast.error("Erro ao atualizar email", {
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
        } catch (error: any) {
            console.error("Erro ao atualizar o email:", error);
            toast.error("Erro ao atualizar o email", {
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
    };

    async function deleteReview(reviewId: string) {
        try {
            console.log(`A enviar pedido para apagar item com ID: ${reviewId}`);
            console.log("Token usado:", localStorage.getItem("token"));
            const response = await fetch(`https://api-tma-2024-production.up.railway.app/review/${reviewId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
    
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log("Resposta da API (delete):", jsonResponse);
                toast.success("Item apagado com sucesso!", {
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
                const errorResponse = await response.json();
                console.error("Erro da API (delete):", errorResponse);
                toast.error("Erro ao apagar o item.", {
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
        } catch (error) {
            console.error("Erro ao apagar o item:", error);
            toast.error("Erro ao apagar o item.", {
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
    
    

    useEffect(() => {
        const fetchUserDetails = async () => {
            setError(null);
            try {
                const response = await fetch(
                    "https://api-tma-2024-production.up.railway.app/me",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                    setBookings(data.bookings);
                }
            } catch (err: any) {
                localStorage.removeItem("token");
                navigate("/login", { replace: true });
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div>
            <h1>Bem-vindo ao seu perfil</h1>
            {user ? (
                <>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Nome:</strong> {user.name}</p>
                    <p><strong>País:</strong> {user.country.name}</p>
                    <p><strong>Data de nascimento:</strong> {formatDate(user.birthDate)}</p>
                </>
            ) : (
                <p>A carregar os dados do perfil...</p>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <h1>Atualizar Email</h1>
            <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Digite o novo email'
            />
            <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Digite a sua palavra-passe'
            />
            <Button onClick={updateEmail}>Guardar Alterações</Button>

            <h1>Reservas</h1>
            {bookings?.length > 0 ? (
                bookings.map((booking) => (
                    <Grid item xs={12} sm={6} md={4} key={booking.id}>
                        <Card variant="outlined" sx={{ padding: 2, borderRadius: '12px' }}>
                            <CardContent>
                                <Typography>
                                    <strong>Check-in:</strong> {formatDate(booking.checkIn)}
                                </Typography>
                                <Typography>
                                    <strong>Check-out:</strong> {formatDate(booking.checkOut)}
                                </Typography>
                                <Typography>
                                    <strong>Tipo de Quarto:</strong> {booking.room.type}
                                </Typography>
                                <Typography>
                                    <strong>Preço:</strong> ${booking.room.price} por noite
                                </Typography>
                                <Typography><strong>Reviews:</strong></Typography>
                                {booking.reviews.map((review) => (
                                    <Card variant="outlined" sx={{ padding: 2, borderRadius: '12px' }} key={review.id}>
                                        <CardContent>
                                            <Typography>
                                                <strong>Data:</strong> {formatDate(review.createdAt)}
                                            </Typography>
                                            <Rating
                                                name={`rating-${review.id}`}
                                                value={review.rating}
                                                readOnly
                                            />
                                            <Typography>
                                                <strong>Comentário:</strong> {review.comment}
                                            </Typography>
                                            <Button
                                                onClick={() => {
                                                    setEditingReviewId(review.id);
                                                    setEditComment(review.comment);
                                                    setEditRating(String(review.rating));
                                                }}
                                            >
                                                Editar Review
                                            </Button>

                                            <Button
                                                onClick={() => {
                                                    deleteReview(review.id);
                                                }}
                                            >
                                                Apagar Review
                                            </Button>
                                            {editingReviewId === review.id && (
                                                <div>
                                                    <Typography><strong>Editar Review:</strong></Typography>
                                                    <input
                                                        type="text"
                                                        value={editComment}
                                                        onChange={(e) => setEditComment(e.target.value)}
                                                        placeholder="Atualizar comentário"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={editRating}
                                                        onChange={(e) => setEditRating(e.target.value)}
                                                        placeholder="Atualizar avaliação (1-5)"
                                                    />
                                                    <Button
                                                        onClick={() => {
                                                            editReview(editingReviewId);
                                                        }}
                                                    >
                                                        Guardar Alterações
                                                    </Button>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}

                                <Typography><strong>Criar Review:</strong></Typography>
                                <input
                                    type="text"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Digite o comentário ( Tem de ter pelo menos 10 caracteres)"
                                />
                                <input
                                    type="number"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    placeholder="Digite a avaliação (1-5)"
                                />
                                <Button
                                    onClick={() => {
                                        setBookingId(booking.id);
                                        makeReview();
                                    }}
                                >
                                    Criar Review
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            ) : (
                <p>Nenhuma reserva encontrada.</p>
            )}
        </div>
    );
}
