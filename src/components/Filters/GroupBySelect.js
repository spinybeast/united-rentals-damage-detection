import { Select } from 'antd';
import React from 'react';

export function GroupBySelect({title, onSelectGroup, disabled, categories}) {
    return (
        <div className="col">
            <label htmlFor="select">{title}</label>
            <Select className="w-100" defaultValue={null} onChange={(value => onSelectGroup(value))} id="select" disabled={disabled}>
                <Select.Option value={null}>---</Select.Option>
                <Select.Option value={'source_file'}>Source file</Select.Option>
                <Select.Option value={'group'}>Group</Select.Option>
                <Select.Option value={'phase'}>Phase</Select.Option>
                <Select.Option value={'status'}>Status</Select.Option>
                {
                    categories.map(categoryObj => <Select.Option key={categoryObj.id} value={categoryObj.id}>{categoryObj.category.name}</Select.Option>)
                }
            </Select>
        </div>
    )
}
