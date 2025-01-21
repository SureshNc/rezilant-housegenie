import React, { useEffect, useState } from 'react';

const ElapsedTime = ({ listingDate }) => {
    const [elapsedTime, setElapsedTime] = useState('');

    useEffect(() => {
        const calculateElapsedTime = () => {
            const currentDate = new Date();
            const providedDate = new Date(listingDate);

            const elapsedMilliseconds = currentDate - providedDate;
            const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
            const elapsedMinutes = Math.floor(elapsedSeconds / 60);
            const elapsedHours = Math.floor(elapsedMinutes / 60);
            const elapsedDays = Math.floor(elapsedHours / 24);
            const elapsedMonths = Math.floor(elapsedDays / 30);
            const elapsedYears = Math.floor(elapsedMonths / 12);

            if (elapsedYears > 0) {
                setElapsedTime(`${elapsedYears} year${elapsedYears > 1 ? 's' : ''} ago`);
            } else if (elapsedMonths > 0) {
                setElapsedTime(`${elapsedMonths} month${elapsedMonths > 1 ? 's' : ''} ago`);
            } else if (elapsedDays > 0) {
                setElapsedTime(`${elapsedDays} day${elapsedDays > 1 ? 's' : ''} ago`);
            } else if (elapsedHours > 0) {
                setElapsedTime(`${elapsedHours} hour${elapsedHours > 1 ? 's' : ''} ago`);
            } else if (elapsedMinutes > 0) {
                setElapsedTime(`${elapsedMinutes} minute${elapsedMinutes > 1 ? 's' : ''} ago`);
            } else {
                setElapsedTime(`${elapsedSeconds} second${elapsedSeconds > 1 ? 's' : ''} ago`);
            }
        };

        calculateElapsedTime();

        // Update elapsed time every minute
        const interval = setInterval(calculateElapsedTime, 60000);

        return () => clearInterval(interval);
    }, [listingDate]);

    return (
        <span>{elapsedTime}</span>
    );
};

export default ElapsedTime;
