'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function FeaturedToggle({ id, featured }: { id: string; featured: boolean }) {
    const router = useRouter();
    const [isFeatured, setIsFeatured] = useState(featured);
    const [loading, setLoading] = useState(false);

    const toggle = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/listings/${id}/featured`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ featured: !isFeatured }),
            });
            if (res.ok) {
                setIsFeatured(!isFeatured);
                router.refresh();
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={toggle}
            disabled={loading}
            className={`px-2 py-1 text-xs rounded ${isFeatured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
        >
            {isFeatured ? 'Featured' : 'Set Featured'}
        </button>
    );
}

export function DeleteButton({ id }: { id: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this listing?')) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/listings/${id}`, { method: 'DELETE' });
            if (res.ok) {
                router.refresh();
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="text-red-600 hover:text-red-900"
        >
            Delete
        </button>
    );
}