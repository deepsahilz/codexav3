import React, { useState } from 'react'
import ChatList from './ChatList'
import ChatBox from './ChatBox'
import ModalContainer from './ModalContainer'
import { useChatContext } from '../context/ChatContext'
import UserSearch from './UserSearch'

const ChatPage2 = () => {
    
    const {showChatModal,setShowChatModal} = useChatContext();
    
    return (
        <div className='flex flex-row h-[90vh] relative w-full'>
            <ChatList/>
            <ChatBox/>
            {/* <div className=' absolute flex w-full items-center bg-black/40 justify-center h-full'>
                <div className='p-5 rounded-lg shadow-lg block border bg-white'>ojjooj</div>
            </div> */}

            {showChatModal&&
            <ModalContainer label="New Chat" margintop="8rem" >
                <UserSearch/>
            </ModalContainer>}
        </div>
    )
}

export default ChatPage2