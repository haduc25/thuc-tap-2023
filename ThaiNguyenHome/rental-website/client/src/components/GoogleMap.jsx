// import React from 'react';

// const GoogleMap = ({ address }) => {
//     const encodedAddress = encodeURIComponent(address);
//     const iframeSrc = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodedAddress}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;

//     console.log('encodedAddress: ', encodedAddress);
//     return (
//         <div>
//             <div style={{ width: '100%' }}>
//                 <iframe
//                     width="100%"
//                     height="600"
//                     frameBorder="0"
//                     scrolling="no"
//                     marginHeight="0"
//                     marginWidth="0"
//                     src={iframeSrc}
//                 />
//             </div>
//         </div>
//     );
// };

// export default GoogleMap;
import React from 'react';

const GoogleMap = ({ address }) => {
    const encodedAddress = encodeURIComponent(address);
    const iframeSrc = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodedAddress}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;

    return (
        <div className="max-w-full overflow-hidden rounded-lg shadow-lg">
            <div className="w-full h-96">
                <iframe
                    className="w-full h-full"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={iframeSrc}
                    title="Google Map"
                />
            </div>
        </div>
    );
};

export default GoogleMap;
