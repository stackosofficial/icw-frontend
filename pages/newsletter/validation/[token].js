import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


export default function NewsletterValidation() {

    const router = useRouter()
    const [response, setResponse] = useState('');
    const [isSent, setSent] = useState(false);

    const { token } = router.query;
    console.log("token: ", token);

    useEffect(() => {
        const { token } = router.query;
        if(!token)
            return;

        if(isSent)
            return;
        
        console.log("useEffect token: ", token);

        setSent(true);
        axios.post(`${process.env.NEXT_PUBLIC_BE_URL}/newsletter/validation/${token}`,{})
        .then((res) => {
            if(res && res.data) {
                if(res.data.success) {
                    setResponse("Your email has been confirmed!");
                }
                else {
                    if(res.data.reason) {
                        setResponse("An error occured. "+res.data.reason);
                    }
                }
            }
            else {
                setResponse("A problem occured when confirming your email. Please try again.");
            }
        })
        .catch((err) => {
            setResponse("A problem occured when confirming your email. Please try again.");
        })

    }, [router]);

    return (
        <div>
            {response}
        </div>
    );
}