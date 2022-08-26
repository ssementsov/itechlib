import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export const withWebsocket = (WrappedComponent) => {
    return function (props) {
        const [stompClient, setStompClient] = useState();

        useEffect(() => {
            const socket = new SockJS('http://localhost:8089/api/internal-message');
            const stomp = Stomp.over(socket);
            setStompClient(stomp);
        }, []);

        return <WrappedComponent stompClient={stompClient} {...props}/>;
    }
};