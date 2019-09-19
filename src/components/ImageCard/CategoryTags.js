import React from 'react';
import { Select } from 'antd';
import { addTag, removeTag } from '../../actions/api';

export function CategoryTags({imageId, categoryObj}) {
    const {id, category} = categoryObj;

    return (
        <div>
            <label className="col-form-label pb-0" htmlFor={category.name}>
                {category.name}
            </label>
            <Select mode="tags" className="w-100" placeholder="Select tags"
                    id={category.name}
                    onSelect={(value) => addTag(id, value)}
                    onDeselect={(value => removeTag(imageId, id, value))}
            >
                {
                    category.tags.map(tag =>
                        <Select.Option key={tag.id} value={tag.id}>{tag.id}</Select.Option>
                    )
                }
            </Select>
        </div>
    )
}
