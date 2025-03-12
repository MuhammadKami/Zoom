import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Snackbar } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Authentication() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {
                let result = await handleLogin(username, password);
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("");
                setFormState(0);
                setPassword("");
            }
        } catch (err) {
            let message = err.response?.data?.message || "An error occurred";
            setError(message);
        }
    };

    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">
            <div className="row w-100">
                <div className="col-md-6 d-none d-md-block p-0">
                    <img src="/55.jpg" className="img-fluid w-100 h-100" alt="Background" />
                </div>
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                        <div className="text-center">
                            <Avatar sx={{ bgcolor: 'secondary.main', margin: 'auto' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography variant="h5" className="mt-2">
                                {formState === 0 ? "Sign In" : "Sign Up"}
                            </Typography>
                        </div>

                        <div className="btn-group w-100 my-3">
                            <button className={`btn ${formState === 0 ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setFormState(0)}>
                                Sign In
                            </button>
                            <button className={`btn ${formState === 1 ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setFormState(1)}>
                                Sign Up
                            </button>
                        </div>

                        <form>
                            {formState === 1 && (
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    margin="normal"
                                    required
                                />
                            )}
                            <TextField
                                fullWidth
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                                required
                            />
                            <p className="text-danger">{error}</p>
                            <Button variant="contained" fullWidth onClick={handleAuth} className="mt-3">
                                {formState === 0 ? "Login" : "Register"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={4000} message={message} />
        </div>
    );
}
