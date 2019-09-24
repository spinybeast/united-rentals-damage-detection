import React, { Fragment } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import SecondLevel from './SecondLevel';
import { filterByTag, filterByField, getGroups } from "../../helpers/image";
import { getTagName } from "../../helpers/category";

export default function FirstLevel({images, categories, groupBy, groupBySecond, getCategories, getImages, lastImage, setOpenedImage}) {
    const isCategory = !isNaN(groupBy);
    const groups = getGroups(groupBy, images, categories);

    return (
        <div className="container-fluid">
            {
                groups.map((group, index) => {
                    const groupImages = isCategory ?
                        filterByTag(images, group) :
                        filterByField(images, groupBy, group);

                    return <Fragment key={`second-${index}`}>
                        <h3 className="text-center">{isCategory ? getTagName(group) : group}</h3>
                        <div className="row bg-light mb-3 py-3" key={index}>
                            {
                                groupBySecond !== null
                                    ? <SecondLevel key={`second2-${index}`} images={groupImages} groupBy={groupBySecond}
                                                   categories={categories} getCategories={getCategories}
                                                   getImages={getImages} lastImage={lastImage} setOpenedImage={setOpenedImage}/> :
                                    groupImages.map((image, index) => <ImageCard key={`image-${index}-${image.id}`}
                                                                                 imageObj={image}
                                                                                 categories={categories}
                                                                                 getCategories={getCategories}
                                                                                 setOpenedImage={setOpenedImage}
                                    />)
                            }
                        </div>
                    </Fragment>

                })
            }
        </div>
    )
}
