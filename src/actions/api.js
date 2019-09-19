import { API_URL } from '../constants';

export function fetchImages() {
    return fetch(API_URL + 'images');
}

export function fetchCategories() {
    return fetch(API_URL + 'categories');
}

export function fetchTags(categoryId) {
    return fetch(API_URL + 'categories/' + categoryId);
}
