import React, { useState, useRef } from 'react';
import { Button, Select, Popconfirm } from 'antd';
import { addTagToImage, addTagToCategory, removeCategory, removeTagFromImage } from '../../helpers/api';
import { filter } from 'lodash-es';
import { categoryHasTag } from '../../helpers/category';

export function CategoryTags({imageObj, categoryObj, getCategories, getImages}) {
    const {category} = categoryObj;
    const {image} = imageObj;
    const imageTags = filter(image.tags || [], tag => tag.category === categoryObj.id).map(tag => tag.id);
    const [loading, setLoading] = useState(false);
    const select = useRef(null);

    const onAddTag = (tag) => {
        setLoading(true);
        select.current.blur();
        if (!categoryHasTag(categoryObj, tag)) {
            addTagToCategory(categoryObj.id, tag).then(() => getCategories())
        }
        addTagToImage(imageObj.id, categoryObj.id, tag)
            .then(() => getImages())
            .then(() => setLoading(false));
    };

    const onRemoveTag = (tag) => {
        setLoading(true);
        select.current.blur();
        removeTagFromImage(imageObj.id, categoryObj.id, tag)
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
            <Select mode="tags" ref={select} className={`w-100${loading ? ' loading-select' : ''}`} placeholder="Select tags"
                    id={category.name}
                    value={imageTags}
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
