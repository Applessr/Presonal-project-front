import axios from 'axios'


export const getUserPro = (token) => {
    return axios.get('http://localhost:5000/user', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const upDateUserPro = (token,body) => {
    return axios.patch('http://localhost:5000/user',body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const deleteUserPro = (token) => {
    return axios.delete('http://localhost:5000/user', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const lesson = (token) => {
    return axios.get('http://localhost:5000/user/lessons/', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getLessonById = (token,id) => {
    return axios.get('http://localhost:5000/user/lessons/'+id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const allVocab = () => {
    return axios.get('http://localhost:5000/user/allVocabulary');
};

export const allVocabCategory = (token) => {
    return axios.get('http://localhost:5000/user/vocabulary/', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const vocabulary = (token, categoryId) => {
    return axios.get('http://localhost:5000/user/vocabulary/'+categoryId, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const searchTerm = (token) => {
    return axios.get('http://localhost:5000/user/user-history', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const createSearch = (token,SearchInput) => {
    return axios.post('http://localhost:5000/user/user-history',SearchInput, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const deleteSearch = (token, id) => {
    return axios.delete('http://localhost:5000/user/user-history/'+id,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
export const getFavorite = (token) => {
    return axios.get('http://localhost:5000/user/user-favorite', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
export const createFavorite = (token, vocabId) => {
    return axios.post('http://localhost:5000/user/user-favorite/'+vocabId, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const deleteFavorite = (token, vocabId) => {
    return axios.delete('http://localhost:5000/user/user-favorite/'+vocabId, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

