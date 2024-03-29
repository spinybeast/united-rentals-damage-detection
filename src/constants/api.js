function isLocal() {
    return ~window.location.origin.indexOf('localhost');
}
export const API_URL = 'http://damage.logimove.com:8081/';
export const IMAGE_URL = 'http://damage.logimove.com/images/';
export const IMAGE_LIMIT = isLocal() ? 6 : 50;
export const corsParams =  {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};
