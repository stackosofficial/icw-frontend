import styles from './newsletter.module.css'
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

export default function Newsletter () {
    const captchaRef = useRef(null)
    const [isSuccess, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState({});
    const [isDisabled, setDisabled] = useState(true);

    const onChange = (userChange) => {
        userData = {...userData, ...userChange};
        setUserData(userData);

        if(userData.email && userData.email.includes("@")) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }

    const sendNewsletterEmail = () => {

        const token = captchaRef.current.getValue();

        if(!userData.email) {
            return;
        }

        if(!token) {
            setSuccess(false);
            setErrorMessage('Please enter the captcha.');
            return;
        }

        captchaRef.current.reset();
        setDisabled(true);
        setSuccess(false);
        setErrorMessage('');

        axios.post(`http://localhost:3000/newsletter`, {
            ...userData,
            token
        })
        .then((res) => {
            setDisabled(true);
            if(res && res.data) {
                if(res.data.success) {
                    setSuccess(true);
                    setUserData({});
                }
                else {
                    if(res.data.reason) {
                        setErrorMessage(res.data.reason);
                    }
                    else {
                        setErrorMessage('Failed to confirm your email.');
                    }
                }
            }
            else {
                setErrorMessage('Failed to confirm your email.');
            }
        })
        .catch((err) => {
            setDisabled(true);
            setErrorMessage('Failed to send email.');
        });
    }

    return (
        <div className={styles.letterContainer}>
            <div className={styles.letterForm}>
                <div className={styles.card}>
                    <div className={styles.titleContainer}>
                        <div className={styles.title}>
                            NEWSLETTER
                        </div>
                    </div>
                    <div className={styles.description}>
                        Get notified of the finest web3 meetups in India.
                    </div>
                    <div className={styles.enterFieldContainer}>
                        <input type='text'
                            placeholder='Enter your email'
                            value={userData.email ? userData.email : ''}
                            className={classNames('globalInput', styles.enterInput)}
                            onChange={(e) => onChange({email: e.target.value})}
                        />
                    </div>
                    <div className={styles.captchaContainer}>
                        <div>
                        <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                            ref={captchaRef}
                        />
                        </div>
                    </div>
                    <div className={styles.enterFieldContainer}>
                        <button className={classNames('globalButton', styles.enterButton)}
                            onClick={() => sendNewsletterEmail()}
                            disabled={isDisabled}
                        >
                            SUBSCRIBE
                        </button>
                    </div>
                    <div className={styles.validateContainer}>
                        {errorMessage ? <div className={styles.errorMessage}>{errorMessage}</div> : ''}
                        {(!errorMessage) && isSuccess ? <div className={styles.successMessage}>Success, check your email inbox for confirmation.</div>: ''}
                    </div>
                </div>
            </div>
        </div>

    );

}
