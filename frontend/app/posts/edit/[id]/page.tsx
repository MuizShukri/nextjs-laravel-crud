"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../../lib/api";

export default function EditPostPage() {
    const { id } = useParams();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const loadPost = async () => {
        const res = await api.get(`/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
    };

    const updatePost = async () => {
        await api.put(`/posts/${id}`, {
            title,
            content,
        });

        router.push("/posts");
    };

    useEffect(() => {
        loadPost();
    }, []);

    return (
        <div className="p-8">

            <h1 className="text-2xl text-black font-bold mb-4">
                Edit Post
            </h1>

            <div className="bg-white shadow rounded-lg p-6 max-w-full">

                <div className="space-y-5">

                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                            Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter post title"
                            className="w-full border border-gray-300 text-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                            Content
                        </label>

                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your content..."
                            className="w-full border border-gray-300 text-gray-600 rounded-md px-3 py-2 text-sm h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">

                        <button
                            onClick={() => router.push("/posts")}
                            className="text-sm px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={updatePost}
                            className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                            Update Post
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}