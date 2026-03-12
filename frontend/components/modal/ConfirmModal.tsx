"use client";

type ConfirmModalProps = {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ConfirmModal({
    open,
    title,
    message,
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 animate-fadeIn">

            <div className="bg-white rounded-lg shadow-lg w-[400px] p-6">

                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {title}
                </h2>

                <p className="text-sm text-gray-600 mb-6">
                    {message}
                </p>

                <div className="flex justify-end gap-2">

                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm text-black border rounded-md hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
}