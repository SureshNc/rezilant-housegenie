const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        // Generate the date string with locale formatting
        const dateStringFormatted = date.toLocaleDateString('en-GB', options);

        // Split and join to insert the comma
        const [day, month, year] = dateStringFormatted.split(' ');
        return `${day} ${month}, ${year}`;
    };
const FormatDate = ({date}) => {
    const isoDate = '2023-10-20T00:00:00.000Z';
    const formattedDate = formatDate(isoDate);

    return (
        <>
            {formattedDate}
        </>
    )
}

export default FormatDate;
