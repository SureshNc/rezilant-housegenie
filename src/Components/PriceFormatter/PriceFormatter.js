const PriceFormatter = ({ price }) => {
    // Convert the price string to a number
    const priceNumber = parseFloat(price);

    // Format the price using toLocaleString method
    const formattedPrice = priceNumber.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0, // Set maximum number of digits after the decimal point
    });

    return (
        <>
             {formattedPrice}
        </>
    );
};

export default PriceFormatter;
