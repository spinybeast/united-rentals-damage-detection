import { Select } from 'antd';
import React from 'react';
import { useGlobal } from 'reactn';

export function GroupBySelect({title}) {

    return (
        <div className="form-group row">
            <label className="col-md-2 col-form-label font-weight-bold" htmlFor="select">{title}</label>
            <div className="col-md-10">
                <Select className="w-100" defaultValue={null} onChange={(value => (value))} id="select">
                    <Select.Option value={null} disabled={true}>Nothing selected</Select.Option>
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
