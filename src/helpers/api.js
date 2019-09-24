import {API_URL, IMAGE_LIMIT, corsParams} from '../constants';

export function fetchImages(lastImage) {
    return fetch(API_URL + 'images?after=' + lastImage + '&limit=' + IMAGE_LIMIT);
}

export function fetchCategories() {
    return fetch(API_URL + 'categories');
}

export function fetchTags(categoryId) {
    return fetch(API_URL + 'categories/' + categoryId);
}

export function addCategory(category) {
    return postData(API_URL + 'categories', category)
}

export function addTag(imageId, categoryId, tag) {
    return postData(API_URL + 'images/' + imageId + '/tags', {category: categoryId, id: tag})
}

export function addTagToCategory(categoryId, tag) {
    return postData(API_URL + 'categories/' + categoryId + '/tags', {id: tag})
}

export function removeTag(imageId, categoryId, tag) {
    return deleteData(API_URL + 'images/' + imageId + '/tags/' + categoryId + '/' + tag)
}

export function removeCategory(categoryId) {
    return deleteData(API_URL + 'categories/' + categoryId)
}

function postData(url = '', data = {}) {
    return fetch(url, {...corsParams, method: 'POST', body: JSON.stringify(data)})
        .then(response => response.json());
}

function deleteData(url = '') {
    return fetch(url, {...corsParams, method: 'DELETE'});
}
