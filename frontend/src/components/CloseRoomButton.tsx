export const CloseRoomButton: React.FC<{onClick:()=>void}>= ({onClick}) => {
  return (
    <button className="p-4 mx-5 bg-red-700 rounded-lg text-xl text-white hover:bg-ICblue hover:text-white" onClick={onClick}>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
           <path d="M6 6 L18 18 M6 18 L18 6" />

           </svg>
        </button>
  );
};