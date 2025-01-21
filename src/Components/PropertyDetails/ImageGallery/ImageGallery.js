import Slider from "react-slick";
//import {useState, useEffect, useRef} from "react";
import React, {useState} from "react";
import Fancybox from "../../Fancybox/Fancybox";
import './style.css'

export const ImageGallery = ({imageGallery}) => {
    //const [showAllImages, setShowAllImages] = useState(false);
    // const [nav1, setNav1] = useState(null);
    // const [nav2, setNav2] = useState(null);
    // let sliderRef1 = useRef(null);
    // let sliderRef2 = useRef(null);
    //
    // useEffect(() => {
    //     setNav1(sliderRef1);
    //     setNav2(sliderRef2);
    // }, []);

    var settings = {
        dots: false,
        speed: 500,
        arrows: true,
        slidesToShow: 2,
        slidesToScroll: 1,
    };

    // const handleShowAllClick = () => {
    //     setShowAllImages(true);
    // };

    const totalImages = imageGallery.length - 5;

    return (
        // <div className="image-gallery mb-4">
        //     <Fancybox
        //         options={{
        //             Carousel: {
        //                 infinite: false,
        //             },
        //         }}
        //     >
        //         {imageGallery && imageGallery.map((image, index) => (
        //             <a key={index} data-fancybox="gallery" href={`https://cdn.repliers.io/${image}`}>
        //                 <img src={`https://cdn.repliers.io/${image}?class=medium`} alt={`Image ${index + 1}`}/>
        //             </a>
        //         ))}
        //     </Fancybox>
        // </div>


        <div className="image-gallery mb-2">
            <Fancybox
                options={{
                    Carousel: {
                        infinite: false,
                    },
                }}
            >
                {imageGallery.slice(0, 5).map((image, index) => (
                    <a key={index} data-fancybox="gallery" href={`https://cdn.repliers.io/${image}`}>
                        <img src={`https://cdn.repliers.io/${image}?class=medium`} alt={`Image ${index + 1}`}/>
                    </a>
                ))}


                {
                    imageGallery.slice(5).map((image, index) => (
                    <a key={index} data-fancybox="gallery" href={`https://cdn.repliers.io/${image}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M464 448H96c-35.35 0-64-28.65-64-64V112C32 103.2 24.84 96 16 96S0 103.2 0 112V384c0 53.02 42.98 96 96 96h368c8.836 0 16-7.164 16-16S472.8 448 464 448zM224 152c13.26 0 24-10.75 24-24s-10.74-24-24-24c-13.25 0-24 10.75-24 24S210.8 152 224 152zM410.6 139.9c-11.28-15.81-38.5-15.94-49.1-.0313l-44.03 61.43l-6.969-8.941c-11.44-14.46-36.97-14.56-48.4 .0313L198.2 272.8C191 281.9 190 294.3 195.5 304.3C200.8 313.1 211.1 320 222.4 320h259.2c11 0 21.17-5.805 26.54-15.09c0-.0313-.0313 .0313 0 0c5.656-9.883 5.078-21.84-1.578-31.15L410.6 139.9zM226.2 287.9l58.25-75.61l20.09 25.66c4.348 5.545 17.6 10.65 25.59-.5332l54.44-78.75l92.68 129.2H226.2zM512 32H160c-35.35 0-64 28.65-64 64v224c0 35.35 28.65 64 64 64H512c35.35 0 64-28.65 64-64V96C576 60.65 547.3 32 512 32zM544 320c0 17.64-14.36 32-32 32H160c-17.64 0-32-14.36-32-32V96c0-17.64 14.36-32 32-32h352c17.64 0 32 14.36 32 32V320z"/></svg>
                        <span>+ {totalImages}</span>
                    </a>
                ))}
            </Fancybox>
        </div>

    );
}