import React from 'react';
import { Select } from 'antd';
import { GroupBySelect } from './GroupBySelect';

export default function Filters({groups, onSelectGroup, setGroupFirstLevel, setGroupSecondLevel, groupFirstLevel}) {

    return (
        <div className="form">
            <div className="form-group row">
                <label className="col-md-2 col-form-label font-weight-bold" htmlFor="select">Select group</label>
                <div className="col-md-10">
                    <Select className="w-100" defaultValue={null} onChange={(value => onSelectGroup(value))} id="select">
                        <Select.Option value={null}>---</Select.Option>
                        {groups.map((group, index) => <Select.Option key={index} value={group}>{group}</Select.Option>)}
                    </Select>
                </div>
            </div>
            <GroupBySelect title={'Group first level'} onSelectGroup={setGroupFirstLevel}/>
            <GroupBySelect title={'Group second level'} onSelectGroup={setGroupSecondLevel} disabled={groupFirstLevel === null}/>
        </div>
    );
}
