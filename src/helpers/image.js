import * as _ from "lodash";
import {filterToTag, tagToFilter} from "./category";

export function getGroups(groupBy, images, categories) {
    if (!isNaN(groupBy)) {
        const currentCategory =  _.find(categories, ['id', groupBy]);
        return currentCategory ? currentCategory.category.tags.map(tag => tagToFilter({id: tag.id, category: currentCategory.id})) : [];
    }
    return images ? _.uniq(images.map(imageObj => imageObj.image[groupBy])) : [];
}

export function filterByGroup(images, group) {
    return _.filter(images, (imageObj => {
        if (group === null) {
            return true;
        }
        return imageHasGroup(imageObj, group) || imageHasTagFilter(imageObj, group);
    }))
}

export function filterByTag(images, tagFilter) {
    return _.filter(images, (imageObj => {
        return imageHasTagFilter(imageObj, tagFilter)
    }))
}

export function filterByField(images, groupBy, field) {
    return _.filter(images, (imageObj => {
        return imageObj.image[groupBy] === field
    }))
}

export function imageHasGroup(imageObj, group) {
    return imageObj.image.group === group
}

export function imageHasTagFilter(imageObj, tag) {
    const tagObj = filterToTag(tag);
    return _.filter(imageObj.image.tags, (tag => tag.id === tagObj.id && tag.category === tagObj.category)).length > 0;
}

export function imageHasTag(imageObj, tagId, categoryId) {
    return _.filter(imageObj.image.tags, (tag => tag.id === tagId && tag.category === categoryId)).length > 0;
}
