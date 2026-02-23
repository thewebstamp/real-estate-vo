import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <AdminHeader />
            <main className="grow py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
            </main>
        </div>
    );
}