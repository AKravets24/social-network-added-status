import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: { "API-KEY": "83df008c-c6eb-4d84-acd3-e62be0f407d9"}, });


export const usersApi = {

    setMeLogin (email = null, password = null, rememberMe = false)
                                 { return instance.post(`/auth/login`, {email, password, rememberMe}) .then(response =>
                                     response.data                                                                  ) },

    setMeLogOut()                { return instance.delete(`/auth/login`)           .then(response => response.data  ) },
    getLogIn()                   { return instance.get(`/auth/me`)                 .then(response => response.data  ) },
    getUsers(pageSize = 10, currentPage = 1) {
        return instance.get(`users?count=${pageSize}&page=${currentPage}`)         .then(response => response.data   )},
    getCertainUser(userName)     {
        return instance.get(`users?term=${userName}`)                              .then(response => response.data   )},
    followRequest(userId)        { return instance.post(`follow/${userId}`)        .then(response => response.data   )},
    unFollowRequest(userId)      { return instance.delete(`follow/${userId}`)      .then(response => response.data   )},
    updateMyStatus(status)       { return instance.put(`profile/status`, {status: status} ).then(response =>
         response.config.data)},
    getMyStatus(myId)            { return instance.get(`profile/status/8856`)      .then(response => response.data   )},
    getUserStatus(userId)        { return instance.get(`profile/status/${userId}`) .then(response => response.data   )},
    updateMyAvatar(file)         {
        const formData = new FormData();
        formData.append('image', file);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })                                                                         .then(response => response.data   )},
    getProfile(userId)           { return instance.get(`profile/${userId}`)        .then(response => response.data   )},
    getMyProfile(myId)           { return instance.get(`profile/${myId}`)          .then(response => response.data   )},
    getMyFriends()               { return instance.get(`users?friend=true`)        .then(response => response.data   )},
};



// ссылки для тестирования

// https://social-network.samuraijs.com/api/1.0/auth/me
// https://social-network.samuraijs.com/api/1.0/profile/8856
// https://social-network.samuraijs.com/api/1.0/profile
// https://social-network.samuraijs.com/api/1.0/profile/status/8856
// https://social-network.samuraijs.com/api/1.0/profile/photo
// https://social-network.samuraijs.com/activecontent/images/users/8856/user.jpg - аватарка большая
// https://social-network.samuraijs.com/activecontent/images/users/8856/user-small.jpg - аватарка мелкая
// https://social-network.samuraijs.com/api/1.0/profile/status/8856
// https://social-network.samuraijs.com/api/1.0/users?term=Stas9n
// https://social-network.samuraijs.com/api/1.0/users?friend


// import * as axios from "axios";
//
// const instance = axios.create({
//     withCredentials: true,
//     baseURL: 'https://social-network.samuraijs.com/api/1.0/',
//     headers: { "API-KEY": "83df008c-c6eb-4d84-acd3-e62be0f407d9"}, });
//
//
// export const usersApi = {
//     setCurrentUser ()            {},
//     getLogIn()                   { return instance.get(`/auth/me`)                 .then(response => response.data  )},
//     getUsers(pageSize = 10, currentPage = 1) {
//         return instance.get(`users?count=${pageSize}&page=${currentPage}`)         .then(response => response.data   )},
//     getCertainUser(userName)     {
//         return instance.get(`users?term=${userName}`)                              .then(response => response.data   )},
//     followRequest(userId)        { return instance.post(`follow/${userId}`)        .then(response => response.data   )},
//     unFollowRequest(userId)      { return instance.delete(`follow/${userId}`)      .then(response => response.data   )},
//     updateMyStatus(status)       { return instance.put(`profile/status`, {status: status} ).then(response =>
//         response.config.data)},
//     getMyStatus(myId)            { return instance.get(`profile/status/8856`)      .then(response => response.data   )},
//     getUserStatus(userId)        { return instance.get(`profile/status/${userId}`) .then(response => response.data   )},
//     updateMyAvatar(file)         {
//         const formData = new FormData();
//         formData.append('image', file);
//         return instance.put(`profile/photo`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         })                                                                         .then(response => response.data  )},
//     getProfile(userId)           { return instance.get(`profile/${userId}`)        .then(response => response.data   )},
//     getMyProfile(myId)           { return instance.get(`profile/${myId}`)          .then(response => response.data   )},
//     getMyFriends()               { return instance.get(`users?friend=true`)        .then(response => response.data   )},
//};