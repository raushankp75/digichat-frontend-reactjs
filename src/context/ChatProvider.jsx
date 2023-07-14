import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUserDetails } from "../auth";

const ChatContext = createContext();


const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();

    // const navigate = useNavigate();

    useEffect(() => {
        // const userDetails = getCurrentUserDetails()
        // const loggedInData = JSON.parse(localStorage.getItem('loggedInData'));
        setUser(getCurrentUserDetails());

        // if(!loggedInData){
        //     navigate('/')
        // }
    }, []);

    return (
        <ChatContext.Provider value={{ user, setUser }}>
            {children}
        </ChatContext.Provider>
    )
};

export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;