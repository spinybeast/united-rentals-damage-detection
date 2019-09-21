import * as _ from "lodash";
import {filterToTag, tagToFilter} from "./category";

export function getGroups(groupBy, images, categories) {
    const currentCategory = !isNaN(groupBy) ?
        _.first(_.filter(categories, (category => category.id === groupBy))) :
        false;

    return currentCategory ?
        currentCategory.category.tags.map(tag => tagToFilter({id: tag.id, category: currentCategory.id})) :
        _.uniq(images.map(imageObj => imageObj.image[groupBy]));
}

export function filterByGroup(images, group) {
    return _.filter(images, (imageObj => {
        if (group === null) {
            return true;
        }
        return imageHasGroup(imageObj, group) || imageHasTag(imageObj, group);
    }))
}

export function filterByTag(images, tagFilter) {
    return _.filter(images, (imageObj => {
        return imageHasTag(imageObj, tagFilter)
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

export function imageHasCategory(imageObj, categoryId) {
    const categories = imageObj.image.tags.map(tag => tag.category);
    return ~categories.indexOf(categoryId);
}

export function imageHasTag(imageObj, tag) {
    const tagObj = filterToTag(tag);
    return _.filter(imageObj.image.tags, (tag => tag.id === tagObj.id && tag.category === tagObj.category)).length > 0;
}