import React, { Fragment } from 'react';
import * as _ from 'lodash';
import ImageCard from '../ImageCard/ImageCard';
import {filterByCategory, filterByField} from "../../helpers/image";
import {getCategoryName} from "../../helpers/category";

export default function SecondLevel({images, categories, groupBy, getCategories}) {
    let isCategory = groupBy === 'category';
    const groups = isCategory ?
        categories.map(category => category.id) :
        _.uniq(images.map(imageObj => imageObj.image[groupBy]));

    return (
        <Fragment>
            {
                groups.map((group, index) => {
                    const groupImages = isCategory ?
                        filterByCategory(images, group) :
                        filterByField(images, groupBy, group);

                    const colWidth = 12/groups.length;
                    return <div className={`border-right border-primary col-sm-${colWidth}`} key={index}>
                            <h5 className="text-center">{isCategory ? getCategoryName(categories, group) : group}</h5>
                            <div className="row ">
                            {
                                    groupImages.map((image, index) => <ImageCard key={`image-${index}-${image.id}`}
                                                                                 secondGroup={groups.length > 1}
                                                                                 imageObj={image}
                                                                                 categories={categories}
                                                                                 getCategories={getCategories}
                                    />)
                            }
                            </div>
                        </div>
                })
            }
        </Fragment>
    )
}
