import React, { useRef } from 'react';
import { Select } from 'antd';
import { addTagToCategory, addTagsToAll, removeTagFromAll } from '../../helpers/api';
import { categoryHasTag, getCommonTags } from '../../helpers/category';

export function GroupTags({images, categoryObj, getCategories, getImages}) {
    const {category} = categoryObj;
    const commonTags = getCommonTags(images, categoryObj);
    const select = useRef(null);

    return (
        <div className="col-3">
            <label className="col-form-label pb-0" htmlFor={category.name}>
                {category.name}
            </label>
            <Select mode="tags" ref={select} className="w-100" placeholder="Select tags"
                    id={category.name}
                    defaultValue={commonTags}
                    onSelect={value => {
                        select.current.blur();
                        if (!categoryHasTag(categoryObj, value)) {
                            addTagToCategory(categoryObj.id, value).then(() => getCategories());
                        }
                        addTagsToAll(images, categoryObj.id, value).then(() => getImages());
                    }}
                    onDeselect={value => {
                        select.current.blur();
                        removeTagFromAll(images, categoryObj.id, value).then(() => getImages())
                    }}
            >
                {
                    category.tags && category.tags.map(tag =>
                        <Select.Option key={tag.id} value={tag.id}>{tag.id}</Select.Option>
                    )
                }
            </Select>
        </div>
    )
}
