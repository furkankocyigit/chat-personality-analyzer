import { Button, Divider, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { Password } from '../components/Password';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <>
            <form>
                <Stack sx={{ button: { textTransform: 'none' } }}>
                    <br />
                    <TextField
                        id="username"
                        label="User Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputLabelProps={{ shrink: true }}
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
                        onClick={() => setLoading(!loading)}
                        loading={loading}
                    >
                        Log In
                    </LoadingButton>
                    <br />
                </Stack>
            </form>
        </>
    );
}
