import React from 'react';
import { Button, Input } from 'antd';
import { addCategory } from '../../actions/api';

export function CategoryForm({value, onRemove, onChange}) {
    function handleAdd() {
        addCategory({name: value, tags: []}).then(category => window.location.reload());
        onRemove();
    }

    return (
        <div className="mt-3">
            <Input.Group compact>
                <Input style={{width: '80%'}} placeholder="Enter category name" value={value}
                       onChange={onChange} onPressEnter={() => handleAdd(value)}/>
                <Button style={{width: '10%'}} icon="check" disabled={!value.length} onClick={() => handleAdd(value)}/>
                <Button style={{width: '10%'}} icon="close" onClick={() => onRemove()}/>
            </Input.Group>
        </div>

    );

}
