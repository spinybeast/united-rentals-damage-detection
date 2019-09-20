import React from 'react';
import { Select } from 'antd';
import { GroupBySelect } from './GroupBySelect';
import * as _ from "lodash";

export default function Filters({images, categories, onFilter, setGroupFirstLevel, setGroupSecondLevel, groupFirstLevel}) {
    const imageFilter = _.uniq(images.map(imageObj => imageObj.image.group));

    return (
        <div className="form">
            <div className="form-group row">
                <label className="col-md-2 col-form-label font-weight-bold" htmlFor="select">Select group</label>
                <div className="col-md-10">
                    <Select key="filters" className="w-100" defaultValue={null} onChange={(value => onFilter(value))} id="select">
                        <Select.Option key="filters-null" value={null}>---</Select.Option>
                        {imageFilter.map((value, index) => <Select.Option key={`filters-image-${index}`} value={value}>{value}</Select.Option>)}
                        {categories.map((categoryObj, index) => <Select.Option key={`filters-cat-${index}`} value={categoryObj.id}>{categoryObj.category.name}</Select.Option>)}
                    </Select>
                </div>
            </div>
            <GroupBySelect title={'Group first level'} onSelectGroup={setGroupFirstLevel}/>
            <GroupBySelect title={'Group second level'} onSelectGroup={setGroupSecondLevel} disabled={groupFirstLevel === null}/>
        </div>
    );
}
