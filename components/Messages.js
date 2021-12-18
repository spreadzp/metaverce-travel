import React, { useRef } from 'react'
import { useMoralis, ByMoralis, useMoralisQuery } from 'react-moralis'
import Message from './Message'
import SendMessage from './SendMessage'

const MINS_DURATION = 15
function Messages() {
    const { user } = useMoralis()
    const endOfMessagesRef = useRef(null)
    const { data, loading, error } = useMoralisQuery(

        'Messages',
        (query) => query.ascending('createdAt').greaterThan
            ("createdAt", new Date(Date.now() - MINS_DURATION * 60 * 1000)), [],
        { live: true, }
    )
    return (
        <div className='pb-56'>
            <div>
                <ByMoralis style={{ marginLeft: "auto", marginRight: "auto" }} />
            </div>
            <div className='space-y-10 p-4'>
                {data.map(message => (
                    <Message key={message.id} message={message} />
                ))}
            </div>
            <div className='flex justify-center'>
                <SendMessage endOfMessagesRef={endOfMessagesRef} />
            </div>
            <div ref={endOfMessagesRef} className='text-center text-gray-400 mt-5'>
                <p >
                    You're up to date {user.getUsername()}!
                </p>
            </div>
        </div>
    )
}

export default Messages
