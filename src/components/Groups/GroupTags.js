import React from 'react';
import { Select } from 'antd';
import { addTag, addTagToCategory, removeTag } from '../../helpers/api';
import { imageHasTag } from '../../helpers/image';
import * as _ from 'lodash';

export function GroupTags({images, categoryObj, getCategories, getImages, lastImage}) {
    const {category} = categoryObj;
    const tagsIds = category.tags.map(tag => tag.id);
    let commonTags = [];
    category.tags.forEach(tag => {
        const imagesHasTag = _.filter(images, image => imageHasTag(image, tag.id, categoryObj.id));
        if (imagesHasTag.length === images.length) {
            commonTags.push(tag.id);
        }
    });

    async function addTagsToAll(images, tag) {
        const promises = images.map((imageObj) => addTag(imageObj.id, categoryObj.id, tag));
        return await Promise.all(promises);
    }

    async function removeTagFromAll(images, tag) {
        const promises = images.map((imageObj) => removeTag(imageObj.id, categoryObj.id, tag));
        return await Promise.all(promises);
    }

    return (
        <div className="col-3">
            <label className="col-form-label pb-0" htmlFor={category.name}>
                {category.name}
            </label>
            <Select mode="tags" className="w-100" placeholder="Select tags"
                    id={category.name}
                    defaultValue={commonTags}
                    onSelect={(value) => {
                        if (tagsIds.indexOf(value) === -1) {
                            addTagToCategory(categoryObj.id, value).then(() => getCategories())
                        }
                        addTagsToAll(images, value).then(() => {getCategories(); getImages(lastImage);});
                    }}
                    onDeselect={value => removeTagFromAll(images, value).then(() => {getCategories(); getImages(lastImage);})}
            >
                {
                    category.tags && category.tags.map((tag, index) =>
                        <Select.Option key={`${tag.id}-${index}-${Math.random()}`}
                                       value={tag.id}>{tag.id}</Select.Option>
                    )
                }
            </Select>
        </div>
    )
}
