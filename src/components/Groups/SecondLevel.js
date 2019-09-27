import React, {Fragment} from 'react';
import ImageCard from '../ImageCard/ImageCard';
import {filterByTag, filterByField, getGroups} from "../../helpers/image";
import {getTagName} from "../../helpers/category";
import { GroupTags } from './GroupTags';
import { useQueryParams, deserializer, serializer } from '../../hooks/useQueryParams';

export default function SecondLevel({images, categories, getCategories, getImages, setOpenedImage}) {
    const [params,] = useQueryParams(deserializer, serializer);
    const isCategory = !isNaN(params.group2);
    const groups = getGroups(params.group2, images, categories);

    return (
        <Fragment>
            {
                groups.map((group, index) => {
                    const groupImages = isCategory ?
                        filterByTag(images, group) :
                        filterByField(images, params.group2, group);

                    return groupImages.length > 0 ?
                        <div className="col-6 p-2" key={index}>
                            <div className="border border-secondary rounded overflow-hidden">
                            <h5 className="text-center">{isCategory ? getTagName(group) : group}</h5>
                                <div className="row px-2 pb-2 mb-2 border-bottom border-top border-secondary bg-white">{
                                    categories.map((categoryObj, index) => <GroupTags
                                        key={index}
                                        categoryObj={categoryObj}
                                        images={groupImages}
                                        getCategories={getCategories}
                                        getImages={getImages}
                                    />)
                                }
                                </div>
                            <div className="row ">
                                {
                                    groupImages.map((image, index) => <ImageCard key={`image-${index}-${image.id}`}
                                                                                 secondGroup={true}
                                                                                 imageObj={image}
                                                                                 categories={categories}
                                                                                 getCategories={getCategories}
                                                                                 getImages={getImages}
                                                                                 setOpenedImage={setOpenedImage}
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
