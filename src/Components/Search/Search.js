import React, {useState, useEffect, useRef} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import axios from "axios";

const Search = ({ currentLocationFromIp = {} }) => {
    const { city = '', region = '', country = '' } = currentLocationFromIp || {};

    const [searchString, setSearchString] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [suggestionListings, setSuggestionListings] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    // console.log('City', city)
    // console.log('Region', region)
    // console.log('Country', country)

   // console.log('current Location', currentLocationFromIp.city)

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('searchQuery');
        if (query) {
            setSearchString(query);
        }
        else if(city && region && country) {
            setSearchString(`${city}, ${region}, ${country}`);
        }
    }, [location.search, city, region, country]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('searchQuery');
        if (query) {
            setSearchString(query);
        }
    }, [location.search]);

    useEffect(() => {
        const loadGoogleMapsScript = () => {
            if (!window.google) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAVy6A-wSAyb4Exeo2GzSHPyfmOd0S9kM0&libraries=places`;
                script.async = true;

                script.onload = () => {
                    console.log('Google Maps script loaded');
                };
                document.body.appendChild(script);

                return () => {
                    document.body.removeChild(script);
                };
            }
        };

        loadGoogleMapsScript();
    }, []);


    const handleChange = async (event) => {
        const inputValue = event.target.value;
        setSearchString(inputValue);
        handleGoogleAutocomplete(inputValue);
        handleRepliersAPI(inputValue);
    };

    const handleGoogleAutocomplete = (inputValue) => {
        if (inputValue && window.google) {
            const autocompleteService = new window.google.maps.places.AutocompleteService();
            autocompleteService.getPlacePredictions(
                {
                    input: inputValue,
                    componentRestrictions: {country: "CA"},
                    types: ["(cities)"],
                },
                (predictions, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        setPredictions(predictions);
                    } else {
                        setPredictions([]);
                    }
                }
            );
        } else {
            setPredictions([]);
        }
    };

    const handleRepliersAPI = async (inputValue) => {
        if (inputValue) {
            const url = `https://api.repliers.io/listings?search=${inputValue}&searchFields=mlsNumber,address.streetNumber,address.streetName,address.city&fields=mlsNumber%2Caddress.*`;
            try {
                const response = await axios.get(url, {
                    headers: {'REPLIERS-API-KEY': `f2n3UQ8mgLJAaEtHg4YWdc8dQj87qA`}
                });
                const suggestions = response.data.listings.map(item => ({
                    unitNumber: item.address.unitNumber,
                    streetNumber: item.address.streetNumber,
                    streetDirectionPrefix: item.address.streetDirectionPrefix,
                    streetName: item.address.streetName,
                    streetSuffix: item.address.streetSuffix,
                    city: item.address.city,
                    state: item.address.state,
                    mlsNumber: item.mlsNumber
                }));
                const uniqueSuggestions = Array.from(new Set(suggestions.map(JSON.stringify))).map(JSON.parse);
                setSuggestionListings(uniqueSuggestions);
            } catch (error) {
                console.log('Error getting data: ' + error);
            }
        } else {
            setSuggestionListings([]);
        }
    };

    const handlePredictionClick = (prediction) => {
        const placeId = prediction.place_id;
        setSearchString(prediction.description);
        setPredictions([]);
        setSuggestionListings([]);
        navigateToSearchPage(prediction.description, placeId);
    };

    const navigateToSearchPage = (query, placeId) => {
        console.log("the query is", query)
        navigate(`/properties?searchQuery=${encodeURIComponent(query)}&place_id=${placeId}`);
        console.log("the place id is", placeId)
    };

    const closeSuggestion = () => {
        setSuggestionListings([]);
    }

    return (
        <div className={'searchBox'}>
            <div className={'form-group position-relative'}>
                <div className={'search-star'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                            d="M507.3 484.7l-141.5-141.5C397 306.8 415.1 259.7 415.1 208c0-114.9-93.13-208-208-208S-.0002 93.13-.0002 208S93.12 416 207.1 416c51.68 0 98.85-18.96 135.2-50.15l141.5 141.5C487.8 510.4 491.9 512 496 512s8.188-1.562 11.31-4.688C513.6 501.1 513.6 490.9 507.3 484.7zM208 384C110.1 384 32 305 32 208S110.1 32 208 32S384 110.1 384 208S305 384 208 384z"
                            fill='#ffffff'/>
                    </svg>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Str No, Str Name, City & MLS....."
                    value={searchString}
                    onChange={handleChange}/>

                {/*<button className={'btn btn-primary'} onClick={handleSearch}>Search Homes</button>*/}

                {(predictions.length > 0 || suggestionListings.length > 0) && (
                    <ul className={'autocomplete'}>
                        {/*<button onClick={handleCurrentLocationClick} className={'d-flex align-items-center py-1'}>*/}
                        {/*    <svg className={'me-2'} height={'1.2em'} xmlns="http://www.w3.org/2000/svg"*/}
                        {/*         viewBox="0 0 512 512">*/}
                        {/*        <path*/}
                        {/*            d="M160 256C160 202.1 202.1 160 256 160C309 160 352 202.1 352 256C352 309 309 352 256 352C202.1 352 160 309 160 256zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"*/}
                        {/*            fill="currentColor"/>*/}
                        {/*    </svg>*/}
                        {/*    Use Current Location*/}
                        {/*</button>*/}
                        <li className={'text-dark bg-grey'}><b>Locations</b></li>
                        {predictions && predictions.length > 0 ? (
                            predictions.map((prediction) => (
                                <li key={prediction.place_id} onClick={() => handlePredictionClick(prediction)}>
                                    {prediction.description}
                                </li>
                            ))
                        ) : (
                            <li className={'text-grey'}><em>No locations found</em></li>
                        )}

                        <li className={'text-dark bg-grey'}><b>Properties</b></li>
                        {suggestionListings && suggestionListings.length > 0 ? (
                                (suggestionListings).slice(0, 10).map((listing, index) => (
                                <li key={index} onClick={() => closeSuggestion()}>
                                    <a href={`/property/${listing.mlsNumber}`} target={'_blank'}>
                                        <p className={'p-0'}>
                                            {listing.unitNumber !== "" ? `${listing.unitNumber} - ` : ''}{listing.streetNumber}&nbsp;
                                            {(listing.streetDirectionPrefix !== "" && listing.streetDirectionPrefix !== null && listing.streetDirectionPrefix !== undefined) ? `${listing.streetDirectionPrefix} ` : ''}
                                            {listing.streetName}&nbsp;
                                            {(listing.streetSuffix !== "" && listing.streetSuffix !== null && listing.streetSuffix !== undefined && listing.streetSuffix !== '0') ? `${listing.streetSuffix}, ` : ''}
                                            {listing.city},&nbsp;
                                            {listing.state}.
                                        </p>
                                        <p className={'p-0 text-sm text-grey'}>MLS: {listing.mlsNumber}</p>
                                    </a>
                                </li>
                            ))
                        ) : (
                            <li className={'text-grey'}><em>No properties found</em></li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Search;
