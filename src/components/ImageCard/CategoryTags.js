import React, { useState, useEffect } from 'react';
import { Button, Select, Popconfirm } from 'antd';
import { addTag, addTagToCategory, removeCategory, removeTag } from '../../helpers/api';
import {filter, without} from 'lodash-es';

export function CategoryTags({imageObj, categoryObj, getCategories}) {
    const {category} = categoryObj;
    const {image} = imageObj;
    const tags = filter(image.tags || [], tag => tag.category === categoryObj.id);
    const tagsIds = category.tags.map(tag => tag.id);
    const [open, setOpen] = useState(false);
    const [imageTags, setImageTags] = useState(tags.map(tag => tag.id));
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setImageTags(tags.map(tag => tag.id))
    }, [tags, imageObj]);
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
                    onSelect={(value) => {
                        setLoading(true);
                        if (tagsIds.indexOf(value) === -1) {
                            addTagToCategory(categoryObj.id, value).then(() => getCategories())
                        }
                        addTag(imageObj.id, categoryObj.id, value).then(() => {
                            setOpen(false);
                            setLoading(false);
                            setImageTags(imageTags.concat([value]));
                        })
                    }}
                    onDeselect={(value => {
                        setLoading(true);
                        removeTag(imageObj.id, categoryObj.id, value).then(() => {
                            setImageTags(without(imageTags, value));
                            setLoading(false);
                        })
                    })}
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
