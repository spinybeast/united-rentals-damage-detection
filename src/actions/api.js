import {API_URL, corsParams} from '../constants';

export function fetchImages() {
    return fetch(API_URL + 'images');
}

export function fetchCategories() {
    return fetch(API_URL + 'categories');
}

export function fetchTags(categoryId) {
    return fetch(API_URL + 'categories/' + categoryId);
}

export function addCategory(category) {
    console.log('added!' + category);
    // return postData(API_URL + 'images/' + imageId + '/tags', tag)
}

export function addTag(imageId, tag) {
    return postData(API_URL + 'images/' + imageId + '/tags', tag)
}

export function removeTag(imageId, categoryId, tag) {
    return deleteData(API_URL + 'images/' + imageId + '/tags/' + categoryId + '/' + tag)
}

function postData(url = '', data = {}) {

    return fetch(url, {...corsParams, method: 'POST', body: JSON.stringify(data)})
        .then(response =>  response.json());
}

function deleteData(url = '') {
    return fetch(url, {method: 'DELETE'})
        .then(response => response.json());
}
