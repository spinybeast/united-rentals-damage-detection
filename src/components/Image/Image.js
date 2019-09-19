import React from 'react';
import { IMAGE_URL } from '../../constants';
import { Select } from 'antd';

export default function Image({imageObj, categories}) {
    const {id, image} = imageObj;

    return (
        <div className="col-md-2 col-sm-3">
            <div className="card">
                <div className="card-body p-0">
                    <img key={id} className="img-fluid w-100" src={IMAGE_URL + image.image}
                         alt={image.source_file}/>
                    <div className="card-footer">
                        {
                            categories.map(categoryObj =>
                                <div>
                                    <label className="col-form-label pb-0" htmlFor={categoryObj.category.name}>
                                        {categoryObj.category.name}
                                    </label>
                                    <Select mode="tags" className="w-100" placeholder="Select tags"
                                            id={categoryObj.category.name}>
                                        {
                                            categoryObj.category.tags.map(tag =>
                                                <Select.Option value={tag.id}>{tag.id}</Select.Option>
                                            )
                                        }
                                    </Select>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}
