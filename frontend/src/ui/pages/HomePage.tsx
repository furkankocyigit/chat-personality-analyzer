import { Container } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { User } from '@/domain/User/User';
import { UserCard } from '../components/UserCard';
import { useUserService } from '../context/UserServiceContext';

export function HomePage() {
    const { userService } = useUserService();
    const [users, setUsers] = useState<User[]>([]);

    const getDmUsers = useCallback(async () => {
        try {
            const users = await userService.getAllUsersInDm();
            console.log(users);
            setUsers(users);
        } catch (err) {
            console.log(err);
        }
    }, [userService, setUsers]);

    useEffect(() => {
        getDmUsers();
    }, [getDmUsers]);

    return (
        <Container
            id="home"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {users.map((user) => (
                <UserCard
                    key={user.id}
                    user={user}
                />
            ))}
        </Container>
    );
}
