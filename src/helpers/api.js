import { API_URL, IMAGE_LIMIT, corsParams } from '../constants';

function makeUrlParams(params) {
    return Object.keys(params).map(key => key + '=' + params[key]).join('&');
}

export function fetchImages(after, filterby, filtervalue) {
    let params = {after, limit: IMAGE_LIMIT};
    if (filterby && filtervalue) {
        params = {...params, filterby, filtervalue};
    }

    return fetch(API_URL + 'images?' + makeUrlParams(params))
        .then(response => response.json())
        .catch(err => console.log(err));
}

export function fetchCategories() {
    return fetch(API_URL + 'categories')
        .then(response => response.json())
        .catch(err => console.log(err));
}

export function addCategory(category) {
    return postData(API_URL + 'categories', category)
}

export function addTagToImage(imageId, categoryId, tag) {
    return postData(API_URL + 'images/' + imageId + '/tags', {category: categoryId, id: tag})
}

export function addTagToCategory(categoryId, tag) {
    return postData(API_URL + 'categories/' + categoryId + '/tags', {id: tag})
}

export function removeTagFromImage(imageId, categoryId, tag) {
    return deleteData(API_URL + 'images/' + imageId + '/tags/' + categoryId + '/' + tag)
}

export async function addTagsToAll(images, categoryId, tag) {
    const promises = images.map((imageObj) => addTagToImage(imageObj.id, categoryId, tag));
    return await Promise.all(promises);
}

export async function removeTagFromAll(images, categoryId, tag) {
    const promises = images.map((imageObj) => removeTagFromImage(imageObj.id, categoryId, tag));
    return await Promise.all(promises);
}

export function removeCategory(categoryId) {
    return deleteData(API_URL + 'categories/' + categoryId)
}

export function fetchFilters() {
    return fetch(API_URL + 'attributes');
}

function postData(url = '', data = {}) {
    return fetch(url, {...corsParams, method: 'POST', body: JSON.stringify(data)})
        .then(response => response.json())
        .catch(err => console.log(err));
}

function deleteData(url = '') {
    return fetch(url, {...corsParams, method: 'DELETE'})
        .catch(err => console.log(err));
}
