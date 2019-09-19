import React from 'react';
import {Button, Select, Popconfirm} from 'antd';
import {addTag, addTagToCategory, removeCategory, removeTag} from '../../actions/api';
import * as _ from 'lodash';

export function CategoryTags({imageObj, categoryObj}) {
    const {category} = categoryObj;
    const {image} = imageObj;
    const tags = _.filter(image.tags || [], tag => tag.category === categoryObj.id);
    const tagsIds = tags.map(tag => tag.id);
    return (
        <div>
            <label className="col-form-label pb-0" htmlFor={category.name}>
                {category.name}
                <Popconfirm
                    title="Are you sure delete this category?"
                    onConfirm={() => removeCategory(categoryObj.id).then(category => window.location.reload)}
                >
                    <Button type={'link'} icon={'close'} size={'small'} className="text-danger p-0"/>
                </Popconfirm>
                </label>
            <Select mode="tags" className="w-100" placeholder="Select tags"
                    id={category.name}
                    defaultValue={tagsIds}
                    onSelect={(value) => {
                        if (tagsIds.indexOf(value) === -1) {
                            addTagToCategory(categoryObj.id, value)
                        }
                        addTag(imageObj.id, categoryObj.id, value)}
                    }
                    onDeselect={(value => removeTag(imageObj.id, categoryObj.id, value))}
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
