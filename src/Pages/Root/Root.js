import {Outlet} from "react-router-dom";
import {Header} from "../../Components/Header/Header";
import {Footer} from "../../Components/Footer/Footer";
import {useLocation} from "react-router-dom";
import {useState, useEffect} from "react";

export const Root = () => {
    const location = useLocation()
    const [footerBar, setFooterBar] = useState(false)

    useEffect(() => {
        if(location.pathname === '/') {
          setFooterBar(false);
        } else {
          setFooterBar(true);
        }
    },[location])
    return (
        <>
            <Header/>
            <div className={'content-main'}>
                <Outlet/>
            </div>
            {footerBar ? <Footer/> : ''}
        </>
    )
}
