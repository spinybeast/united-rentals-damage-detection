import React, { useEffect, useState, useCallback } from 'react';
import { Alert, Spin } from "antd";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { fetchCategories, fetchImages } from '../helpers/api';
import ImageCard from '../components/ImageCard/ImageCard';
import Filters from '../components/Filters/Filters';
import FirstLevel from '../components/Groups/FirstLevel'
import { useQueryParams, deserializer, serializer } from '../hooks/useQueryParams';

function Main() {
    const [params,] = useQueryParams(deserializer, serializer);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [openedImage, setOpenedImage] = useState(null);

    function getCategories() {
        setLoading(true);
        fetchCategories()
            .then(res => {
                if (res.error) {
                    setError(res.error.message);
                } else {
                    setCategories(res);
                }
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }

    const getImages = useCallback(() => {
        setLoading(true);
        fetchImages(params.after, params.filterby, params.filtervalue)
            .then(res => {
                if (res.error) {
                    setError(res.error.message);
                } else {
                    setImages(res);
                }
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [params.after, params.filterby, params.filtervalue]);

    useEffect(() => {
        getCategories()
    }, []);
    useEffect(() => {
        getImages();
    }, [getImages]);

    return (
        <Spin tip="Loading..." spinning={loading}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 position-fixed bg-light menu pb-3 border-bottom">
                        <Filters images={images}
                                 categories={categories}
                                 getCategories={getCategories}
                        />
                    </div>
                </div>
                <div className="row content">
                    {error && <Alert className="col-12" message={error} type="error" banner/>}
                    {
                        params.group1 !== null ? <FirstLevel images={images}
                                                             categories={categories}
                                                             getCategories={getCategories}
                                                             getImages={getImages}
                                                             setOpenedImage={setOpenedImage}
                            /> :
                            images.map((image, index) => <ImageCard key={`image-${index}-${image.id}`}
                                                                    imageObj={image}
                                                                    categories={categories}
                                                                    getCategories={getCategories}
                                                                    getImages={getImages}
                                                                    setOpenedImage={setOpenedImage}
                            />)
                    }
                </div>
            </div>
            {openedImage !== null && (
                <Lightbox
                    mainSrc={openedImage}
                    onCloseRequest={() => setOpenedImage(null)}
                />
            )}
        </Spin>
    );
}

export default Main;

