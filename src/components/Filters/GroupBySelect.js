import { Select } from 'antd';
import React from 'react';

export function GroupBySelect({title, onSelectGroup, disabled}) {
    return (
        <div className="form-group row">
            <label className="col-md-2 col-form-label font-weight-bold" htmlFor="select">{title}</label>
            <div className="col-md-10">
                <Select className="w-100" defaultValue={null} onChange={(value => onSelectGroup(value))} id="select" disabled={disabled}>
                    <Select.Option value={null}>---</Select.Option>
                    <Select.Option value={'source_file'}>Source file</Select.Option>
                    <Select.Option value={'group'}>Group</Select.Option>
                    <Select.Option value={'phase'}>Phase</Select.Option>
                    <Select.Option value={'status'}>Status</Select.Option>
                    <Select.Option value={'category'}>Category</Select.Option>
                </Select>
            </div>
        </div>
    )
}
