"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import ConfirmModal from "../../components/modal/ConfirmModal";

type Post = {
    id: number;
    title: string;
    content: string;
};

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const loadPosts = async (pageNumber = 1) => {
        setLoading(true);

        const res = await api.get(`/posts?page=${pageNumber}`);

        setPosts(res.data.data);
        setLastPage(res.data.last_page);
        setTotal(res.data.total);

        setLoading(false);
    };

    const deletePost = async (id: number) => {
        await api.delete(`/posts/${id}`);
        loadPosts(page);
    };

    useEffect(() => {
        loadPosts(page);
    }, [page]);

    return (
        <div className="p-8">

            <h1 className="text-2xl text-black font-bold mb-4">
                Posts
            </h1>

            <div className="flex justify-end mb-4">
                <Link
                    href="/posts/create"
                    className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    + New Post
                </Link>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">

                <table className="min-w-full">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
                                ID
                            </th>
                            <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
                                Title
                            </th>
                            <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
                                Content
                            </th>
                            <th className="text-right px-6 py-3 text-sm font-semibold text-gray-600">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                                    <div className="flex justify-center">
                                        <div className="h-6 w-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                                    </div>
                                </td>
                            </tr>

                        ) : posts.length === 0 ? (

                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                                    No posts found
                                </td>
                            </tr>

                        ) : (

                            posts.map((post) => (
                                <tr key={post.id} className="border-t hover:bg-gray-50 transition">

                                    <td className="px-6 py-4 text-gray-600">
                                        {post.id}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600 font-medium">
                                        {post.title}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {post.content}
                                    </td>

                                    <td className="px-6 py-4 text-right space-x-2">

                                        <Link
                                            href={`/posts/edit/${post.id}`}
                                            className="p-1 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded transition inline-flex"
                                        >
                                            <PencilIcon className="w-5 h-5" />
                                        </Link>

                                        <button
                                            onClick={() => setDeleteId(post.id)}
                                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded transition"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>

                                    </td>

                                </tr>
                            ))

                        )}

                    </tbody>

                    <tfoot className="bg-gray-50 border-t">
                        <tr>
                            <td colSpan={4} className="px-6 py-3 text-sm text-gray-600">

                                <div className="flex justify-between items-center">

                                    <span>
                                        Showing {posts.length} of {total} posts
                                    </span>

                                    <div className="flex items-center gap-2">

                                        <button
                                            disabled={page === 1}
                                            onClick={() => setPage(page - 1)}
                                            className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50"
                                        >
                                            Previous
                                        </button>

                                        {Array.from({ length: lastPage }, (_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setPage(i + 1)}
                                                className={`px-3 py-1 text-sm border rounded ${page === i + 1 ? "bg-gray-200" : "hover:bg-gray-100"
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}

                                        <button
                                            disabled={page === lastPage}
                                            onClick={() => setPage(page + 1)}
                                            className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50"
                                        >
                                            Next
                                        </button>

                                    </div>

                                </div>

                            </td>
                        </tr>
                    </tfoot>

                </table>

            </div>

            <ConfirmModal
                open={deleteId !== null}
                title="Delete Post"
                message="Are you sure you want to delete this post?"
                onCancel={() => setDeleteId(null)}
                onConfirm={() => {
                    if (deleteId !== null) {
                        deletePost(deleteId);
                        setDeleteId(null);
                    }
                }}
            />

        </div>
    );
}