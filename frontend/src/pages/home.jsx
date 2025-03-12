import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField, Box, Typography, Grid } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';
import "../App.css";

function HomeComponent() {
    const navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");

    const { addToUserHistory } = useContext(AuthContext);

    const handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) return; // Prevent joining without a code
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    };

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Navbar */}
            <Box className="navBar" sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 3, py: 2,
                background: "#f8f8f8",
                flexWrap: "wrap"
            }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: { xs: "1.4rem", md: "1.8rem" } }}>
                    Apna Video Call
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    {/* History Button */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }} onClick={() => navigate("/history")}>
                        <IconButton>
                            <RestoreIcon />
                        </IconButton>
                        <Typography sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}>History</Typography>
                    </Box>

                    {/* Logout Button */}
                    <Button variant="contained" color="error" sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/auth");
                        }}>
                        Logout
                    </Button>
                </Box>
            </Box>

            {/* Meeting Section */}
            <Grid container className="meetContainer" spacing={3} sx={{
                flexGrow: 1,
                px: { xs: 2, md: 4 },
                py: { xs: 4, md: 6 },
                alignItems: "center",
                textAlign: "center"
            }}>
                {/* Left Panel */}
                <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h4" sx={{
                        fontWeight: "bold",
                        mb: 3,
                        fontSize: { xs: "1.5rem", md: "2.2rem" }
                    }}>
                        Providing Quality Video Call Just Like Quality Education
                    </Typography>

                    <Box display="flex" gap="12px" justifyContent="center" sx={{ flexWrap: "wrap" }}>
                        <TextField
                            label="Meeting Code"
                            variant="outlined"
                            value={meetingCode}
                            sx={{ width: { xs: "100%", md: "auto" } }}
                            onChange={(e) => setMeetingCode(e.target.value)}
                        />
                        <Button variant="contained" color="primary" onClick={handleJoinVideoCall}
                            sx={{ width: { xs: "100%", md: "auto" } }}>
                            Join
                        </Button>
                    </Box>
                </Grid>

                {/* Right Panel */}
                <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
                    <img src="/logo3.png" alt="Video Call Logo" style={{ width: "100%", maxWidth: "400px", borderRadius: "20px" }} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default withAuth(HomeComponent);
