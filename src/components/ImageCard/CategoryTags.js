import React, {useState} from 'react';
import {Button, Select, Popconfirm} from 'antd';
import {addTag, addTagToCategory, removeCategory, removeTag} from '../../helpers/api';
import * as _ from 'lodash';

export function CategoryTags({imageObj, categoryObj, getCategories}) {
    const {category} = categoryObj;
    const {image} = imageObj;
    const imageTags = _.filter(image.tags || [], tag => tag.category === categoryObj.id);
    const tagsIds = category.tags.map(tag => tag.id);
    const [open, setOpen] = useState(false);
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
            <Select mode="tags" className="w-100" placeholder="Select tags"
                    id={category.name}
                    open={open}
                    defaultValue={imageTags.map(tag => tag.id)}
                    onFocus={() => setOpen(true)}
                    onBlur={() => setOpen(false)}
                    onSelect={(value) => {
                        if (tagsIds.indexOf(value) === -1) {
                            addTagToCategory(categoryObj.id, value).then(() => getCategories())
                        }
                        addTag(imageObj.id, categoryObj.id, value).then(() => setOpen(false))
                    }}
                    onDeselect={(value => removeTag(imageObj.id, categoryObj.id, value))}
            >
                {
                    category.tags && category.tags.map((tag, index) =>
                        <Select.Option key={`${tag.id}-${index}-${Math.random()}`} value={tag.id}>{tag.id}</Select.Option>
                    )
                }
            </Select>
        </div>
    )
}
