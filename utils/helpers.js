module.exports = {
    format_date: (date) => {
        // Format date as MM/DD/YYYY
        console.log(date);
        return date.toLocaleDateString();
        
    },
    format_amount: (amount) => {
        // format large numbers with commas
        return parseInt(amount).toLocaleString();
    },
    format_time: (time) => {
        // Format date as h:mm 
        console.log(time);
        return time.toLocaleTimeString();
        
    }
}
