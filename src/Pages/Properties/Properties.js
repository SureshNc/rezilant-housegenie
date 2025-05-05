import React, { useEffect, useState, useRef } from "react";
import clusterIconCustom from '../../images/icon-cluster_53x53.svg';
import { useNavigate, useLocation } from "react-router-dom";
import { PropertyCard } from "../../Components/PropertyCard/PropertyCard";
import { createRoot } from 'react-dom/client';
import { MarkerInfoWindow } from "../../Components/PropertyList/MarkerInfoWindow/MarkerInfoWindow";
import Search from "../../Components/Search/Search";
import Pagination from "../../Components/Pagination/Pagination";
import axios from 'axios';
import './style.css';

const Properties = () => {
    const [listings, setListings] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [clusterData, setClusterData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [currentZoomLevel, setCurrentZoomLevel] = useState(10);
    const [clusterTotalCount, setClusterTotalCount] = useState(0);
    const [clusterPrecision, setClusterPrecision] = useState(13);
    const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
    const [currentLocation, setCurrentLocation] = useState({
        city: '',
        region: '',
        country: '',
    });

    const resultPerPage = 36;

    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const mapInstance = useRef(null);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

/*    const navigate = useNavigate();
    const location = useLocation(); // Get the location object
    const query = useQuery();*/

    const urlParams = new URLSearchParams(window.location.search);
    const placeId = urlParams.get('place_id');

    const handlePredictionClick = (placeId) => {
        if (placeId) {
            const placesService = new window.google.maps.places.PlacesService(mapInstance.current);
            placesService.getDetails({ placeId: placeId }, (place, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    const location = place.geometry.location;

                    mapInstance.current.panTo(location);
                    mapInstance.current.setZoom(12); // Adjust zoom level
                }
            });
        }
    };

    const fetchGeoJSONData = async (bounds) => {
        console.log('Boudary Values')
        if (isFetching) return;
        setIsFetching(true);
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        const polygon = [
            [sw.lng(), ne.lat()], // top left
            [ne.lng(), ne.lat()], // top right
            [ne.lng(), sw.lat()], // bottom right
            [sw.lng(), sw.lat()], // bottom left
            [sw.lng(), ne.lat()]  // closing the polygon by repeating the first point
        ];

        const url = `https://api.repliers.io/listings?cluster=true&clusterPrecision=${clusterPrecision}&status=A&listings=true&map=${encodeURIComponent(JSON.stringify([polygon]))}&resultsPerPage=${resultPerPage}&pageNum=${page}`;

        try {
            const response = await fetch(url, {
                headers: { 'REPLIERS-API-KEY': 'f2n3UQ8mgLJAaEtHg4YWdc8dQj87qA' }
            });
            const data = await response.json();
            setListings(data.listings);
            setTotalPages(data.numPages);
            setClusterTotalCount(data.count);
            console.log("API Response Data:", listings);
            setClusterData(data.aggregates.map.clusters);
            window.scrollTo({top: 0}); // Scroll to the top


        } catch (error) {
            console.error('Error fetching GeoJSON data:', error);
        } finally {
            setIsFetching(false);
            setLoading(false);
        }
    };

    useEffect( () => {
        const totalListings = resultPerPage * page;
        if(clusterTotalCount < totalListings && page > 1) {
            setPage(1)
        }
            console.log('Current Page', page)


    },[page, clusterTotalCount, resultPerPage])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.repliers.io/listings?cluster=true&clusterPrecision=15&fields=address.city%2Cstatus%2Cmap.*&status=A&listings=true`, {
                    headers: {
                        'REPLIERS-API-KEY': 'f2n3UQ8mgLJAaEtHg4YWdc8dQj87qA'
                    }
                });
                const data = await response.json();
                setClusterData(data.aggregates.map.clusters);
                setMapLoaded(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        return () => {
            // Cleanup function
        };
    }, []);

    useEffect(() => {
        // Check if window.google exists, meaning the Google Maps API has already been loaded
        if (window.google) {
            initializeMap();
            setIsGoogleMapsLoaded(true);

        } else if (mapLoaded) {
            // Dynamically load Google Maps API script
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAVy6A-wSAyb4Exeo2GzSHPyfmOd0S9kM0&libraries=places`;
            script.async = true;
            script.onload = () => {
                setIsGoogleMapsLoaded(true);
                initializeMap();
            };
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [mapLoaded, clusterData]); // Only run this effect when mapLoaded changes

    useEffect(() => {
        if (!placeId && isGoogleMapsLoaded) {
            locationFromIp();
        }
    }, [placeId, isGoogleMapsLoaded]);

    useEffect(() => {
        if (isGoogleMapsLoaded) {
            const bounds = mapInstance.current.getBounds();
            if (bounds) {
                fetchGeoJSONData(bounds);
            }
        }
    }, [page, isGoogleMapsLoaded]);

    const locationFromIp = async () => {
        try {
            const response = await axios.get('https://ipinfo.io/json', {
                headers: {
                    'Authorization': `7f31595cd1f1e6` // Optional: If you have an API token
                }
            });
            const { city, region, country, loc } = response.data;

            if (!loc) {
                console.error('Location not found in IP info response');
                return;
            }

            setCurrentLocation({
                city,
                region,
                country,
            });

            const [latitude, longitude] = loc.split(',');

            // Check if the latitude and longitude are valid numbers
            const lat = parseFloat(latitude);
            const lng = parseFloat(longitude);

            if (isNaN(lat) || isNaN(lng)) {
                console.error('Invalid latitude or longitude values:', lat, lng);
                return;
            }

            if (lat && lng) {
                if (mapInstance.current) {
                    const newLocation = new window.google.maps.LatLng(lat, lng);
                    mapInstance.current.panTo(newLocation);
                    mapInstance.current.setZoom(12); // Adjust zoom level
                }
            }
        } catch (error) {
            console.error('Error fetching location data:', error);
        }
    };

    const initializeMap = async () => {
        const map = new window.google.maps.Map(document.getElementById('mapContainer'), {
            center: mapRef.current && mapRef.current.getCenter() ? mapRef.current.getCenter() : {
                lat: 43.49855,
                lng: -79.86059
            }, // Check if getCenter() is not undefined before accessing its properties
            zoom: mapRef.current ? mapRef.current.getZoom() : currentZoomLevel, // Use the current zoom level if available, otherwise use a default zoom level
            scrollwheel: true,
            draggable: true,
        });

        if (clusterTotalCount >= 300) {
            map.addListener('zoom_changed', () => {
                const currentZoom = map.getZoom();
                setClusterPrecision(currentZoom); // Update cluster precision state
            });
        }

        // Create custom cluster icon
        const clusterIcon = {
            url: clusterIconCustom,
            width: 53,
            height: 53,
            textColor: 'white',
            textSize: 8,
        };

        // Add clusters with count directly on the map
        clusterData.forEach(item => {
            const totalCount = clusterData.reduce((acc, item) => acc + item.count, 0);
            setClusterTotalCount(totalCount);
            if (clusterData.length > 0 && clusterTotalCount >= 300) {
                const clusterMarker = new window.google.maps.Marker({
                    position: { lat: item.location.latitude, lng: item.location.longitude },
                    icon: clusterIcon,
                    label: { text: `${item.count}`, color: 'white' },
                    map: map,
                });

                // Add click event listener if needed
                clusterMarker.addListener('click', () => {
                    const currentZoom = map.getZoom();
                    const newZoom = currentZoom + 1;
                    const clusterPosition = clusterMarker.getPosition(); // Assuming clusterMarker has getPosition method

                    // Zoom to the clicked cluster
                    map.setCenter(clusterPosition);
                    map.setZoom(newZoom);
                    setCurrentZoomLevel(newZoom);
                });
            }
        });

        if (listings.length > 0 && clusterTotalCount <= 300) {
            const markers = listings.map(property => {
                const markerContent = `
                   <svg className="hg-svg-cus" xmlns="http://www.w3.org/2000/svg" width="50" height="38" fill="#5E9DFB">
                    <rect x="0" y="0" width="50" height="38" rx="7" />
                   </svg>
                `;

                const marker = new window.google.maps.Marker({
                    position: { lat: parseFloat(property.map.latitude), lng: parseFloat(property.map.longitude) },
                    title: property.mlsNumber,
                    map: map,
                    icon: {
                        url: `data:image/svg+xml;utf-8,${encodeURIComponent(markerContent)}`,
                        scaledSize: new window.google.maps.Size(50, 23), // Adjust the size as needed
                    },
                    label: {
                        text: formatPrice(property.listPrice),
                        color: 'white', // Adjust the label color as needed
                        fontSize: '11px',
                    },
                });

                const infoWindowContent = document.createElement('div');

                // Render ImageGallery component within the info window content using ReactDOM
                createRoot(infoWindowContent).render(
                    <MarkerInfoWindow
                        imageSlider={property.images}
                        price={currencyFormat(property.listPrice)}
                        mlsForLink={property.mlsNumber}
                        address={property.address}
                        pType={property.details.propertyType}
                        bed={property.details.numBedrooms}
                        bath={property.details.numBathrooms}
                        bedPlus={property.details.numBedroomsPlus}
                        numOfGarage={property.details.numGarageSpaces}
                    />
                );

                const infoWindow = new window.google.maps.InfoWindow({
                    content: infoWindowContent,
                });

                //Open info window when marker is clicked
                marker.addListener('click', () => {
                    // Close all info windows
                    markers.forEach(otherMarker => {
                        otherMarker.infoWindow.close();
                    });

                    // Open the clicked marker's info window
                    infoWindow.open(map, marker);
                });

                marker.infoWindow = infoWindow;
                return marker;
            });
        }

        mapInstance.current = map;
        mapRef.current = map;

        markerRef.current = new window.google.maps.Marker({
            map: mapInstance.current,
        });

        const updateGeoJSON = () => {
            const bounds = map.getBounds();
            if (bounds) {
                fetchGeoJSONData(bounds);
            }
        };

        map.addListener('idle', () => {
            const center = map.getCenter();
            const zoom = map.getZoom();
        });

        map.addListener('zoom_changed', updateGeoJSON);
        map.addListener('dragend', updateGeoJSON);
    };

    const formatPrice = (price) => {
        // Convert the price string to a number
        let priceNumber = parseFloat(price);

        // Define suffixes for thousands, millions, billions, etc.
        const suffixes = ['', 'K', 'M', 'B', 'T'];

        // Determine the appropriate suffix based on the magnitude of the number
        let suffixIndex = 0;
        while (priceNumber >= 1000 && suffixIndex < suffixes.length - 1) {
            priceNumber = priceNumber / 1000;
            suffixIndex++;
        }

        // Format the price with the appropriate suffix
        const formattedPrice = `$${priceNumber.toFixed(0)} ${suffixes[suffixIndex]}`;

        return formattedPrice;
    };

    const currencyFormat = (price) => {
        // Convert the price string to a number
        const priceNumber = parseFloat(price);

        // Format the price using toLocaleString method
        const formattedPriceCard = priceNumber.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0, // Set maximum number of digits after the decimal point
        });
        return formattedPriceCard;
    };

    useEffect(() => {
        if (isGoogleMapsLoaded) {
            handlePredictionClick(placeId);
        }
    }, [isGoogleMapsLoaded, placeId]);

    const handlePaginationChange = (newPage) => {
        setLoading(true);
        setPage(newPage);
    };

    return (
        <>
            <div className={'filterBar bg-dark sticky-top py-2'}>
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        <div className={'col-md-3'}>
                            <Search currentLocationFromIp={currentLocation ? currentLocation : ''} />
                        </div>

                        <div className="col-md-9">
                            <div className={'hg-filter d-flex'}>
                                <a href="#" className={'btn btn-outline-white ms-2'}>
                                    <svg className={'me-2'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M96 0c8.8 0 16 7.2 16 16l0 65.6c36.5 7.4 64 39.7 64 78.4s-27.5 71-64 78.4L112 496c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-257.6C43.5 231 16 198.7 16 160s27.5-71 64-78.4L80 16C80 7.2 87.2 0 96 0zm0 208a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM256 400a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm80-48c0 38.7-27.5 71-64 78.4l0 65.6c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-65.6c-36.5-7.4-64-39.7-64-78.4s27.5-71 64-78.4L240 16c0-8.8 7.2-16 16-16s16 7.2 16 16l0 257.6c36.5 7.4 64 39.7 64 78.4zM464 192a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm-32 78.4L432 496c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-225.6c-36.5-7.4-64-39.7-64-78.4s27.5-71 64-78.4L400 16c0-8.8 7.2-16 16-16s16 7.2 16 16l0 97.6c36.5 7.4 64 39.7 64 78.4s-27.5 71-64 78.4z"/></svg>
                                    All Filter
                                </a>

                                <select className={'form-control w-auto ms-2'}>
                                    <option value="">For Sale</option>
                                </select>

                                <select className={'form-control w-auto ms-2'}>
                                    <option value="">Price</option>
                                </select>

                                <select className={'form-control w-auto ms-2'}>
                                    <option value="">Beds/Bath</option>
                                </select>

                                <select className={'form-control w-auto ms-2'}>
                                    <option value="">Property Type</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={'row'}>
                <div className="col-lg-7">
                    <div id="mapContainer"></div>
                </div>
                <div className={'col-lg-5'}>
                    <div className="propertiesList py-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className={'col-lg-12'}>{listings.length > 0 ?
                                    <p>{clusterTotalCount} results</p> : ''}</div>
                                {clusterData.length > 0 ? (
                                    listings && listings.length > 0 ? (
                                        listings.map((property, index) => (
                                            <div key={index} className={'col-xl-6 col-lg-6 mb-4'}>
                                                <PropertyCard properties={property} />
                                            </div>
                                        ))
                                    ) : (
                                        loading ? <p>Loading...</p> : (
                                            <div className="hg-card bg-grey mb-4 shadow-none">
                                                <div className="hg-card-body py-3 text-center">
                                                    <b>No more listings</b>
                                                </div>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <div className="hg-card bg-grey mb-4 shadow-none">
                                        <div className="hg-card-body py-3 text-center">
                                            <b>No more listings</b>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {
                                listings && listings.length > 0 ? (
                                    <Pagination
                                        totalPages={totalPages}
                                        currentPage={page}
                                        resultsPerPage={resultPerPage}
                                        totalCount={clusterTotalCount}
                                        responseCount={listings.length}
                                        onChange={handlePaginationChange}
                                    />
                                ) : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Properties;
