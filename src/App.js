import React, { useEffect, useState } from 'react';
import { Alert, Spin } from "antd";

import { fetchCategories, fetchImages } from './actions/api';
import Image from './components/Image/Image';
import Filters from './components/Filters/Filters';

function App() {
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchImages()
            .then(res => res.json())
            .then(res => {
                setImages(res);
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
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            {error && <Alert message="API error" type="danger"/>}
                            <Filters categories={categories} images={images}/>
                        </div>
                        {
                            images.map(image => <Image imageObj={image} categories={categories}/>)
                        }
                    </div>
                </div>
            </Spin>
    );
}

export default App;
