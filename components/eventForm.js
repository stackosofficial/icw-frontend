import classNames from 'classnames';
import styles from './eventForm.module.css';
import { useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import {useState, useRef} from 'react';
import axios from 'axios';
import { categoriesList } from './common';

export default function EventForm ({siteKey, NEXT_PUBLIC_BE_URL}) {

    var [event, setEvent] = useState({});
    const [isDisabled, setDisabled] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('');
    const captchaRef = useRef(null)

    const stringIsAValidUrl = (s, protocols) => {
        try {

            let linkurl = new URL(s);
            
            return protocols
                ? linkurl.protocol
                    ? protocols.map(x => `${x.toLowerCase()}:`).includes(linkurl.protocol)
                    : false
                : true;
        } catch (err) {
            return false;
        }
    };

    const isPhoneNo = (str) => 
    {
        if(!str)
            return false;

        if(str.includes('.'))
            return false;

        try {
            var num = parseInt(str);
            var fnum = parseFloat(str);
            if((fnum - num)) {
                return false;
            }
            if(num > 9999999999 || num < 1000000000)
                return false;

            return true;
        }
        catch(err) {
            return false;
        }
    }

    const validate = () =>
    {
        if(!event.name) {
            setErrorMessage("Please enter the event name.");
            return false;
        }

        if(!event.createdByEmail) {
            setErrorMessage("Please enter your email.");
            return false;
        }

        if(!event.phoneNo) {
            setErrorMessage("Please enter your phone number.");
            return false;
        }

        if(event.name.length > 32) {
            setErrorMessage("name should be less than 32 characters.");
            return false;
        }

        if(event.venue && event.venue.length > 32) {
            setErrorMessage("Venue should be less than 32 characters.");
            return false;
        }

        if(event.createdByEmail.length > 254) {
            setErrorMessage("Email length is too big.");
            return false;
        }

        if(event.from) {
            const today = new Date();
            let aTime = new Date(event.from);
            if(aTime < today) {
                setErrorMessage("From time cannot be older than today.");
                return false;
            }

            if(event.to) {
                let bTime = new Date(event.to);
                if(aTime > bTime) {
                    setErrorMessage("From time cannot be greater than To Time.");
                    return false;
                }
            }
        }
        
        // if(event.link && !stringIsAValidUrl(event.link, ['http', 'https'])) {
        //     setErrorMessage("Link is not a valid URL. Enter a HTTP/HTTPS link.");
        //     return false;
        // }

        if(!event.createdByEmail.match('@')) {
            setErrorMessage('Please enter a correct email.');
            return false;
        }

        if(!isPhoneNo(event.phoneNo)) {
            setErrorMessage('Please enter a valid phone No.');
            return false;
        }

        if(event.price && isNaN(event.price)) {
            setErrorMessage('Price should be a number.');
            return false;
        }

        const token = captchaRef.current.getValue();
        if(!token || !token.length) {
            setErrorMessage("Please enter the captcha.");
            return false;
        }

        return true;
    }

    const onChange = (change) => {
        event = {...event, ...change};
        setEvent(event);

        // if(event.name && event.createdByEmail && isPhoneNo(event.phoneNo)) {
        //     setDisabled(false);
        // }
        // else {
        //     setDisabled(true);
        // }
    }

    const onSubmit = () => {
        if(!validate()) {
            return;
        }
        const token = captchaRef.current.getValue();
        captchaRef.current.reset();

        setErrorMessage('');
        setSuccessMessage('');
        setDisabled(true);

        axios.post(`${NEXT_PUBLIC_BE_URL}/users`, {
            token,
            event,
        }).then((res) => {
            if(res && res.data) {
                if(res.data.success) {
                    event = {};
                    setEvent(event);
                    setDisabled(true);
                    setSuccessMessage('Your event has been sent for approval!');
                }
                else {
                    if(res.data.reason) {
                        setDisabled(false);
                        setErrorMessage('Event registration failed. Reason: ' + res.data.reason);
                    }
                    else {
                        setDisabled(false);
                        setErrorMessage('Event registration failed.');
                    }
                }
            }
            else {
                setDisabled(false);
                setErrorMessage('Event registration failed.');
            }

        })
        .catch((error) => {
            console.error("error: ",error);
            setErrorMessage('An error occured while submitting details.');
            setDisabled(false);
        })
        ;
    }

    return (
        <div className={styles.eventSection} id='event-register'>
            <div className={styles.eventCard}>
                <div className={styles.eventCardTitle}>EVENT REGISTRATION</div>
                <div className={styles.eventCardCenter}>
                    <div className={styles.eventForm}>
                        <div className={styles.eventFieldList}>
                            <div className={styles.eventField}>
                                <div className={styles.eventFieldLabel}>Name<span className={styles.reqField}>*</span>: </div>
                                <div className={styles.eventFieldInputContainer}>
                                    <input type='text'
                                        value={event.name ? event.name : ''}
                                        onChange={(e) => onChange({name: e.target.value})}
                                        className={styles.eventFieldInput}/>
                                </div>
                            </div>
                            <div className={styles.eventField}>
                                <div className={styles.eventFieldLabel}>Link: </div>
                                <div className={styles.eventFieldInputContainer}>
                                    <input type='text'
                                        value={event.link ? event.link : ''}
                                        className={styles.eventFieldInput}
                                        onChange={(e) => onChange({link: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className={styles.eventField}>
                                <div className={styles.eventFieldLabel}>Contact: </div>
                                <div className={styles.eventFieldInputContainer}>
                                    <textarea 
                                        rows="4"
                                        value={event.contact ? event.contact : ''}
                                        className={classNames(styles.eventFieldInput, styles.textAreaInput)}
                                        onChange={(e) => onChange({contact: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className={styles.eventField}>
                                <div className={styles.eventFieldLabel}>From: </div>
                                <div className={styles.eventFieldInputContainer}>
                                    <input type='date'
                                        value={event.from ? event.from : ''}
                                        className={styles.eventFieldInput}
                                        onChange={(e) => onChange({from: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className={styles.eventField}>
                                <div className={styles.eventFieldLabel}>To: </div>
                                <div className={styles.eventFieldInputContainer}>
                                    <input type='date'
                                        disabled={!event.from}
                                        value={event.to ? event.to : ''}
                                        className={styles.eventFieldInput}
                                        onChange={(e) => onChange({to: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className={styles.eventField}>
                                <div className={styles.eventFieldLabel}>Venue: </div>
                                <div className={styles.eventFieldInputContainer}>
                                    <input type='text'
                                        value={event.venue ? event.venue : ''}
                                        className={styles.eventFieldInput}
                                        onChange={(e) => onChange({venue: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className={styles.eventField}>
                                <div className={styles.eventFieldLabel}>Email<span className={styles.reqField}>*</span>: </div>
                                <div className={styles.eventFieldInputContainer}>
                                    <input type='text'
                                        value={event.createdByEmail ? event.createdByEmail : ''}
                                        className={styles.eventFieldInput}
                                        onChange={(e) => onChange({createdByEmail: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className={styles.eventField}>
                                <div className={styles.eventFieldLabel}>Ph No<span className={styles.reqField}>*</span>: </div>
                                <div className={styles.eventFieldInputContainer}>
                                    <input type='text'
                                        value={event.phoneNo ? event.phoneNo : ''}
                                        className={styles.eventFieldInput}
                                        onChange={(e) => onChange({phoneNo: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className={styles.eventField}>
                                <div className={styles.eventFieldLabel}>Price <span className={styles.priceFont}>(INR)</span>: </div>
                                <div className={styles.eventFieldInputContainer}>
                                    <input type='text'
                                        value={event.price ? event.price : ''}
                                        className={styles.eventFieldInput}
                                        onChange={(e) => onChange({price: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className={styles.eventField}>
                                <div className={styles.eventFieldLabel}>Category: </div>
                                <div className={styles.eventFieldInputContainer}>
                                    <select name="category"
                                            default=''
                                            value={event.category ? event.category : ''}
                                            onChange={(e) => onChange({category: e.target.value})}
                                            className={styles.eventFieldInput}
                                        >
                                            <option value="" disabled selected>select</option>
                                        {
                                            categoriesList.map((category, index) => {
                                                return (
                                                    <option key={index} value={category}>{category}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={styles.captchaContainer}>
                            <div>
                                <ReCAPTCHA
                                    sitekey={siteKey}
                                    // sitekey={publicRuntimeConfig.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                    ref={captchaRef}
                                />
                            </div>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button
                                type='button'
                                className={classNames('globalButton')}
                                // disabled={isDisabled}
                                onClick={onSubmit}
                            >SUBMIT</button>
                        </div>
                        <div className={styles.validateContainer}>
                            {errorMessage ? <div className={styles.errorMessage}>{errorMessage}</div> : ''}
                            {(!errorMessage) && successMessage ? <div className={styles.successMessage}>{successMessage}</div>: ''}
                        </div>
                    </div>
                </div>
                <div className={styles.lineContainer}>
                    <div className={classNames('globalEndLine', styles.endLine)}>&nbsp;</div>
                </div>
            </div>
        </div>
    );
}