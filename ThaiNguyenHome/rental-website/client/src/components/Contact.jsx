import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');

    const fetchLandlord = async () => {
        try {
            const res = await fetch(`/api/user/${listing.userRef}`);
            const data = await res.json();
            setLandlord(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchLandlord();
    }, [listing.userRef]);

    // for msg
    const encodedMessage = encodeURIComponent(message);

    // url
    // const mailtoUrl = ;

    return (
        <>
            {landlord && (
                <div className="flex flex-col gap-2">
                    <p>
                        Liên hệ với <span className="font-semibold">{landlord.username}</span> về{' '}
                        <span className="font-semibold">{listing.name.toLowerCase()}</span>
                    </p>
                    <textarea
                        name="message"
                        id="message"
                        rows="2"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message here..."
                        className="w-full border p-3 rounded-lg"
                    ></textarea>

                    <Link
                        to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${encodedMessage}`}
                        className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
                    >
                        {console.log('encodedMessage: ', encodedMessage)}
                        Gửi tin nhắn
                    </Link>
                </div>
            )}
        </>
    );
}
