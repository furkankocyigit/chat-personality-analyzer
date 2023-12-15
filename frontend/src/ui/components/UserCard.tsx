import { User } from '@/domain/User/User';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, CardContent, CardHeader, Typography, CardMedia } from '@mui/material';
import { useRouter } from 'next/navigation';

function UserProfile({ user }: { user: User }) {
    const router = useRouter();
    const handleExtendedEvaluation = async (e: any) => {
        e.preventDefault();

        router.push(`/evaluate?username=${user.username}`);
    };
    const handleSummarizedEvaluation = () => {
        console.log('summarized evaluation');
        router.push(`/evaluate/summarized?username=${user.username}`);
    };
    return (
        <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
        >
            <Grid
                item
                xs={12}
                sm={4}
                md={3}
            >
                <CardMedia
                    component="img"
                    image={`data:image/jpeg;base64,${user.profilePicture}`}
                    alt={user.username}
                    sx={{ objectFit: 'contain', width: '100%' }}
                />
            </Grid>
            <Grid
                item
                xs={12}
                sm={8}
                md={6}
            >
                <Typography variant="h5">{user.username}</Typography>
            </Grid>
            <Grid
                item
                xs={12}
                sm={12}
                md={3}
                sx={{ textAlign: 'center' }}
            >
                <LoadingButton
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleExtendedEvaluation}
                    sx={{ marginBottom: 1 }}
                >
                    Extended Evaluation
                </LoadingButton>
                <LoadingButton
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleSummarizedEvaluation}
                >
                    Summarized Evaluation
                </LoadingButton>
            </Grid>
        </Grid>
    );
}

export function UserCard({ user }: { user: User }) {
    return (
        <Card sx={{ width: '100%' }}>
            <CardContent>
                <UserProfile user={user} />
            </CardContent>
        </Card>
    );
}
