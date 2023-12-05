import React, { useEffect, useState } from 'react';

export default function ConfirmDialog({ isOpen, title, message, onCancel, onConfirm }) {
    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
        setIsVisible(isOpen);
    }, [isOpen]);

    const handleCancel = () => {
        setIsVisible(false);
        setTimeout(() => {
            onCancel();
        }, 300);
    };

    const handleConfirm = () => {
        setIsVisible(false);
        setTimeout(() => {
            onConfirm();
        }, 300);
    };

    return (
        <>
            {/* Overlay */}
            {isVisible && <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>}

            {/* ConfirmDialog */}
            <div
                className={`fixed ${
                    isVisible ? 'top-5 opacity-100' : 'bottom-full opacity-0'
                } left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-md shadow-md transition-transform transition-opacity duration-300 min-w-[500px] z-50`}
            >
                <h2 className="text-lg font-bold mb-2">{title}</h2>
                <p className="text-gray-700 mb-4">{message}</p>
                <div className="flex justify-end">
                    <button className="mr-2 px-4 py-2 bg-gray-300 rounded-md" onClick={handleCancel}>
                        Hủy
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleConfirm}>
                        Xác nhận
                    </button>
                </div>
            </div>
        </>
    );
}
