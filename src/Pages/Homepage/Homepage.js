import React, {useEffect} from "react"
import './style.css'
import sliderImg1 from '../../images/img-search-home-1.svg'
import Search from "../../Components/Search/Search";
// import {useNavigate} from "react-router-dom";
// import {useState} from 'react';
// import SearchProperty from "../../Components/SearchProperty/SearchProperty";
//import {Routes, Route} from "react-router-dom";

//import {SearchProperty} from "../../Components/SearchProperty/SearchProperty";
//import sliderImg2 from '../../images/img-search-home-2.svg'

export const Homepage = () => {
    useEffect(() => {
        document.body.className = 'searchRoot';
        return () => { document.body.className = ''; }
    })

    return (
        <>
            <div className={'search-container'}>
                <div className={'searchBoxOver'}>
                    <figure><img src={sliderImg1} alt="Slider"/></figure>

                    <div className={'searchBoxHolder'}>
                        <div className={'search-home text-center'}>
                            <h1 className={'text-white text-center mb-3'}>Experience the Future of Real Estate: Empowered by
                                AI</h1>
                            <div className={'row justify-content-center'}>
                                <div className={'col-md-10 mb-3'}>
                                    <Search />
                                </div>
                            </div>

                            <a className={'btn btn-primary'} href="/properties">Explore Homes</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className={'searchFooter'}>
                <div className={'container-fluid d-flex justify-content-between align-items-center'}>
                    <p className={'pb-0'}>&copy; {new Date().getFullYear()}, all rights reserved.</p>
                    <ul className="hg-social-links p-0">
                        <li><a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path
                                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z">
                                </path>
                            </svg>
                        </a>
                        </li>
                        <li><a href="https://twitter.com/" target="_blank" rel="noreferrer">
                            <svg width="1200" height="1227" viewBox="0 0 1200 1227" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path>
                            </svg>
                        </a></li>
                        <li><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path
                                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z">
                                </path>
                            </svg>
                        </a></li>
                        <li><a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path
                                    d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z">
                                </path>
                            </svg>
                        </a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
