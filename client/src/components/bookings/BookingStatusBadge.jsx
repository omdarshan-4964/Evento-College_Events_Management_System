const BookingStatusBadge = ({ status }) => {
    const statusStyles = {
        pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        approved: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
        cancelled: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
    };

    return (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[status] || statusStyles.cancelled}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default BookingStatusBadge;
