import React, { Fragment } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import SecondLevel from './SecondLevel';
import { filterByTag, filterByField, getGroups } from '../../helpers/image';
import { getTagName } from '../../helpers/category';
import { useQueryParams, deserializer, serializer } from '../../hooks/useQueryParams';

export default function FirstLevel({images, categories, getCategories, getImages, setOpenedImage}) {
    const [params,] = useQueryParams(deserializer, serializer);
    const isCategory = !isNaN(params.group1);
    const groups = getGroups(params.group1, images, categories);

    return (
        <div className="container-fluid">
            {
                groups.map((group, index) => {
                    const groupImages = isCategory ?
                        filterByTag(images, group) :
                        filterByField(images, params.group1, group);

                    return <Fragment key={`second-${index}`}>
                        <h3 className="text-center">{isCategory ? getTagName(group) : group}</h3>
                        <div className="row bg-light mb-3 py-3" key={index}>
                            {
                                params.group2 !== null
                                    ? <SecondLevel key={`second2-${index}`} images={groupImages}
                                                   categories={categories} getCategories={getCategories}
                                                   getImages={getImages} setOpenedImage={setOpenedImage}/> :
                                    groupImages.map((image, index) => <ImageCard key={`image-${index}-${image.id}`}
                                                                                 imageObj={image}
                                                                                 categories={categories}
                                                                                 getCategories={getCategories}
                                                                                 getImages={getImages}
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
