const BookingStatusBadge = ({ status }) => {
    const statusStyles = {
        pending: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-lg',
        approved: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg',
        rejected: 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg',
        cancelled: 'bg-gradient-to-r from-slate-400 to-slate-500 text-white shadow-lg',
    };

    return (
        <span className={`px-4 py-1.5 inline-flex text-xs leading-5 font-bold rounded-full ${statusStyles[status] || statusStyles.cancelled}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default BookingStatusBadge;
