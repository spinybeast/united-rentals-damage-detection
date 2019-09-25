import React, {useEffect, useState} from 'react';
import {Button, Select, Icon} from 'antd';
import {GroupBySelect} from './GroupBySelect';
import * as _ from "lodash";
import {CategoryForm} from './CategoryForm';
import {IMAGE_LIMIT} from '../../constants';
import {useQueryParams, deserializer, serializer} from '../../hooks/useQueryParams';
import {fetchFilters} from "../../helpers/api";

export default function Filters({images, categories, getCategories}) {
    const [params, setParams] = useQueryParams(deserializer, serializer);
    const [filters, setFilters] = useState([]);
    const tagsFilter = _.flatten(categories.map(categoryObj => {
        return categoryObj.category.tags.map(tag => {
            return {id: tag.id, category: categoryObj.id}
        })
    }));
    const last = _.last(images);

    useEffect(() => {
        fetchFilters()
            .then(res => res.json())
            .then((res) => setFilters(res));
    }, []);

    return (
        <div className="form">
            <div className="form-row">
                <div className="col">
                    <label htmlFor="select">Filter by</label>
                    <Select id="select"
                            key="filters"
                            className="w-100"
                            defaultValue={params.filterby ? [params.filterby, params.filtervalue].join('/') : null}
                            onChange={(value => {
                                const [group, filter] = value.split('/');
                                setParams({...params, filterby: group, filtervalue: filter})
                            })}>
                        <Select.Option key="filters-null" value={null}>---</Select.Option>
                        {
                            filters.map((filter, index) =>
                                <Select.OptGroup key={index} label={filter.attribute}>
                                    {
                                        filter.values.map((value, index) =>
                                            <Select.Option key={index} value={[filter.attribute, value].join('/')}>
                                                {value || '---'}
                                            </Select.Option>)
                                    }
                                </Select.OptGroup>)
                        }
                        <Select.OptGroup key="tags" label="tags">
                            {
                                tagsFilter.map((tag, index) =>
                                    <Select.Option key={tag.id} value={'tags/' + tag.id}>
                                        {tag.id}
                                    </Select.Option>)
                            }
                        </Select.OptGroup>
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
                               disabled={params.group1 === null}/>
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
                                onClick={() => setParams({...params, after: last ? last.id : 0})}>next<Icon
                            type="right"/></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
