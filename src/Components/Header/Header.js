import './style.css'
import {useEffect} from "react";

export const Header = () => {
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });

    /* Method that will fix header after a specific scrollable */
    const isSticky = (e) => {
        const header = document.querySelector('.hg-header');
        const scrollTop = window.scrollY;
        scrollTop >= 80 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
    };

    return (
        <>
            <header className={'hg-header'}>
                <div className={'container-fluid d-flex justify-content-between align-items-center'}>
                    <div className={'logo'}>
                        <a href={'/'}>
                        <svg width="336" height="60" viewBox="0 0 336 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.8" d="M45.3887 32.9189L24.1925 11.5392L13.4628 0.712675C12.3921 0.24033 11.2369 -0.0022981 10.0695 1.64043e-05C4.90353 1.64043e-05 0.702893 4.81046 0.591734 10.7849V36.601C0.573176 38.0571 0.837363 39.5027 1.36921 40.8551C1.90105 42.2075 2.69014 43.4404 3.6914 44.4833C4.69266 45.5261 5.88649 46.3585 7.2047 46.933C8.52292 47.5075 9.9397 47.8127 11.3741 47.8313H41.0769C42.8216 46.9634 44.2934 45.6188 45.3269 43.9487C46.3603 42.2785 46.9146 40.349 46.9274 38.3767C46.9265 36.4473 46.3935 34.5567 45.3887 32.9189Z" fill="#6E00FA"/>
                            <path opacity="0.8" d="M43.6164 11.958H13.9157C12.1707 12.826 10.6988 14.1705 9.6652 15.8407C8.63159 17.5108 8.07726 19.4404 8.06446 21.4126C8.06262 23.3426 8.59151 25.2348 9.59162 26.8763L30.7906 48.2561L41.5509 59.0767C42.6165 59.546 43.7655 59.7885 44.9271 59.7893C50.0879 59.7893 54.289 54.9848 54.4002 49.0103V23.1824C54.4361 20.2427 53.3203 17.4088 51.298 15.304C49.2758 13.1991 46.5127 11.9956 43.6164 11.958Z" fill="#95018F"/>
                            <path className={'text-logo'} d="M74.3025 30.8811H93.1958V45.2903H94.2421V15.3658H93.1958V29.8198H74.3025V15.3658H73.2412V45.2903H74.3025V30.8811ZM101.432 37.2187C101.432 42.8389 106.977 45.7088 112.553 45.7088C118.128 45.7088 123.718 42.8389 123.718 37.2187V23.3925C123.718 17.7723 118.128 14.9473 112.553 14.9473C106.977 14.9473 101.432 17.7723 101.432 23.3925V37.2187ZM102.493 23.3925C102.493 18.2357 107.485 15.9936 112.508 15.9487C117.545 15.9487 122.657 18.146 122.657 23.3925V37.2187C122.657 42.2111 117.59 44.6625 112.553 44.6625C107.485 44.6625 102.493 42.2111 102.493 37.2187V23.3925ZM131.79 15.3658H130.728V37.0842C130.728 42.7941 135.975 45.7088 141.207 45.7088C146.453 45.7088 151.744 42.7941 151.744 37.0842V15.3658H150.683V37.0842C150.683 42.1663 145.9 44.6924 141.207 44.6924C136.483 44.6924 131.79 42.1663 131.79 37.0842V15.3658ZM159.098 22.2116C159.382 17.7275 163.448 15.9487 167.678 15.9487C171.011 15.9487 174.434 17.2193 176.004 19.9247L176.975 19.551C175.107 16.2925 171.52 14.9473 167.678 14.9473C162.895 14.9473 158.202 17.2641 158.037 22.2116C157.783 27.8767 163.149 29.5657 167.633 30.4924C172.282 31.5089 176.931 32.9886 176.557 38.3099C175.959 42.7044 171.863 44.6924 167.723 44.6924C164.21 44.6924 160.698 43.2574 158.755 40.4772L157.783 40.8958C160.025 44.2738 163.956 45.7088 167.633 45.7088C172.536 45.7088 177.349 43.1378 177.693 38.3099C178.111 32.4356 172.79 30.4476 167.887 29.476C163.059 28.5045 158.755 26.651 159.098 22.2116ZM184.882 16.4121H201.623V15.3658H183.821V45.2903H201.623V44.229H184.882V30.9558H200.353V29.8198H184.882V16.4121Z"/>
                            <path className={'text-logo'} d="M206.107 30.4925C206.152 40.5969 213.76 45.6341 221.279 45.6341C226.735 45.6341 232.355 43.2575 234.477 37.0843C235.494 34.2144 235.494 31.3894 235.314 28.4298H221.324V34.9767H227.632C226.271 37.8018 224.328 38.6089 221.279 38.6089C216.81 38.6089 213.925 35.3952 213.925 30.4925C213.925 25.9785 216.511 22.2566 221.279 22.2566C224.283 22.2566 226.226 23.273 227.452 25.7991H234.896C233.461 18.445 227.243 15.3659 221.279 15.321C213.76 15.321 206.152 20.3882 206.107 30.4925ZM224.194 31.3445H232.026V31.8079C232.026 38.026 227.288 42.3308 221.279 42.3308C215.539 42.3756 209.784 38.1904 209.784 30.4925C209.784 22.8096 215.539 18.6543 221.279 18.6543C224.792 18.6543 228.558 20.2686 230.457 23.557H229.948C228.125 20.5675 224.747 19.0429 221.279 19.0429C214.852 18.9981 210.248 23.9905 210.248 30.4925C210.248 37.0843 214.852 41.9123 221.279 41.9123C227.153 41.9123 231.473 37.8914 231.563 31.8079H224.194V31.3445ZM244.866 18.8337H256.913V19.2522H245.329V29.7751H256.076V30.1936H245.329C245.329 34.05 245.329 37.8914 245.329 41.7329H257.302V42.1664H244.866C244.866 34.3489 244.866 26.5614 244.866 18.8337ZM259.798 15.6947C252.863 15.6947 248.169 15.6947 241.323 15.6947C241.323 25.5151 241.323 35.3952 241.323 45.2903C248.169 45.2903 253.236 45.2903 260.172 45.2903C260.172 43.0483 260.172 40.7613 260.172 38.5641C255.732 38.5641 253.191 38.5641 248.842 38.5641C248.842 36.8003 248.842 35.0963 248.842 33.3774H258.901C258.901 31.1353 258.901 28.8932 258.901 26.6511H248.842V22.4658C253.191 22.4658 255.389 22.4658 259.798 22.4658C259.798 20.1789 259.798 17.892 259.798 15.6947ZM289.424 45.3352H292.129V15.6947C289.543 15.6947 286.972 15.6947 284.386 15.6947V30.1936L269.424 15.5751H266.689V45.2903C269.26 45.2903 271.875 45.2903 274.506 45.2903V30.7466L289.424 45.3352ZM270.276 21.6587H270.739C273.579 24.409 276.405 27.2041 279.155 29.9843C282.159 32.7795 285.074 35.6942 288.033 38.6089V18.5796H288.497V39.3264H288.153C285.238 36.5013 282.413 33.751 279.573 30.9559C276.703 28.1309 273.744 25.2161 270.784 22.3762V42.3756H270.276V21.6587ZM304.52 41.7777V19.2522H300.41V18.8337C303.25 18.8337 306.165 18.8337 308.99 18.8337V19.2522H304.939V41.7777H309.333V42.2112C306.254 42.2112 303.16 42.2112 300.036 42.2112V41.7777H304.52ZM308.451 38.6538V22.3014H311.904C311.904 19.7604 311.904 18.1909 311.904 15.6947C307.091 15.6947 302.323 15.6947 297.495 15.6947C297.495 18.1909 297.495 19.7604 297.495 22.3014H300.963V38.6538H297.196C297.196 41.15 297.196 42.7045 297.196 45.2903C302.233 45.2903 307.181 45.2903 312.203 45.2903C312.203 42.7045 312.203 41.15 312.203 38.6538H308.451ZM320.708 18.8337H332.756V19.2522H321.172V29.7751H331.904V30.1936H321.172C321.172 34.05 321.172 37.8914 321.172 41.7329H333.129V42.1664H320.708C320.708 34.3489 320.708 26.5614 320.708 18.8337ZM335.626 15.6947C328.69 15.6947 323.997 15.6947 317.151 15.6947C317.151 25.5151 317.151 35.3952 317.151 45.2903C323.997 45.2903 329.079 45.2903 335.999 45.2903C335.999 43.0483 335.999 40.7613 335.999 38.5641C331.56 38.5641 329.034 38.5641 324.684 38.5641C324.684 36.8003 324.684 35.0963 324.684 33.3774H334.744C334.744 31.1353 334.744 28.8932 334.744 26.6511H324.684V22.4658C329.034 22.4658 331.231 22.4658 335.626 22.4658C335.626 20.1789 335.626 17.892 335.626 15.6947Z"/>
                        </svg>
                        </a>
                    </div>

                    <div>
                        <a href="/" className={'btn btn-primary'}>Join Us/Sign In</a>
                    </div>
                </div>
            </header>
        </>
    )
}
