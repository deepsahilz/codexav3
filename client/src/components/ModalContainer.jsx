import React, { useEffect } from 'react';
import { useChatContext } from '../context/ChatContext';

const ModalContainer = ({ children, label, onclose, margintop }) => {

  const {setShowChatModal} = useChatContext();
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className={`fixed w-full inset-0 z-[99] bg-black/40 cursor-zoom-out flex justify-center ${
        margintop ? 'mx-auto' : 'flex items-center'
      } overflow-y-auto animate-faded`}
      onClick={onclose}
    >
      <div
        className="bg-white z-[100] cursor-auto min-w-[20rem]  max-h-[22rem] max-w-full block border animate-popping shadow-lg rounded-xl"
        style={{ marginTop: margintop || 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b flex justify-between items-center px-5 py-2">
          <span className="font-semibold">{label || 'heading'}</span>
          <button
            onClick={()=>{setShowChatModal(false)}}
            className="text-2xl hover:text-red-600 leading-none"
          >
            &times;
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default ModalContainer;
