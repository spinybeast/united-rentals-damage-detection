import React from 'react';
import {IMAGE_URL} from '../../constants';
import {CategoryTags} from './CategoryTags';

export default function ImageCard({imageObj, categories, secondGroup = false, getCategories}) {
    const {id, image} = imageObj;

    return (
        <div className={secondGroup ? 'col-3' : 'col-2'}>
            <div className="card">
                <div className="card-body p-0">
                    <img key={id} className="img-fluid w-100" src={IMAGE_URL + image.image}
                         alt={image.source_file}/>
                    {image.annotation && <div className="px-3">{image.annotation}</div>}
                    <div className="card-footer">
                        {
                            categories.map((categoryObj, index) => <CategoryTags
                                key={`category-tags-${index}-${categoryObj.id}`}
                                categoryObj={categoryObj}
                                imageObj={imageObj}
                                getCategories={getCategories}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
