import React, { useState } from 'react';
import { Button, Select, Popconfirm } from 'antd';
import { addTag, addTagToCategory, removeCategory, removeTag } from '../../helpers/api';
import { filter } from 'lodash-es';
import { categoryHasTag } from '../../helpers/category';

export function CategoryTags({imageObj, categoryObj, getCategories, getImages}) {
    const {category} = categoryObj;
    const {image} = imageObj;
    const imageTags = filter(image.tags || [], tag => tag.category === categoryObj.id).map(tag => tag.id);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onAddTag = (tag) => {
        setLoading(true);
        setOpen(false);
        if (!categoryHasTag(categoryObj, tag)) {
            addTagToCategory(categoryObj.id, tag).then(() => getCategories())
        }
        addTag(imageObj.id, categoryObj.id, tag)
            .then(() => getImages())
            .then(() => setLoading(false));
    };

    const onRemoveTag = (tag) => {
        setLoading(true);
        setOpen(false);
        removeTag(imageObj.id, categoryObj.id, tag)
            .then(() => getImages())
            .then(() => setLoading(false));
    };

    return (
        <div>
            <label className="col-form-label pb-0" htmlFor={category.name}>
                {category.name}
                <Popconfirm
                    title="Are you sure delete this category?"
                    onConfirm={() => removeCategory(categoryObj.id).then(() => getCategories())}
                >
                    <Button type={'link'} shape="round" icon={'close'} size={'small'} className="text-muted p-0"/>
                </Popconfirm>
            </label>
            <Select mode="tags" className={`w-100${loading ? ' loading-select' : ''}`} placeholder="Select tags"
                    id={category.name}
                    open={open}
                    value={imageTags}
                    onFocus={() => setOpen(true)}
                    onBlur={() => setOpen(false)}
                    onSelect={value => onAddTag(value)}
                    onDeselect={value => onRemoveTag(value)}
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
