import { Box, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { Password } from '../components/Password';
import { useAuthenticationService } from '../context/AuthenticationServiceContext';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { authenticationService } = useAuthenticationService();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        if (username === '' || password === '') {
            alert('Please fill out all fields');
            return;
        }
        setLoading(true);
        try {
            const session = await authenticationService.login(username, password);
            setLoading(false);
            localStorage.setItem('token', session.accessToken);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <Box sx={{ width: '50%' }}>
            <form>
                <Stack sx={{ button: { textTransform: 'none' } }}>
                    <br />
                    <TextField
                        id="username"
                        label="User Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        autoComplete="username"
                    />
                    <br />
                    <Password
                        password={password}
                        setPassword={setPassword}
                    />
                    <br />
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        onClick={handleLogin}
                        loading={loading}
                    >
                        Log In
                    </LoadingButton>
                    <br />
                </Stack>
            </form>
        </Box>
    );
}
