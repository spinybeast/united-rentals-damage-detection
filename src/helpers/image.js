import * as _ from "lodash";

export function filterByGroup(images, group) {
    return _.filter(images, (imageObj => {
        if (group === null) {
            return true;
        }
        return imageHasGroup(imageObj, group) || imageHasCategory(imageObj, group);
    }))
}

export function filterByCategory(images, category) {
    return _.filter(images, (imageObj => {
        return imageHasCategory(imageObj, category)
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