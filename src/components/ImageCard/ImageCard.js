import React, { useState } from 'react';
import { IMAGE_URL } from '../../constants';
import { CategoryTags } from './CategoryTags';
import { CategoryForm } from './CategoryForm';
import {Button, Popover, Tooltip} from 'antd';

export default function ImageCard({imageObj, categories, secondGroup = false, getCategories}) {
    const {id, image} = imageObj;
    const [forms, setForms] = useState([]);
    const [visible, setVisible] = useState(false);

    function handleChange(i, event) {
        const values = [...forms];
        values[i].value = event.target.value;
        setForms(values);
    }

    function handleAdd() {
        const values = [...forms];
        values.push({ value: null });
        setForms(values);
    }

    function handleRemove(i) {
        const values = [...forms];
        values.splice(i, 1);
        setForms(values);
    }
    const content = <div>
        {
            categories.map((categoryObj, index) => <CategoryTags key={`category-tags-${index}-${categoryObj.id}`}
                                                                 categoryObj={categoryObj}
                                                                 imageObj={imageObj}
                                                                 getCategories={getCategories}/>)
        }
        <Button type={'link'} className="text-primary p-0" href="#" onClick={handleAdd}>Add category</Button>
        {
            forms.map((form, idx) =>
                <CategoryForm
                    key={idx}
                    value={form.value || ''}
                    onChange={e => handleChange(idx, e)}
                    onRemove={() => handleRemove(idx)}
                    getCategories={getCategories}
                />)
        }
    </div>;
    return (
        <div className={secondGroup ? 'col-3' : 'col-2'}>
            <Popover content={content} trigger="click"
                     visible={visible}
                     onVisibleChange={(open) => setVisible(open)}>
                <Tooltip title={image.annotation}>
                    <img key={id} className="img-fluid img-thumbnail w-100" src={IMAGE_URL + image.image} alt={image.source_file}/>
                </Tooltip>
            </Popover>
        </div>
    );
}
