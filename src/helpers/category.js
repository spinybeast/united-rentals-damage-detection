import { filter } from 'lodash-es';
import { imageHasTag } from './image';

export function getTagName(filterId) {
    const [tagId,] = filterId.split('/');
    return tagId;
}

export function tagToFilter(tagObj) {
    return `${tagObj.id}/${tagObj.category}`;
}

export function filterToTag(filterId) {
    const [tagId, categoryId] = filterId.split('/');
    return {id: tagId, category: parseInt(categoryId)};
}

export function categoryHasTag(categoryObj, tag) {
    return ~categoryObj.category.tags.map(tag => tag.id).indexOf(tag);
}

export function getCommonTags(images, categoryObj) {
    let commonTags = [];
    categoryObj.category.tags.forEach(tag => {
        const imagesHasTag = filter(images, image => imageHasTag(image, tag.id, categoryObj.id));
        if (imagesHasTag.length === images.length) {
            commonTags.push(tag.id);
        }
    });

    return commonTags;
}
