import { Select } from 'antd';
import React from 'react';
import {commonFilters} from '../../constants';

export function GroupBySelect({title, value, onSelectGroup, disabled, categories}) {
    return (
        <div className="col">
            <label htmlFor="select">{title}</label>
            <Select className="w-100" value={value} onChange={(value => onSelectGroup(value))} id="select" disabled={disabled}>
                <Select.Option value={null}>---</Select.Option>
                {
                    commonFilters.map(({name, value}) => <Select.Option value={value}>{name}</Select.Option>)
                }
                {
                    categories.map(categoryObj => <Select.Option key={categoryObj.id} value={categoryObj.id}>{categoryObj.category.name}</Select.Option>)
                }
            </Select>
        </div>
    )
}
