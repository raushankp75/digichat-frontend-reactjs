export const getSenderName = (loggedUser, users) => {
    return users[0]?._id === loggedUser?.user._id ? users[1].name : users[0].name;
};

// export const getSenderFull = (loggedUser, users) => {
//     return users[0]._id === loggedUser.user._id ? users[1] : users[0];
// };

export const getSenderPic = (loggedUser, users) => {
    return users[0]?._id === loggedUser?.user._id ? users[1].pic : users[0].pic
}

export const getSenderEmail = (loggedUser, users) => {
    return users[0]?._id === loggedUser?.user._id ? users[1].email : users[0].email
}

export const isSameSender = (messages, message, index, userId) => {
    return (
        index < messages.length - 1 && (messages[index + 1].sender._id !== message.sender._id || messages[index + 1].sender._id === undefined) && messages[index].sender._id !== userId
    )
}

export const isLastMessage = (messages, index, userId) => {
    return (
        index === messages.length - 1 && messages[messages.length - 1].sender._id !== userId && messages[messages.length - 1].sender._id
    )
}

export const isSameSenderMargin = (messages, message, index, userId) => {
    if (index < messages.length - 1 &&
        messages[index + 1].sender._id === message.sender._id &&
        messages[index].sender._id !== userId) {
        return '0px'
    }

    else if (index < messages.length - 1 &&
        messages[index + 1].sender._id !== message.sender._id && messages[index].sender._id !== userId ||
        (index === messages.length - 1 && messages[index].sender._id !== userId)) {
        return '0px'
    }

    else {
        return 'auto'
    }
}

export const isLoggedInUser = (messages, message, index) => {
    return index > 0 && messages[index - 1].sender._id === message.sender._id
}