import React from 'react';

// The single place Unicode stars are allowed. Decorative stars are hidden from
// screen readers; the value is announced as text.
function Rating({ value, outOf = 5, className = '' }) {
    return (
        <span className={className}>
            <span aria-hidden="true">{'★'.repeat(Math.round(value))}</span>
            <span className="sr-only">Rated {value} out of {outOf}</span>
            <span aria-hidden="true"> {value}/{outOf}</span>
        </span>
    );
}

export default Rating;
