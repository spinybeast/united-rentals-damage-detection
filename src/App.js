import React, {useEffect, useState} from 'react';
import {Alert, Spin} from "antd";
import {fetchCategories, fetchImages} from './helpers/api';
import {filterByGroup} from './helpers/image';
import ImageCard from './components/ImageCard/ImageCard';
import Filters from './components/Filters/Filters';
import FirstLevel from './components/Groups/FirstLevel'

function App() {
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [groupFirstLevel, setGroupFirstLevel] = useState(null);
    const [groupSecondLevel, setGroupSecondLevel] = useState(null);

    function getCategories() {
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
    }

    function getImages() {
        fetchImages()
            .then(res => res.json())
            .then(res => {
                setImages(res);
                setFilteredImages(res);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }

    useEffect(() => {
        getImages();
        getCategories();
    }, []);

    return (
        <Spin tip="Loading..." spinning={loading}>
            <Alert showIcon={false} message="United rentals damage detection" className="text-center" banner/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        {error && <Alert message="API error" type="error"/>}
                        <Filters images={images}
                                 categories={categories}
                                 onFilter={(value) => setFilteredImages(filterByGroup(images, value))}
                                 groupFirstLevel={groupFirstLevel}
                                 setGroupFirstLevel={setGroupFirstLevel}
                                 setGroupSecondLevel={setGroupSecondLevel}
                        />
                    </div>
                    {
                        groupFirstLevel !== null ? <FirstLevel images={filteredImages} groupBy={groupFirstLevel}
                                                      groupBySecond={groupSecondLevel} categories={categories}
                                                      getCategories={getCategories}/> :
                            filteredImages.map((image, index) => <ImageCard key={`image-${index}-${image.id}`}
                                                                            imageObj={image}
                                                                            categories={categories}
                                                                            getCategories={getCategories}
                            />)
                    }
                </div>
            </div>
        </Spin>
    );
}

export default App;

