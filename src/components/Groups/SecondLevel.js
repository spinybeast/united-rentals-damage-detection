import React, { Fragment } from 'react';
import * as _ from 'lodash';
import ImageCard from '../ImageCard/ImageCard';

export default function SecondLevel({images, categories, groupBy}) {
    const groups = _.uniq(images.map(imageObj => imageObj.image[groupBy]));

    return (
        <Fragment>
            {
                groups.map((group, index) => {
                    const groupImages = _.filter(images, (imageObj => {
                        return imageObj.image[groupBy] === group
                    }));

                    const colWidth = 12/groups.length;
                    return <div className={`border-right border-primary col-sm-${colWidth}`} key={index}>
                            <h5 className="text-center">{group}</h5>
                            <div className="row ">
                            {
                                    groupImages.map((image, index) => <ImageCard key={`image-${index}-${image.id}`}
                                                                                 secondGroup={groups.length > 1}
                                                                                 imageObj={image}
                                                                                 categories={categories}/>)
                            }
                            </div>
                        </div>
                })
            }
        </Fragment>
    )
}
