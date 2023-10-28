export const getSenderName = (loggedUser, users) => {
    return users[0].id === loggedUser._id ? users[1].name : users[0].name
}

export const getSenderPic = (loggedUser, users) => {
    return users[0].id === loggedUser._id ? users[1].pic : users[0].pic
}

export const getSenderEmail = (loggedUser, users) => {
    return users[0].id === loggedUser._id ? users[1].email : users[0].email
}