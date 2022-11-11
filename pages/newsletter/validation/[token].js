import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';



export default function NewsletterValidation({NEXT_PUBLIC_BE_URL}) {

    const router = useRouter()
    const [response, setResponse] = useState('');
    const [isSent, setSent] = useState(false);

    var success = false;
    const { token } = router.query;

    useEffect(() => {
        const { token } = router.query;
        if(!token)
            return;

        if(isSent)
            return;
        
        setSent(true);
        axios.post(`${NEXT_PUBLIC_BE_URL}/newsletter/validation/${token}`,{})
        .then((res) => {
            if(res && res.data) {
                if(res.data.success) {
                    success = true;
                    setResponse("Your email has been confirmed!");
                }
                else {
                    if(!success && res.data.reason) {
                        setResponse("An error occured. "+res.data.reason);
                    }
                }
            }
            else {
                if(!success)
                    setResponse("A problem occured when confirming your email. Please try again.");
            }
        })
        .catch((err) => {
            if(!success)
                setResponse("A problem occured when confirming your email. Please try again.");
        })

    }, []);

    return (
        <div>
            {response}
        </div>
    );
}

NewsletterValidation.getInitialProps = async () => {
    return {
        NEXT_PUBLIC_BE_URL: process.env.NEXT_PUBLIC_BE_URL_EXTERNAL || ''
    }
  }
  