import * as _ from "lodash";

export function getTagName(filterId) {
    const [tagId, ] = filterId.split('/');
    return tagId;
}

export function tagToFilter(tagObj) {
    return `${tagObj.id}/${tagObj.category}`;
}

export function filterToTag(filterId) {
    const [tagId, categoryId] = filterId.split('/');
    return {id: tagId, category: parseInt(categoryId)};
}