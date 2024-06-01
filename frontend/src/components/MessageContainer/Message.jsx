import React from 'react'

const Message = () => {
  return (
    <div className="chat chat-end">
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                <img src="#" alt="Tailwind CSS chat bubble" />
            </div>
        </div>
        <div className="chat-bubble text-white bg-blue-500">Hii!! What's Up?</div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">12:42</div>
    </div>
  )
}

export default Message;