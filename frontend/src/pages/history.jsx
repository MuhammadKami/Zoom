import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        };

        fetchHistory();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <Container className="mt-4">
            {/* Home Button */}
            <div className="d-flex justify-content-start mb-3">
                <IconButton onClick={() => navigate("/home")}>
                    <HomeIcon />
                </IconButton>
            </div>

            {/* Meeting History */}
            <Row className="g-3">
                {meetings.length > 0 ? (
                    meetings.map((e, i) => (
                        <Col key={i} xs={12} md={6} lg={4}>
                            <Card variant="outlined" className="shadow p-3">
                                <CardContent>
                                    <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
                                        <strong>Meeting Code:</strong> {e.meetingCode}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        <strong>Date:</strong> {formatDate(e.date)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col xs={12}>
                        <Typography variant="h6" className="text-center text-muted">
                            No meeting history available.
                        </Typography>
                    </Col>
                )}
            </Row>
        </Container>
    );
}
