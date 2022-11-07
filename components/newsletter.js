import styles from './newsletter.module.css'
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { SocialIcon } from 'react-social-icons';


export default function Newsletter (
    {siteKey,
    NEXT_PUBLIC_BE_URL,
    NEXT_PUBLIC_TELEGRAM_LINK,
    NEXT_PUBLIC_WHATSAPP_LINK
}) {
    const captchaRef = useRef(null)
    const [isSuccess, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    var [userData, setUserData] = useState({});
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

        axios.post(`${NEXT_PUBLIC_BE_URL}/newsletter`, {
            ...userData,
            token
        })
        .then((res) => {
            if(res && res.data) {
                if(res.data.success) {
                    setSuccess(true);
                    setDisabled(true);
                    setUserData({});
                }
                else {
                    if(res.data.reason) {
                        setDisabled(false);
                        setErrorMessage(res.data.reason);
                    }
                    else {
                        setDisabled(false);
                        setErrorMessage('Failed to confirm your email.');
                    }
                }
            }
            else {
                setDisabled(false);
                setErrorMessage('Failed to confirm your email.');
            }
        })
        .catch((err) => {
            setDisabled(false);
            setErrorMessage('Failed to send email.');
        });
    }

    return (
        <div className={styles.letterContainer} id='newsletter'>
                <div className={styles.signupBackground}>
                    <div className={styles.signupBar}>
                        <div className={styles.signupMiddle}>
                            <div className={styles.connectTitleContainer}>
                                GET NOTIFICATIONS
                            </div>
                            <div className={styles.iconCenter}>
                                <div className={styles.navBar}>
                                    <div className={styles.navCell}>
                                        <SocialIcon
                                            url={NEXT_PUBLIC_WHATSAPP_LINK ? NEXT_PUBLIC_WHATSAPP_LINK : 'https://www.whatsapp.com'}
                                            bgColor='#1B1B1B'
                                        />
                                        <a
                                            href={NEXT_PUBLIC_WHATSAPP_LINK ? NEXT_PUBLIC_WHATSAPP_LINK : 'https://www.whatsapp.com'}
                                            className={styles.navCellTitle}>WHATSAPP</a>
                                    </div>
                                    <div className={styles.navCell}>
                                        <SocialIcon 
                                        url={NEXT_PUBLIC_TELEGRAM_LINK ? NEXT_PUBLIC_TELEGRAM_LINK : 'https://www.telegram.com'}
                                        bgColor='#1B1B1B'
                                        />
                                        <a
                                        className={styles.navCellTitle}
                                        href={NEXT_PUBLIC_TELEGRAM_LINK ? NEXT_PUBLIC_TELEGRAM_LINK : 'https://www.telegram.com'}
                                        >
                                        TELEGRAM
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className={styles.lineContainer}>
                        <div className={classNames( 'globalEndLine', styles.endLine)}>&nbsp;</div>
                    </div> */}
                </div>

            <div className={styles.center}>
                <div className={styles.connectCards}>

                    <div className={styles.newsletterCard}>
                        <div className={styles.connectTitleContainer}>
                            NEWSLETTER
                        </div>
                        <div className={styles.description}>
                            Get notified of the finest Web3 meetups in India.
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
                                sitekey={siteKey}
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
        </div>

    );

}
