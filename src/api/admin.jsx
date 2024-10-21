import axios from "axios";


export const adminGetUser = (token) => {
    return axios.get('http://localhost:5000/admin/user-list', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const adminEditUserRole = (token, id, body) => {
    return axios.patch('http://localhost:5000/admin/user-list/' + id, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
export const adminGetVocabulary = (token, categoryId) => {
    return axios.get('http://localhost:5000/admin/vocabulary/' + categoryId, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const adminCreateVocab = (token, categoryId, body) => {
    return axios.post('http://localhost:5000/admin/vocabulary/' + categoryId, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
export const adminDeleteVocab = (token, vocabularyId) => {
    return axios.delete('http://localhost:5000/admin/vocabulary/' + vocabularyId, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const adminEditVocab = (token, vocabularyId, body) => {
    return axios.patch('http://localhost:5000/admin/vocabulary/' + vocabularyId, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const adminGetSearch = (token) => {
    return axios.get('http://localhost:5000/admin/user-search', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
