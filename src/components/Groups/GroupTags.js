import React, { useState } from 'react';
import { Select } from 'antd';
import { addTagToCategory, addTagsToAll, removeTagFromAll } from '../../helpers/api';
import { getCommonTags } from '../../helpers/category';

export function GroupTags({images, categoryObj, getCategories, getImages}) {
    const {category} = categoryObj;
    const tagsIds = category.tags.map(tag => tag.id);
    const commonTags = getCommonTags(images, categoryObj);
    const [open, setOpen] = useState(false);

    return (
        <div className="col-3">
            <label className="col-form-label pb-0" htmlFor={category.name}>
                {category.name}
            </label>
            <Select mode="tags" className="w-100" placeholder="Select tags"
                    id={category.name}
                    defaultValue={commonTags}
                    open={open}
                    onFocus={() => setOpen(true)}
                    onBlur={() => setOpen(false)}
                    onSelect={value => {
                        setOpen(false);
                        if (tagsIds.indexOf(value) === -1) {
                            addTagToCategory(categoryObj.id, value).then(() => getCategories());
                        }
                        addTagsToAll(images, categoryObj.id, value).then(() => getImages());
                    }}
                    onDeselect={value => removeTagFromAll(images, categoryObj.id, value).then(() => getImages())}
            >
                {
                    category.tags && category.tags.map(tag =>
                        <Select.Option key={tag.id}
                                       value={tag.id}>{tag.id}</Select.Option>
                    )
                }
            </Select>
        </div>
    )
}
