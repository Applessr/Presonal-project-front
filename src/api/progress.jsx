import axios from "axios";

export const userProgress = (token) => {
    return axios.get('http://localhost:5000/user/user-progress/', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export const getAllUserScore = (token, lessonId) => {
    return axios.get('http://localhost:5000/user/user-progress/' + lessonId, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
export const getOneScore = (token, lessonId) => {
    return axios.get('http://localhost:5000/user/user-progress/personal/' + lessonId, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const createScore = (token, lessonId, score) => {
    return axios.post('http://localhost:5000/user/user-progress/' + lessonId, score, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
export const redoScore = (token, lessonId, score) => {
    return axios.patch('http://localhost:5000/user/user-progress/' + lessonId, score, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};