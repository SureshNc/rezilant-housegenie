import { useEffect, useState } from 'react';

const ListingDate = () => {
    const [listDate, setListDate] = useState(''); // State to store the list date from API response
    const [elapsedTime, setElapsedTime] = useState(''); // State to store the formatted elapsed time

    // Simulate API call and set list date in state
    useEffect(() => {
        // Assuming you fetch the data from an API and set the list date
        const apiResponse = {
            listDate: '2024-04-09T00:00:00.000Z', // Example list date from API response
            // Other properties...
        };

        setListDate(apiResponse.listDate);
    }, []); // Empty dependency array to run the effect only once on component mount

    // Calculate elapsed time since list date and update state
    useEffect(() => {
        if (listDate) {
            const currentDate = new Date(); // Today's date
            const targetDate = new Date(listDate); // Convert list date string to Date object

            // Calculate the difference in milliseconds between the two dates
            const timeDifference = currentDate.getTime() - targetDate.getTime();

            // Calculate the elapsed time in days, hours, or minutes
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

            // Format the elapsed time based on the magnitude of the difference
            if (daysDifference > 0) {
                setElapsedTime(`${daysDifference} day${daysDifference !== 1 ? 's' : ''}`);
            } else if (hoursDifference > 0) {
                setElapsedTime(`${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''}`);
            } else {
                setElapsedTime(`${minutesDifference} minute${minutesDifference !== 1 ? 's' : ''}`);
            }
        }
    }, [listDate]); // Re-run the effect when listDate changes

    return (
        <>
            {elapsedTime && (
                {elapsedTime}
            )}
        </>
    );
};

export default ListingDate;