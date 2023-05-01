import {io} from "socket.io-client";

const BASE_API  = "http://localhost:4000"

const socket = io(
    BASE_API,
    {
        autoConnect: false
    }
);

socket.onAny((event, ...args) => {
    console.log(event, args)
});

export default socket;