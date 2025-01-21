import React, { useState, useMemo } from "react";
import Pagino from "pagino";
import './style.css'

export const Pagination = ({ totalPages, onChange, currentPage, resultsPerPage, totalCount, responseCount}) => {
    const [pages, setPages] = useState([]);

    const startResult = (currentPage - 1) * resultsPerPage + 1;
    const endResult = ((startResult - 1) + responseCount);

    const pagino = useMemo(() => {
        const _ = new Pagino({
            showFirst: false,
            showLast: false,
            page: 1,
            siblingCount: 1,
            boundaryCount: 1,
            onChange: (page, count) => setPages(_.getPages())
        });

        _.setCount(totalPages);

        return _;
    }, [totalPages]);

    const handlePaginoNavigation = (type) => {
        if (typeof type === "string") {
            pagino[type]?.();
            return;
        }

        pagino.setPage(type);
        onChange(type); // Trigger onChange event with the new page number
    };

    const renderElement = (page) => {
        if (page === "start-ellipsis" || page === "end-ellipsis") {
            return <button key={page}>...</button>;
        }

        if (page === "previous") {
            return (
                <button key={page} onClick={() => handlePaginoNavigation(pagino.page - 1)} disabled={pagino.page === 1}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M203.9 405.3c5.877 6.594 5.361 16.69-1.188 22.62c-6.562 5.906-16.69 5.375-22.59-1.188L36.1 266.7c-5.469-6.125-5.469-15.31 0-21.44l144-159.1c5.906-6.562 16.03-7.094 22.59-1.188c6.918 6.271 6.783 16.39 1.188 22.62L69.53 256L203.9 405.3z"/></svg>
                </button>
            );
        }

        if (page === "next") {
            return (
                <button key={page} onClick={() => handlePaginoNavigation(pagino.page + 1)} disabled={pagino.page === totalPages}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M219.9 266.7L75.89 426.7c-5.906 6.562-16.03 7.094-22.59 1.188c-6.918-6.271-6.783-16.39-1.188-22.62L186.5 256L52.11 106.7C46.23 100.1 46.75 90.04 53.29 84.1C59.86 78.2 69.98 78.73 75.89 85.29l144 159.1C225.4 251.4 225.4 260.6 219.9 266.7z"/></svg>
                </button>
            );
        }

        return (
            <button
                className={page === pagino.page ? "active" : ""}
                key={page}
                onClick={() => handlePaginoNavigation(page)}
            >
                {page}
            </button>
        );
    };

    return (
        <div className={'pagination-cus mt-3'}>
            <p>
                Showing results <b>{startResult}</b> — <b>{endResult}</b> of <b>{totalCount}</b>
            </p>
            <ul>{pages.map(renderElement)}</ul>
        </div>
    );
};

export default Pagination;




// import React, { useState, useMemo, useEffect } from "react";
// import Pagino from "pagino";
// import { useNavigate, useLocation } from "react-router-dom";
// import './style.css';
//
// export const Pagination = ({ totalPages, onChange, currentPage, resultsPerPage, totalCount, responseCount, clusterTotalCount }) => {
//     const [pages, setPages] = useState([]);
//     const navigate = useNavigate();
//     const location = useLocation();
//
//     const startResult = (currentPage - 1) * resultsPerPage + 1;
//     const endResult = startResult - 1 + responseCount;
//
//     const pagino = useMemo(() => {
//         const _ = new Pagino({
//             showFirst: false,
//             showLast: false,
//             page: currentPage,
//             siblingCount: 1,
//             boundaryCount: 1,
//             onChange: (page, count) => {
//                 setPages(_.getPages());
//                 if (page !== currentPage && typeof onChange === 'function') {
//                     onChange(page); // Trigger onChange event with the new page number if different
//                 }
//             }
//         });
//
//         _.setCount(totalPages);
//
//         return _;
//     }, [totalPages, currentPage, onChange]);
//
//     useEffect(() => {
//         setPages(pagino.getPages());
//     }, [pagino]);
//
//     useEffect(() => {
//         const totalListings = currentPage * resultsPerPage;
//         console.log('Total Listings Count', totalCount)
//         console.log(`Pagination Listings Count(${currentPage} x ${resultsPerPage}) = `, totalListings)
//
//         if (totalCount < totalListings) {
//             // Reset page to 1 if the total listings exceed the cluster total count
//             pagino.setPage(1);
//
//             if (typeof onChange === 'function') {
//                 onChange(1); // Trigger onChange event with page 1
//             }
//             const searchParams = new URLSearchParams(location.search);
//             searchParams.set('page', 1);
//             navigate({
//                 pathname: location.pathname,
//                 search: `?${searchParams.toString()}`
//             });
//         }
//     }, [clusterTotalCount, currentPage, resultsPerPage, navigate, location, pagino, onChange]);
//
//     const handlePaginoNavigation = (event, type) => {
//         event.preventDefault();
//         event.stopPropagation();
//         let newPage = type;
//
//         if (typeof type === "string") {
//             pagino[type]?.();
//             newPage = pagino.page;
//         } else {
//             pagino.setPage(type);
//         }
//
//         // Update URL with new page number
//         const searchParams = new URLSearchParams(location.search);
//         searchParams.set('page', newPage);
//         navigate({
//             pathname: location.pathname,
//             search: `?${searchParams.toString()}`
//         });
//
//         if (typeof onChange === 'function') {
//             onChange(newPage); // Trigger onChange event with the new page number
//         }
//     };
//
//     const renderElement = (page) => {
//         if (page === "start-ellipsis" || page === "end-ellipsis") {
//             return <button key={page} disabled>...</button>;
//         }
//
//         if (page === "previous") {
//             return (
//                 <button key={page} onClick={(event) => handlePaginoNavigation(event, pagino.page - 1)} disabled={pagino.page === 1}>
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M203.9 405.3c5.877 6.594 5.361 16.69-1.188 22.62c-6.562 5.906-16.69 5.375-22.59-1.188L36.1 266.7c-5.469-6.125-5.469-15.31 0-21.44l144-159.1c5.906-6.562 16.03-7.094 22.59-1.188c6.918 6.271 6.783 16.39 1.188 22.62L69.53 256L203.9 405.3z"/></svg>
//                 </button>
//             );
//         }
//
//         if (page === "next") {
//             return (
//                 <button key={page} onClick={(event) => handlePaginoNavigation(event, pagino.page + 1)} disabled={pagino.page === totalPages}>
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M219.9 266.7L75.89 426.7c-5.906 6.562-16.03 7.094-22.59 1.188c-6.918-6.271-6.783-16.39-1.188-22.62L186.5 256L52.11 106.7C46.23 100.1 46.75 90.04 53.29 84.1C59.86 78.2 69.98 78.73 75.89 85.29l144 159.1C225.4 251.4 225.4 260.6 219.9 266.7z"/></svg>
//                 </button>
//             );
//         }
//
//         return (
//             <button
//                 className={page === pagino.page ? "active" : ""}
//                 key={page}
//                 onClick={(event) => handlePaginoNavigation(event, page)}
//             >
//                 {page}
//             </button>
//         );
//     };
//
//     return (
//         <div className="pagination-cus mt-3">
//             <p>
//                 Showing results <b>{startResult}</b> — <b>{endResult}</b> of <b>{totalCount}</b>
//             </p>
//             <ul>{pages.map(renderElement)}</ul>
//         </div>
//     );
// };
//
// export default Pagination;
