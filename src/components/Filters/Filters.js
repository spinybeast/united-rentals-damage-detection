import React from 'react';
import { Select } from 'antd';
import { GroupBySelect } from './GroupBySelect';
import * as _ from "lodash";
import { tagToFilter } from "../../helpers/category";
import { CategoryForm } from './CategoryForm';

export default function Filters({images, categories, onFilter, setGroupFirstLevel, setGroupSecondLevel, groupFirstLevel, getCategories}) {
    const imageFilter = _.uniq(images.map(imageObj => imageObj.image.group));
    const tagsFilter = _.flatten(categories.map(categoryObj => {
        return categoryObj.category.tags.map(tag => {
            return {id: tag.id, category: categoryObj.id}
        })
    }));
    return (
        <form>
            <div className="form-row">
                <div className="col">
                    <label htmlFor="select">Select group</label>
                    <Select key="filters" className="w-100" defaultValue={null}
                            onChange={(value => onFilter(value))} id="select">
                        <Select.Option key="filters-null" value={null}>---</Select.Option>
                        {imageFilter.map((value, index) => <Select.Option key={`filters-image-${index}`}
                                                                          value={value}>{value}</Select.Option>)}
                        {tagsFilter.map((tag) => <Select.Option key={`filters-${tagToFilter(tag)}`}
                                                                value={tagToFilter(tag)}>{tag.id}</Select.Option>)}
                    </Select>
                </div>

                <GroupBySelect title={'Group first level'} onSelectGroup={setGroupFirstLevel} categories={categories}/>
                <GroupBySelect title={'Group second level'} onSelectGroup={setGroupSecondLevel}
                               disabled={groupFirstLevel === null} categories={categories}/>
                <div className="col">
                    <label htmlFor="add">Add category</label>
                    <CategoryForm getCategories={getCategories}/>
                </div>
            </div>
        </form>
    );
}
