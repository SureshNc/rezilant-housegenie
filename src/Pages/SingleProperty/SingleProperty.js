import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {ImageGallery} from "../../Components/PropertyDetails/ImageGallery/ImageGallery";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.css'
import PriceFormatter from "../../Components/PriceFormatter/PriceFormatter";
import ElapsedTime from "../../Components/ElapsedTime/ElapsedTime";
import FormatDate from "../../Components/FormatDate/FormatDate";
import {PropertyCard} from "../../Components/PropertyCard/PropertyCard";
import PropertyMap from "../../Components/PropertyDetails/PropertyMap/PropertyMap";

const SingleProperty = () => {
    const {mlsNumber} = useParams();
    const [property, setProperty] = useState(null);

    // useEffect(() => {
    //     // setLoading(true)
    //     const apiBaseURL = process.env.REACT_APP_API_BASE_URL
    //     const headers = {'REPLIERS-API-KEY': process.env.REACT_APP_API_KEY};
    //     fetch(`${apiBaseURL}/listings/${mlsNumber}`, {headers})
    //         .then(response => response.json())
    //         .then(data => setProperty(data))
    //         .catch(error => console.error('Error fetching data:', error));
    // }, [mlsNumber]);


    useEffect(() => {
        // setLoading(true)
        // const apiBaseURL = process.env.REACT_APP_API_BASE_URL
        // const headers = {'REPLIERS-API-KEY': process.env.REACT_APP_API_KEY};
        fetch(`https://api.repliers.io/listings/${mlsNumber}`, {
            headers: {
                'REPLIERS-API-KEY': 'f2n3UQ8mgLJAaEtHg4YWdc8dQj87qA'
            }
        })
            .then(response => response.json())
            .then(data => setProperty(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [mlsNumber]);

    if (!property) {
        return <div>Loading...</div>;
    }

    const parseNumber = (value) => {
        return parseInt(value, 10) || 0;
    };

    const isValidField = (value) => {
        return value !== "" && value !== "None" && value !== null && value !== undefined && parseFloat(value) !== 0;
    };

    const numKitchens = parseNumber(property.details.numKitchens);
    const numKitchensPlus = parseNumber(property.details.numKitchensPlus);

    const validNumKitchens = isValidField(numKitchens);
    const validNumKitchensPlus = isValidField(numKitchensPlus);
    const totalKitchens = validNumKitchens || validNumKitchensPlus ? numKitchens + numKitchensPlus : 0;

    const displayValidFields = (value) => {
        if (value === "N" || value === "None" || value === "" || value === null) {
            return "No";
        } else if (value === "Y") {
            return "Yes";
        } else {
            return value;
        }
    }

    const amenities = property.nearby.ammenities;
    const amenitiesList = amenities && amenities.length > 0 ? amenities.join(', ') : 'No amenities available';

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    return (
        <div className={'singleProperty'}>
            <div className={'container py-4'}>
                <nav aria-label="breadcrumb">
                    <ul className="breadcrumb mb-1">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item"><a href="/properties/">Properties</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{property.mlsNumber}</li>
                    </ul>
                </nav>
                <ImageGallery imageGallery={property.images}/>
                <div className={'row'}>
                    <div className={'col-lg-9'}>
                        <div className="hg-card bg-grey shadow-none mb-4">
                            <div className="hg-card-body">
                                <div className={'row align-items-end'}>
                                    <div className={'col-md-12'}>
                                        <p className={'d-flex align-items-center justify-content-between'}>
                                            <span>MLS® Number: {property.mlsNumber}</span>
                                            <span className={'badge bg-secondary text-white text-sm'}><ElapsedTime
                                                listingDate={property.listDate}/></span>
                                        </p>
                                    </div>

                                    <div className={'col-md-6'}>
                                        <div className={'price-txt mb-3'}>
                                            <PriceFormatter price={property.listPrice}/>
                                        </div>
                                        {/*<p className={'pb-0'}>*/}
                                        {/*    {property.address.streetNumber},&nbsp;*/}
                                        {/*    {property.address.streetName},&nbsp;*/}
                                        {/*    {property.address.streetSuffix},&nbsp;*/}
                                        {/*    {property.address.city},&nbsp;*/}
                                        {/*    {property.address.state}&nbsp;*/}
                                        {/*    {property.address.zip}</p>*/}
                                        <p className={'pb-0'}>
                                            {property.address.unitNumber !== "" ? `${property.address.unitNumber} - ` : ''}{property.address.streetNumber}&nbsp;
                                            {(property.address.streetDirectionPrefix !== "" && property.address.streetDirectionPrefix !== null && property.address.streetDirectionPrefix !== undefined) ? `${property.address.streetDirectionPrefix} ` : ''}
                                            {property.address.streetName}&nbsp;
                                            {(property.address.streetSuffix !== "" && property.address.streetSuffix !== null && property.address.streetSuffix !== undefined && property.address.streetSuffix !== '0') ? `${property.address.streetSuffix}, ` : ''}
                                        </p>

                                        <p className={'pb-0'}>
                                            {property.address.city},&nbsp;
                                            {property.address.state}&nbsp;
                                            {property.address.zip}.</p>
                                    </div>

                                    <div className={'col-md-6 d-flex justify-content-lg-end'}>
                                        <ul className={'hg-amin-card d-flex align-items-center mb-0'}>
                                            {(property.details.numBedrooms !== "" && property.details.numBedrooms !== null && property.details.numBedrooms !== undefined && property.details.numBedrooms !== '0') ?
                                                <li className={'me-3 me-md-0'}>
                                                    <svg height={'1.5em'} className={'me-2'}
                                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                                        <path
                                                            d="M32 48c0-8.8-7.2-16-16-16S0 39.2 0 48V336v64 64c0 8.8 7.2 16 16 16s16-7.2 16-16V416H608v48c0 8.8 7.2 16 16 16s16-7.2 16-16V400 336 240c0-61.9-50.1-112-112-112H304c-26.5 0-48 21.5-48 48V320H32V48zM608 384H32V352H272 608v32zm0-144v80H288V176c0-8.8 7.2-16 16-16H528c44.2 0 80 35.8 80 80zM96 208a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm128 0A80 80 0 1 0 64 208a80 80 0 1 0 160 0z"/>
                                                    </svg>
                                                    <div className={'d-flex flex-column'}>
                                                        <span className={'text-sm'}>Bed(s)</span>
                                                        <b>{property.details.numBedrooms}{(property.details.numBedroomsPlus !== "" && property.details.numBedroomsPlus !== null && property.details.numBedroomsPlus !== undefined && property.details.numBedroomsPlus !== '0') ? `+${property.details.numBedroomsPlus} ` : ''}</b>
                                                    </div>
                                                </li> : ''}

                                            {(property.details.numBathrooms !== "" && property.details.numBathrooms !== null && property.details.numBathrooms !== undefined && property.details.numBathrooms !== '0') ?
                                                <li className={'me-3 me-md-0 ms-4'}>
                                                    <svg height={'1.6em'} className={'me-2'} viewBox="0 0 24 24"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M5.38517 2.75C4.48209 2.75 3.75 3.48209 3.75 4.38516V11.25H4.03429C4.04516 11.25 4.05599 11.25 4.06675 11.25C4.07208 11.25 4.07739 11.25 4.08268 11.25L19.9332 11.25C19.944 11.25 19.9548 11.25 19.9657 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H21.7321C21.7386 12.7949 21.7433 12.8405 21.7463 12.8864C21.7501 12.9442 21.75 13.0066 21.75 13.0668L21.75 13.1047C21.75 13.4799 21.75 13.6998 21.7344 13.9452C21.5925 16.1815 20.384 18.2467 18.6326 19.597C18.6463 19.6186 18.6591 19.6412 18.6708 19.6646L19.6708 21.6646C19.8561 22.0351 19.7059 22.4856 19.3354 22.6708C18.9649 22.8561 18.5144 22.7059 18.3292 22.3354L17.3615 20.4C16.5597 20.8059 15.6878 21.073 14.7809 21.1648C14.5364 21.1896 14.3872 21.1952 14.133 21.2047L14.1263 21.205C13.3861 21.2328 12.6615 21.25 12 21.25C11.3385 21.25 10.6139 21.2328 9.87368 21.205L9.86699 21.2047C9.61278 21.1952 9.46358 21.1896 9.2191 21.1648C8.31222 21.073 7.44028 20.8059 6.63851 20.4L5.67082 22.3354C5.48558 22.7059 5.03507 22.8561 4.66459 22.6708C4.29411 22.4856 4.14394 22.0351 4.32918 21.6646L5.32918 19.6646C5.34089 19.6412 5.35366 19.6186 5.3674 19.597C3.61596 18.2467 2.4075 16.1815 2.26556 13.9452C2.24999 13.6998 2.24999 13.4798 2.25 13.1046L2.25 13.0827C2.25 13.0774 2.25 13.0721 2.24999 13.0668C2.24999 13.0483 2.24998 13.0296 2.25008 13.0108C2.25003 13.0072 2.25 13.0036 2.25 13V12.75H2C1.58579 12.75 1.25 12.4142 1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H2.25V4.38516C2.25 2.65366 3.65366 1.25 5.38517 1.25C6.66715 1.25 7.81998 2.0305 8.29609 3.22079L8.40623 3.49613C9.19952 3.29489 10.0603 3.34152 10.8717 3.68813C11.887 4.12189 12.6258 4.94029 13.0041 5.90053C13.1526 6.27744 12.975 6.70417 12.6029 6.86436L6.64215 9.43044C6.45572 9.51069 6.24473 9.51197 6.05735 9.43396C5.86997 9.35596 5.72221 9.20535 5.6478 9.01651C5.26959 8.05665 5.24692 6.94515 5.66723 5.91014C5.96643 5.17335 6.45214 4.56929 7.04665 4.13607L6.90338 3.77788C6.65506 3.15708 6.05379 2.75 5.38517 2.75ZM4.08268 12.75C4.04261 12.75 4.01877 12.75 4.00076 12.7502C3.98765 12.7504 3.98298 12.7506 3.98281 12.7506C3.98215 12.7506 3.98276 12.7506 3.98281 12.7506C3.85775 12.7587 3.75904 12.8581 3.75057 12.9831C3.75052 12.9843 3.75035 12.9893 3.75022 13.0008C3.75001 13.0188 3.75 13.0426 3.75 13.0827C3.75 13.4853 3.75031 13.6573 3.76255 13.8501C3.94798 16.7718 6.45762 19.3775 9.37024 19.6725C9.5652 19.6922 9.67311 19.6964 9.92999 19.7061C10.658 19.7334 11.3629 19.75 12 19.75C12.6371 19.75 13.342 19.7334 14.07 19.7061C14.3269 19.6964 14.4348 19.6922 14.6298 19.6725C17.5424 19.3775 20.052 16.7718 20.2375 13.8501C20.2497 13.6573 20.25 13.4853 20.25 13.0827C20.25 13.0426 20.25 13.0188 20.2498 13.0008C20.2497 12.9906 20.2495 12.9855 20.2495 12.9837C20.2494 12.9825 20.2494 12.9824 20.2495 12.9837C20.2413 12.8584 20.1415 12.7587 20.0162 12.7505C20.0174 12.7506 20.0177 12.7506 20.0162 12.7505C20.0142 12.7505 20.009 12.7503 19.9992 12.7502C19.9812 12.75 19.9574 12.75 19.9173 12.75H4.08268ZM10.2824 5.06753C9.62506 4.78672 8.91452 4.82579 8.30713 5.12147C7.76827 5.3838 7.31118 5.8486 7.05701 6.47451C6.89349 6.87716 6.83436 7.29656 6.86648 7.70078L11.2476 5.81471C10.9982 5.49339 10.6713 5.2337 10.2824 5.06753Z"
                                                            fill="#333333"/>
                                                    </svg>
                                                    <div className={'d-flex flex-column'}>
                                                        <span className={'text-sm'}>Bath(s)</span>
                                                        <b>{property.details.numBathrooms}</b>
                                                    </div>
                                                </li> : ''}


                                            {(property.details.numGarageSpaces !== "" && property.details.numGarageSpaces !== null && property.details.numGarageSpaces !== undefined && parseFloat(property.details.numGarageSpaces) !== 0) ?
                                                <li className={'me-3 me-md-0 ms-4'}>
                                                    <svg height={'1.5em'} className={'me-2'}
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 640 512">
                                                        <path
                                                            d="M328.5 2.5c-5.2-3.3-11.9-3.3-17.1 0l-304 192c-7.5 4.7-9.7 14.6-5 22.1s14.6 9.7 22.1 5L320 34.9 615.5 221.5c7.5 4.7 17.4 2.5 22.1-5s2.5-17.4-5-22.1l-304-192zM252.2 208H387.8c14.3 0 26.8 9.5 30.8 23.2L434.8 288c-.9 0-1.9 0-2.8 0H208c-.9 0-1.9 0-2.8 0l16.2-56.8c3.9-13.7 16.5-23.2 30.8-23.2zm-61.5 14.4L169 298.1c-24.5 13.7-41 39.9-41 69.9v48 16 32 32c0 8.8 7.2 16 16 16s16-7.2 16-16V464H480v32c0 8.8 7.2 16 16 16s16-7.2 16-16V464 432 416 368c0-30-16.6-56.2-41-69.9l-21.6-75.7c-7.9-27.5-33-46.4-61.5-46.4H252.2c-28.6 0-53.7 18.9-61.5 46.4zM480 416v16H160V416 368c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48v48zM208 400a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm248-24a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z"/>
                                                    </svg>
                                                    <div className={'d-flex flex-column'}>
                                                        <span className={'text-sm'}>Garage(s)</span>
                                                        <b>{parseFloat(property.details.numGarageSpaces)}</b>
                                                    </div>
                                                </li> : ''}

                                            {(property.details.sqft !== "" && property.details.sqft !== null && property.details.sqft !== undefined && property.details.sqft !== '0') ?
                                                <li className={'me-3 me-md-0 ms-4'}>
                                                    <svg height={'1.4em'} className={'me-2'}
                                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path
                                                            d="M321 0c-18.2 0-33 14.8-33 33c0 8.7 3.5 17.1 9.7 23.3L325.4 84l-71.7 71.7c-15.6 15.6-15.6 40.9 0 56.6l46.1 46.1c15.6 15.6 40.9 15.6 56.6 0L428 186.6l27.7 27.7c6.2 6.2 14.6 9.7 23.3 9.7c18.2 0 33-14.8 33-33V32c0-17.7-14.3-32-32-32H321zm-1 33c0-.5 .4-1 1-1H480V191c0 .5-.4 1-1 1c-.3 0-.5-.1-.7-.3l-39-39c-6.2-6.2-16.4-6.2-22.6 0l-83 83c-3.1 3.1-8.2 3.1-11.3 0l-46.1-46.1c-3.1-3.1-3.1-8.2 0-11.3l83-83c3-3 4.7-7.1 4.7-11.3s-1.7-8.3-4.7-11.3l-39-39c-.2-.2-.3-.4-.3-.7zM32 512H191c18.2 0 33-14.8 33-33c0-8.7-3.5-17.1-9.7-23.3L186.6 428l71.7-71.7c15.6-15.6 15.6-40.9 0-56.6l-46.1-46.1c-15.6-15.6-40.9-15.6-56.6 0L84 325.4 56.3 297.7C50.1 291.5 41.7 288 33 288c-18.2 0-33 14.8-33 33V480c0 17.7 14.3 32 32 32zm160-33c0 .5-.4 1-1 1H32V321c0-.5 .4-1 1-1c.3 0 .5 .1 .7 .3l39 39c6.2 6.2 16.4 6.2 22.6 0l83-83c3.1-3.1 8.2-3.1 11.3 0l46.1 46.1c3.1 3.1 3.1 8.2 0 11.3l-83 83c-3 3-4.7 7.1-4.7 11.3s1.7 8.3 4.7 11.3l39 39c.2 .2 .3 .4 .3 .7z"/>
                                                    </svg>
                                                    <div className={'d-flex flex-column'}>
                                                        <span className={'text-sm'}>Sq.ft</span>
                                                        <b className={'text-nowrap'}>{property.details.sqft}</b>
                                                    </div>
                                                </li> : ''}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hg-card bg-grey shadow-none mb-4">
                            <div className="hg-card-body border-bottom border-opacity-10">
                                <h4 className={'pb-2'}>Listing Description</h4>
                                <p>{property.details.description}</p>

                                {isValidField(property.details.extras) && (
                                    <div className="col-lg-12">
                                        <p className={'text-medium pb-1'}><u>Extras</u></p>
                                        <p className={'pb-0'}>{property.details.extras}</p>
                                    </div>)}
                            </div>

                            <div className="hg-card-body border-bottom border-opacity-10 pb-2">
                                <h4 className={'pb-2'}>Property Summary</h4>
                                <div className="row">
                                    {isValidField(property.lot.legalDescription) && (
                                        <div className="col-lg-12">
                                            <p className={'text-medium pb-1'}><u>Legal Discription</u></p>
                                            <p><b>{property.lot.legalDescription}</b></p>
                                        </div>)}

                                    {isValidField(property.details.propertyType) && (
                                        <div className="col-lg-4">
                                            <p className={'text-medium pb-1'}><u>Property Type</u></p>
                                            <p><b>{property.details.propertyType}</b></p>
                                        </div>)}

                                    {isValidField(property.details.style) && (
                                        <div className="col-lg-4">
                                            <p className={'text-medium pb-1'}><u>Style</u></p>
                                            <p><b>{property.details.style}</b></p>
                                        </div>)}

                                    {isValidField(property.class) && (
                                        <div className="col-lg-4">
                                            <p className={'text-medium pb-1'}><u>Class</u></p>
                                            <p><b>{property.class}</b></p>
                                        </div>)}

                                    {isValidField(property.address.neighborhood) && (
                                        <div className="col-lg-4">
                                            <p className={'text-medium pb-1'}><u>Neighborhood</u></p>
                                            <p><b>{property.address.neighborhood}</b></p>
                                        </div>)}

                                    {(isValidField(property.lot.width) || isValidField(property.lot.depth)) && (
                                        <div className="col-lg-4">
                                            <p className={'text-medium pb-1'}><u>Land Size</u></p>
                                            <p><b>{property.lot.width} x {property.lot.depth}</b> Ft</p>
                                        </div>)}

                                    {isValidField(property.taxes.annualAmount) && (
                                        <div className="col-lg-4">
                                            <p className={'text-medium pb-1'}><u>Annual Property Taxes</u></p>
                                            <p><b><PriceFormatter
                                                price={property.taxes.annualAmount}/> {property.taxes.assessmentYear !== "" ? ` / ${property.taxes.assessmentYear}` : ''}
                                            </b></p>
                                        </div>)}

                                    {isValidField(property.details.garage) && (
                                        <div className="col-lg-4">
                                            <p className={'text-medium pb-1'}><u>Parking Type</u></p>
                                            <p><b>{property.details.garage}</b></p>
                                        </div>)}

                                    {isValidField(property.details.numParkingSpaces) && (
                                        <div className="col-lg-4">
                                            <p className={'text-medium pb-1'}><u>Number of Parking</u></p>
                                            <p><b>{parseFloat(property.details.numParkingSpaces)}</b></p>
                                        </div>)}

                                    {isValidField(property.details.yearBuilt) && (
                                        <div className="col-lg-4">
                                            <p className={'text-medium pb-1'}><u>Year Build</u></p>
                                            <p><b>{property.details.yearBuilt}</b></p>
                                        </div>)}

                                    {property.history.length > 0 && (
                                        <div className="col-lg-12 mb-2">
                                            <p className={'text-medium pb-1'}><u>History</u></p>
                                            <div className={'hg-card border shadow-none overflow-hidden rounded-3'}>
                                                <table
                                                    className={'table table-bordered border bg-transparent rounded-3 overflow-hidden mb-0'}>
                                                    <thead className={'bg-transparent'}>
                                                    <tr>
                                                        <th>MLS Number</th>
                                                        <th>Date</th>
                                                        <th>Status</th>
                                                        <th>Price</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className={'bg-transparent'}>
                                                    {property.history.map((propertyHistory, index) => (
                                                        <tr key={index}>
                                                            <td><a className={'text-primary'} target={'_blank'} rel={'noopener noreferrer'} href={`/property/${propertyHistory.mlsNumber}`}><u>{propertyHistory.mlsNumber}</u>
                                                                <svg className={'icon-color-primary ms-1'} height={'0.8em'}
                                                                     xmlns="http://www.w3.org/2000/svg"
                                                                     viewBox="0 0 640 512">
                                                                    <path
                                                                        d="M591.5 256c50-50 50-131 0-181s-131-50-181 0L387.9 97.6c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l22.6-22.6c37.5-37.5 98.3-37.5 135.8 0s37.5 98.3 0 135.8L444.3 357.9c-37.4 37.4-98.1 37.4-135.6 0c-35.6-35.6-37.6-92.6-4.7-130.6l5.3-6.1c5.8-6.7 5.1-16.8-1.6-22.6s-16.8-5.1-22.6 1.6l-5.3 6.1c-43.9 50.7-41.2 126.7 6.2 174.1c49.9 49.9 130.9 49.9 180.8 0L591.5 256zM48.5 256c-50 50-50 131 0 181s131 50 181 0l22.6-22.6c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0l-22.6 22.6c-37.5 37.5-98.3 37.5-135.8 0s-37.5-98.3 0-135.8L195.7 154.1c37.4-37.4 98.1-37.4 135.6 0c35.6 35.6 37.6 92.6 4.7 130.6l-5.3 6.1c-5.8 6.7-5.1 16.8 1.6 22.6s16.8 5.1 22.6-1.6l5.3-6.1c43.9-50.7 41.2-126.7-6.2-174.1C303.9 81.5 223 81.5 173 131.4L48.5 256z"/>
                                                                </svg>
                                                            </a></td>
                                                            <td><FormatDate date={propertyHistory.listDate}/></td>
                                                            <td>{propertyHistory.type}</td>
                                                            <td><PriceFormatter price={propertyHistory.listPrice}/></td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="hg-card-body border-bottom border-opacity-10 pb-2">
                                <h4 className={'pb-3'}>Building</h4>
                                <h5>Bed rooms</h5>
                                <div className={'row'}>
                                    <div className="col-lg-4">
                                        <p className={'text-medium pb-1'}><u>Den</u></p>
                                        <p><b>{property.details.den === 'Y' ? 'Yes' : 'No'}</b></p>
                                    </div>

                                    <div className="col-lg-4">
                                        <p className={'text-medium pb-1'}><u>Family Room</u></p>
                                        <p><b>{property.details.familyRoom === 'Y' ? 'Yes' : 'No'}</b></p>
                                    </div>
                                </div>

                            </div>

                            <div className="hg-card-body border-bottom border-opacity-10 pb-2">
                                <h4 className={'pb-2'}>Interior Features</h4>
                                <div className={'row'}>
                                    {isValidField(property.details.laundryLevel) && (
                                        <div className="col-lg-4">
                                            <p className={'text-medium pb-1'}><u>Laundry Level</u></p>
                                            <p><b>{property.details.laundryLevel}</b></p>
                                        </div>)}


                                    {(isValidField(property.details.numKitchens) || isValidField(property.details.numKitchensPlus)) && (
                                        <div className="col-lg-4">
                                            <p className={'text-medium pb-1'}><u>Number of Kitchens</u></p>
                                            <p><b>{totalKitchens}</b></p>
                                        </div>)}

                                    <div className="col-lg-12 pt-2">
                                        <h5>Extra Included</h5>
                                    </div>

                                    <div className="col-lg-3">
                                        <p className={'text-medium pb-1'}><u>Central Vac</u></p>
                                        <p><b>{property.details.centralVac === 'Y' ? 'Yes' : 'No'}</b></p>
                                    </div>

                                    <div className="col-lg-3">
                                        <p className={'text-medium pb-1'}><u>Elevator</u></p>
                                        <p><b>{displayValidFields(property.details.elevator)}</b></p>
                                    </div>

                                    <div className="col-lg-3">
                                        <p className={'text-medium pb-1'}><u>Fire Places</u></p>
                                        <p><b>{property.details.Fireplaces === 'Y' ? 'Yes' : 'No'}</b></p>
                                    </div>

                                    <div className="col-lg-3">
                                        <p className={'text-medium pb-1'}><u>Patio</u></p>
                                        <p>
                                            <b>{(property.details.patio === 'None' || property.details.patio === null) ? 'No' : `${property.details.patio}`}</b>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="hg-card-body border-bottom border-opacity-10 pb-2">
                                <h4 className={'pb-2'}>Building Features</h4>
                                <div className={'row'}>
                                    <div className="col-lg-4">
                                        <p className={'text-medium pb-1'}><u>Exterior Construction1</u></p>
                                        <p>
                                            <b>{(property.details.exteriorConstruction1 === 'None' || property.details.exteriorConstruction1 === null) ? 'No' : `${property.details.exteriorConstruction1}`}</b>
                                        </p>
                                    </div>

                                    <div className="col-lg-4">
                                        <p className={'text-medium pb-1'}><u>Exterior Construction2</u></p>
                                        <p>
                                            <b>{(property.details.exteriorConstruction2 === '' || property.details.exteriorConstruction2 === null) ? 'No' : `${property.details.exteriorConstruction2}`}</b>
                                        </p>
                                    </div>

                                    <div className="col-lg-4">
                                        <p className={'text-medium pb-1'}><u>Swimming Pool</u></p>
                                        <p><b>{displayValidFields(property.details.swimmingPool)}</b></p>
                                    </div>

                                    <div className="col-lg-4">
                                        <p className={'text-medium pb-1'}><u>Basement1</u></p>
                                        <p><b>{displayValidFields(property.details.basement1)}</b></p>
                                    </div>

                                    <div className="col-lg-4">
                                        <p className={'text-medium pb-1'}><u>Basement2</u></p>
                                        <p><b>{displayValidFields(property.details.basement2)}</b></p>
                                    </div>

                                    <div className="col-lg-12">
                                        <p className={'text-medium pb-1'}><u>Zoning</u></p>
                                        <p><b>{displayValidFields(property.details.zoning)}</b></p>
                                    </div>
                                </div>
                            </div>

                            <div className="hg-card-body pb-2">
                                <h4 className={'pb-2'}>Utilities</h4>
                                <div className={'row'}>
                                    <div className="col-lg-4">
                                        <p className={'text-medium pb-1'}><u>Water Source</u></p>
                                        <p><b>{displayValidFields(property.details.waterSource)}</b></p>
                                    </div>

                                    <div className="col-lg-8">
                                        <p className={'text-medium pb-1'}><u>Nearby Amenities</u></p>
                                        <p><b>{displayValidFields(amenitiesList)}</b></p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="hg-card bg-grey shadow-none overflow-hidden mb-4">
                            <PropertyMap latitude={property.map.latitude} longitude={property.map.longitude}/>
                        </div>
                    </div>

                    <div className={'col-lg-3'}>
                        <div className="hg-card bg-grey shadow-none">
                            <div className="hg-card-body">
                                <p className={'text-medium pb-1'}><u>Brokerage Name</u></p>
                                <p className={'pb-0'}>{property.office.brokerageName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="propertiesList">
                    {property.comparables && property.comparables.length > 0 && (
                        <div className="container py-4 mb-5">
                            <h2 className={'text-center'}>Similar Listings</h2>
                            <div className="row">
                                <Slider {...settings}>
                                    {property.comparables.map((comparablesList, index) => (
                                        <div key={index} className="col-xl-12 p-3 p-md-3">
                                            <PropertyCard properties={comparablesList}/>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default SingleProperty;