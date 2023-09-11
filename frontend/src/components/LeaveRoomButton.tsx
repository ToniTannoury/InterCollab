import React from 'react';

const LeaveRoomButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <button
            className="p-4 mx-5 bg-white rounded-lg text-xl text-ICblue hover:bg-ICblue hover:text-white"
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
        
            </svg>
        </button>
    );
};

export default LeaveRoomButton;
