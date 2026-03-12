"use client";

import { useRouter } from "next/navigation";
import api from "../../../lib/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const postSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
});

type PostFormData = z.infer<typeof postSchema>;

export default function CreatePostPage() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PostFormData>({
        resolver: zodResolver(postSchema),
    });

    const onSubmit = async (data: PostFormData) => {
        await api.post("/posts", data);
        router.push("/posts");
    };

    return (
        <div className="p-8">

            <h1 className="text-2xl text-black font-bold mb-4">
                Create Post
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow rounded-lg p-6 max-w-full space-y-5"
            >

                {/* Title */}
                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Title
                    </label>

                    <input
                        {...register("title")}
                        placeholder="Enter post title"
                        className="w-full border border-gray-300 text-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Content
                    </label>

                    <textarea
                        {...register("content")}
                        placeholder="Write your content..."
                        className="w-full border border-gray-300 text-gray-600 rounded-md px-3 py-2 text-sm h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {errors.content && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.content.message}
                        </p>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 pt-2">

                    <button
                        type="button"
                        onClick={() => router.push("/posts")}
                        className="text-sm px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isSubmitting ? "Saving..." : "Save Post"}
                    </button>

                </div>

            </form>

        </div>
    );
}