import React, { Fragment } from 'react';
import * as _ from 'lodash';
import ImageCard from '../ImageCard/ImageCard';
import SecondLevel from './SecondLevel';

export default function FirstLevel({images, categories, groupBy, groupBySecond}) {
    const groups = _.uniq(images.map(imageObj => imageObj.image[groupBy]));

    return (
        <div className="container-fluid">
            {
                groups.map((group, index) => {
                    const groupImages = _.filter(images, (imageObj => {
                        return imageObj.image[groupBy] === group
                    }));

                    return <Fragment key={`second-${index}`}>
                        <h3 className="text-center">{group}</h3>
                        <div className="row bg-light mb-3 py-3" key={index}>
                            {
                                groupBySecond ? <SecondLevel key={`second2-${index}`} images={groupImages} groupBy={groupBySecond} categories={categories}/> :
                                    groupImages.map((image, index) => <ImageCard key={`image-${index}-${image.id}`}
                                                                             imageObj={image}
                                                                             categories={categories}/>)
                            }
                        </div>
                    </Fragment>

                })
            }
        </div>
    )
}
