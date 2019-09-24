import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { addCategory } from '../../helpers/api';

export function CategoryForm({getCategories}) {
    const [value, setValue] = useState('');

    function handleAdd() {
        addCategory({name: value, tags: []}).then(() => getCategories());
        setValue('');
    }

    return (
        <Input.Group compact>
            <Input style={{width: '90%'}} placeholder="Enter category name" value={value}
                   onChange={(e) => setValue(e.target.value)} onPressEnter={() => handleAdd()}/>
            <Button style={{width: '10%'}} icon="check" disabled={!value.length} onClick={() => handleAdd()}/>
        </Input.Group>
    );

}
