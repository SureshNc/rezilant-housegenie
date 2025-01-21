import './style.css'

import imgPlaceholder from "../../images/image-placeholder.svg";
import PriceFormatter from "../PriceFormatter/PriceFormatter";
import React from "react";

export const PropertyCard = ({properties}) => {
    const{mlsNumber, address, details, listPrice, images} = properties;

    return (
        <div className="hg-card bg-transparent d-flex flex-column h-100">
            <figure className={'mb-0'}>
                <a href={`/property/${mlsNumber}`}>
                    {(images.length > 0) ? <img src={`https://cdn.repliers.io/${images[0]}?class=small`} alt={mlsNumber} /> : <img src={imgPlaceholder} alt={'Placeholder'} /> }
                </a>
            </figure>

            <a href={`/property/${mlsNumber}`}>
                <div className={'hg-card-body position-relative p-3 mh-100'}>
                    <div className={'price-txt mb-1'}><PriceFormatter price={listPrice} /></div>

                    <p className={'pb-0 text-xs'}>
                        {address.unitNumber !== "" ? `${address.unitNumber} - ` : ''} {address.streetNumber} {(address.streetDirectionPrefix !== "" && address.streetDirectionPrefix !== null && address.streetDirectionPrefix !== undefined) ? `${address.streetDirectionPrefix} ` : ''} {address.streetName} {(address.streetSuffix !== "" && address.streetSuffix !== null && address.streetSuffix !== undefined && address.streetSuffix !== '0') ? `${address.streetSuffix}, ` : ''} {address.city}, {address.state}.
                    </p>
                    <p className={'pb-2 text-xs'}><span className={'text-grey'}>{address.neighborhood}</span></p>

                    <ul className={'hg-amin-card d-flex align-items-center mb-0'}>

                        {(details.numBedrooms !== "" && details.numBedrooms !== null && details.numBedrooms !== undefined && details.numBedrooms !== '0') ?
                            <li className={'me-3'}>
                                <svg height={'1.1em'} className={'me-1'}
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                    <path
                                        d="M32 48c0-8.8-7.2-16-16-16S0 39.2 0 48V336v64 64c0 8.8 7.2 16 16 16s16-7.2 16-16V416H608v48c0 8.8 7.2 16 16 16s16-7.2 16-16V400 336 240c0-61.9-50.1-112-112-112H304c-26.5 0-48 21.5-48 48V320H32V48zM608 384H32V352H272 608v32zm0-144v80H288V176c0-8.8 7.2-16 16-16H528c44.2 0 80 35.8 80 80zM96 208a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm128 0A80 80 0 1 0 64 208a80 80 0 1 0 160 0z"/>
                                </svg>
                                {details.numBedrooms}{(details.numBedroomsPlus !== "" && details.numBedroomsPlus !== null && details.numBedroomsPlus !== undefined && details.numBedroomsPlus !== '0') ? ` + ${details.numBedroomsPlus} ` : ''}
                            </li> : ''}


                        {(details.numBathrooms !== "" && details.numBathrooms !== null && details.numBathrooms !== undefined && details.numBathrooms !== '0') ?
                            <li className={'me-3'}>
                                <svg height={'1.1em'} className={'me-1'} viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.38517 2.75C4.48209 2.75 3.75 3.48209 3.75 4.38516V11.25H4.03429C4.04516 11.25 4.05599 11.25 4.06675 11.25C4.07208 11.25 4.07739 11.25 4.08268 11.25L19.9332 11.25C19.944 11.25 19.9548 11.25 19.9657 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H21.7321C21.7386 12.7949 21.7433 12.8405 21.7463 12.8864C21.7501 12.9442 21.75 13.0066 21.75 13.0668L21.75 13.1047C21.75 13.4799 21.75 13.6998 21.7344 13.9452C21.5925 16.1815 20.384 18.2467 18.6326 19.597C18.6463 19.6186 18.6591 19.6412 18.6708 19.6646L19.6708 21.6646C19.8561 22.0351 19.7059 22.4856 19.3354 22.6708C18.9649 22.8561 18.5144 22.7059 18.3292 22.3354L17.3615 20.4C16.5597 20.8059 15.6878 21.073 14.7809 21.1648C14.5364 21.1896 14.3872 21.1952 14.133 21.2047L14.1263 21.205C13.3861 21.2328 12.6615 21.25 12 21.25C11.3385 21.25 10.6139 21.2328 9.87368 21.205L9.86699 21.2047C9.61278 21.1952 9.46358 21.1896 9.2191 21.1648C8.31222 21.073 7.44028 20.8059 6.63851 20.4L5.67082 22.3354C5.48558 22.7059 5.03507 22.8561 4.66459 22.6708C4.29411 22.4856 4.14394 22.0351 4.32918 21.6646L5.32918 19.6646C5.34089 19.6412 5.35366 19.6186 5.3674 19.597C3.61596 18.2467 2.4075 16.1815 2.26556 13.9452C2.24999 13.6998 2.24999 13.4798 2.25 13.1046L2.25 13.0827C2.25 13.0774 2.25 13.0721 2.24999 13.0668C2.24999 13.0483 2.24998 13.0296 2.25008 13.0108C2.25003 13.0072 2.25 13.0036 2.25 13V12.75H2C1.58579 12.75 1.25 12.4142 1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H2.25V4.38516C2.25 2.65366 3.65366 1.25 5.38517 1.25C6.66715 1.25 7.81998 2.0305 8.29609 3.22079L8.40623 3.49613C9.19952 3.29489 10.0603 3.34152 10.8717 3.68813C11.887 4.12189 12.6258 4.94029 13.0041 5.90053C13.1526 6.27744 12.975 6.70417 12.6029 6.86436L6.64215 9.43044C6.45572 9.51069 6.24473 9.51197 6.05735 9.43396C5.86997 9.35596 5.72221 9.20535 5.6478 9.01651C5.26959 8.05665 5.24692 6.94515 5.66723 5.91014C5.96643 5.17335 6.45214 4.56929 7.04665 4.13607L6.90338 3.77788C6.65506 3.15708 6.05379 2.75 5.38517 2.75ZM4.08268 12.75C4.04261 12.75 4.01877 12.75 4.00076 12.7502C3.98765 12.7504 3.98298 12.7506 3.98281 12.7506C3.98215 12.7506 3.98276 12.7506 3.98281 12.7506C3.85775 12.7587 3.75904 12.8581 3.75057 12.9831C3.75052 12.9843 3.75035 12.9893 3.75022 13.0008C3.75001 13.0188 3.75 13.0426 3.75 13.0827C3.75 13.4853 3.75031 13.6573 3.76255 13.8501C3.94798 16.7718 6.45762 19.3775 9.37024 19.6725C9.5652 19.6922 9.67311 19.6964 9.92999 19.7061C10.658 19.7334 11.3629 19.75 12 19.75C12.6371 19.75 13.342 19.7334 14.07 19.7061C14.3269 19.6964 14.4348 19.6922 14.6298 19.6725C17.5424 19.3775 20.052 16.7718 20.2375 13.8501C20.2497 13.6573 20.25 13.4853 20.25 13.0827C20.25 13.0426 20.25 13.0188 20.2498 13.0008C20.2497 12.9906 20.2495 12.9855 20.2495 12.9837C20.2494 12.9825 20.2494 12.9824 20.2495 12.9837C20.2413 12.8584 20.1415 12.7587 20.0162 12.7505C20.0174 12.7506 20.0177 12.7506 20.0162 12.7505C20.0142 12.7505 20.009 12.7503 19.9992 12.7502C19.9812 12.75 19.9574 12.75 19.9173 12.75H4.08268ZM10.2824 5.06753C9.62506 4.78672 8.91452 4.82579 8.30713 5.12147C7.76827 5.3838 7.31118 5.8486 7.05701 6.47451C6.89349 6.87716 6.83436 7.29656 6.86648 7.70078L11.2476 5.81471C10.9982 5.49339 10.6713 5.2337 10.2824 5.06753Z"
                                          fill="#000000"/>
                                </svg>
                                {details.numBathrooms}
                            </li> : ''}


                        {(details.numGarageSpaces !== "" && details.numGarageSpaces !== null && details.numGarageSpaces !== undefined && parseFloat(details.numGarageSpaces) !== 0) ?
                            <li>
                                <svg height={'1.1em'} className={'me-1'} xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 640 512">
                                    <path
                                        d="M328.5 2.5c-5.2-3.3-11.9-3.3-17.1 0l-304 192c-7.5 4.7-9.7 14.6-5 22.1s14.6 9.7 22.1 5L320 34.9 615.5 221.5c7.5 4.7 17.4 2.5 22.1-5s2.5-17.4-5-22.1l-304-192zM252.2 208H387.8c14.3 0 26.8 9.5 30.8 23.2L434.8 288c-.9 0-1.9 0-2.8 0H208c-.9 0-1.9 0-2.8 0l16.2-56.8c3.9-13.7 16.5-23.2 30.8-23.2zm-61.5 14.4L169 298.1c-24.5 13.7-41 39.9-41 69.9v48 16 32 32c0 8.8 7.2 16 16 16s16-7.2 16-16V464H480v32c0 8.8 7.2 16 16 16s16-7.2 16-16V464 432 416 368c0-30-16.6-56.2-41-69.9l-21.6-75.7c-7.9-27.5-33-46.4-61.5-46.4H252.2c-28.6 0-53.7 18.9-61.5 46.4zM480 416v16H160V416 368c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48v48zM208 400a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm248-24a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z"/>
                                </svg>
                                {parseFloat(details.numGarageSpaces)}
                            </li> : ''}
                    </ul>
                </div>
            </a>
        </div>
    )
}
