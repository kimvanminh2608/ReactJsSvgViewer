import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity duration-300">
            <div className="relative bg-white w-11/12 max-w-5xl h-5/6 rounded shadow-lg flex flex-col">
                <div className="relative p-4 border-b">
                    <h2 className="text-lg font-medium">{title}</h2>
                    <button
                        onClick={onClose}
                        className="absolute top-1 right-4 p-1 rounded hover:bg-gray-100 transition"
                        title="Close"
                    >
                        X
                    </button>
                </div>
                <div className="flex-grow overflow-auto p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;