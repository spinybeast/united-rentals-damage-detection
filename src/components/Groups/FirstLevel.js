import React, { Fragment } from 'react';
import * as _ from 'lodash';
import ImageCard from '../ImageCard/ImageCard';
import SecondLevel from './SecondLevel';
import {filterByCategory, filterByField} from "../../helpers/image";
import {getCategoryName} from "../../helpers/category";

export default function FirstLevel({images, categories, groupBy, groupBySecond, getCategories}) {
    let isCategory = groupBy === 'category';
    const groups = isCategory ?
        categories.map(category => category.id) :
        _.uniq(images.map(imageObj => imageObj.image[groupBy]));

    return (
        <div className="container-fluid">
            {
                groups.map((group, index) => {
                    const groupImages = isCategory ?
                        filterByCategory(images, group) :
                        filterByField(images, groupBy, group);

                    return <Fragment key={`second-${index}`}>
                        <h3 className="text-center">{isCategory ? getCategoryName(categories, group) : group}</h3>
                        <div className="row bg-light mb-3 py-3" key={index}>
                            {
                                groupBySecond ? <SecondLevel key={`second2-${index}`} images={groupImages} groupBy={groupBySecond} categories={categories} getCategories={getCategories}/> :
                                    groupImages.map((image, index) => <ImageCard key={`image-${index}-${image.id}`}
                                                                             imageObj={image}
                                                                             categories={categories}
                                                                                 getCategories={getCategories}/>)
                            }
                        </div>
                    </Fragment>

                })
            }
        </div>
    )
}
