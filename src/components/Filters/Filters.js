import React from 'react';
import { Button, Select, Icon } from 'antd';
import { GroupBySelect } from './GroupBySelect';
import * as _ from "lodash";
import { tagToFilter } from "../../helpers/category";
import { CategoryForm } from './CategoryForm';
import { IMAGE_LIMIT } from '../../constants';
import { useQueryParams, deserializer, serializer } from '../../hooks/useQueryParams';

export default function Filters({images, categories, onFilter, getCategories}) {
    const [params, setParams] = useQueryParams(deserializer, serializer);

    const imageFilter = _.uniq(images.map(imageObj => imageObj.image.group));
    const tagsFilter = _.flatten(categories.map(categoryObj => {
        return categoryObj.category.tags.map(tag => {
            return {id: tag.id, category: categoryObj.id}
        })
    }));
    const last = _.last(images);

    return (
        <div className="form">
            <div className="form-row">
                <div className="col">
                    <label htmlFor="select">Filter by</label>
                    <Select key="filters" className="w-100" defaultValue={null}
                            onChange={(value => onFilter(value))} id="select">
                        <Select.Option key="filters-null" value={null}>---</Select.Option>
                        {imageFilter.map((value, index) => <Select.Option key={`filters-image-${index}`}
                                                                          value={value}>{value}</Select.Option>)}
                        {tagsFilter.map((tag) => <Select.Option key={`filters-${tagToFilter(tag)}`}
                                                                value={tagToFilter(tag)}>{tag.id}</Select.Option>)}
                    </Select>
                </div>
                <GroupBySelect title={'Group first level'}
                               value={params.group1}
                               categories={categories}
                               onSelectGroup={(group) => {
                                   if (group === null) {
                                       setParams({...params, group1: null, group2: null})
                                   } else {
                                       setParams({...params, group1: group})
                                   }
                               }}
                               />
                <GroupBySelect title={'Group second level'}
                               value={params.group2}
                               categories={categories}
                               onSelectGroup={(group) => setParams({...params, group2: group})}
                               disabled={params.group1 === null} />
                <div className="col">
                    <label htmlFor="add">Add category</label>
                    <CategoryForm getCategories={getCategories}/>
                </div>
                <div className="col">
                    <label>Change page</label>
                    <div>
                        <Button icon="left" disabled={params.after <= 0}
                                onClick={() => setParams({...params, after: params.after - IMAGE_LIMIT})}>prev</Button>
                        <Button disabled={!images.length}
                                onClick={() => setParams({...params, after: last ? last.id : 0})}>next<Icon type="right"/></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
