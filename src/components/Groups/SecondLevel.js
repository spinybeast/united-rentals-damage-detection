import React, {Fragment} from 'react';
import ImageCard from '../ImageCard/ImageCard';
import {filterByTag, filterByField, getGroups} from "../../helpers/image";
import {getTagName} from "../../helpers/category";

export default function SecondLevel({images, categories, groupBy, getCategories}) {
    const isCategory = !isNaN(groupBy);
    const groups = getGroups(groupBy, images, categories);

    return (
        <Fragment>
            {
                groups.map((group, index) => {
                    const groupImages = isCategory ?
                        filterByTag(images, group) :
                        filterByField(images, groupBy, group);

                    return groupImages.length > 0 ?
                        <div className="col-6 p-2" key={index}>
                            <div className="border border-secondary rounded">
                            <h5 className="text-center">{isCategory ? getTagName(group) : group}</h5>
                            <div className="row ">
                                {
                                    groupImages.map((image, index) => <ImageCard key={`image-${index}-${image.id}`}
                                                                                 secondGroup={true}
                                                                                 imageObj={image}
                                                                                 categories={categories}
                                                                                 getCategories={getCategories}
                                    />)
                                }
                            </div>
                            </div>
                        </div> : null;
                })
            }
        </Fragment>
    )
}
