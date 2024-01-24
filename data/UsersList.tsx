import prisma from '@/db/prisma';

export async function UsersList() {
    const allUsers = await prisma.user.findMany();
    return (
        <>
            {allUsers.map((user) => (
                <div key={user.id}>
                    <p>{user.username}</p>
                </div>
            ))}
        </>
    )
}