import React, {useEffect, useState} from 'react';
import {Alert, Spin} from "antd";

import {fetchCategories, fetchImages} from './actions/api';
import ImageCard from './components/ImageCard/ImageCard';
import Filters from './components/Filters/Filters';
import * as _ from 'lodash';

function App() {
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetchImages()
            .then(res => res.json())
            .then(res => {
                setImages(res);
                setFilteredImages(res);
                setGroups(_.uniq(res.map(imageObj => imageObj.image.group)));
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
        fetchCategories()
            .then(res => res.json())
            .then(res => {
                setCategories(res);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    return (
        <Spin tip="Loading..." spinning={loading}>
            <Alert showIcon={false} message="United rentals damage detection" className="text-center" banner/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        {error && <Alert message="API error" type="error"/>}
                        <Filters groups={groups} onSelectGroup={(value) => {
                            setFilteredImages(_.filter(images, (imageObj => {
                                if (value === null) {
                                    return true;
                                }
                                return imageObj.image.group === value
                            })));
                        }
                        }/>
                    </div>
                    {
                        filteredImages.map((image, index) => <ImageCard key={`image-${index}-${image.id}`}
                                                                        imageObj={image}
                                                                        categories={categories}/>)
                    }
                </div>
            </div>
        </Spin>
    );
}

export default App;
