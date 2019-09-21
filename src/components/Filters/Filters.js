import React from 'react';
import { Select } from 'antd';
import { GroupBySelect } from './GroupBySelect';
import * as _ from "lodash";
import {tagToFilter} from "../../helpers/category";

export default function Filters({images, categories, onFilter, setGroupFirstLevel, setGroupSecondLevel, groupFirstLevel}) {
    const imageFilter = _.uniq(images.map(imageObj => imageObj.image.group));
    const tagsFilter = _.flatten(categories.map(categoryObj => {
        return categoryObj.category.tags.map(tag => {return {id: tag.id, category: categoryObj.id}})
    }));
    return (
        <div className="form">
            <div className="form-group row">
                <label className="col-md-2 col-form-label font-weight-bold" htmlFor="select">Select group</label>
                <div className="col-md-10">
                    <Select key="filters" className="w-100" defaultValue={null} onChange={(value => onFilter(value))} id="select">
                        <Select.Option key="filters-null" value={null}>---</Select.Option>
                        {imageFilter.map((value, index) => <Select.Option key={`filters-image-${index}`} value={value}>{value}</Select.Option>)}
                        {tagsFilter.map((tag) => <Select.Option key={`filters-${tagToFilter(tag)}`} value={tagToFilter(tag)}>{tag.id}</Select.Option>)}
                    </Select>
                </div>
            </div>
            <GroupBySelect title={'Group first level'} onSelectGroup={setGroupFirstLevel} categories={categories}/>
            <GroupBySelect title={'Group second level'} onSelectGroup={setGroupSecondLevel} disabled={groupFirstLevel === null} categories={categories}/>
        </div>
    );
}
