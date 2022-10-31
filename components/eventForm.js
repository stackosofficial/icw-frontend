import classNames from 'classnames';
import styles from './eventForm.module.css';
import { useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import {useState, useRef} from 'react';
import axios from 'axios';
import { categoriesList } from './common';

const USERURL = 'http://localhost:3000/users';


export default function EventForm () {

    const [event, setEvent] = useState({});
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

    const validate = () => {
        let aTime = new Date(event.from);
        let bTime = new Date(event.to);
        const today = new Date();
        if(aTime < today) {
            setErrorMessage("From time cannot be older than today.");
            return false;
        }
        if(aTime > bTime) {
            setErrorMessage("From time cannot be greater than To Time.");
            return false;
        }
        
        if(!stringIsAValidUrl(event.link, ['http', 'https'])) {
            setErrorMessage("Link is not a valid URL. Enter a HTTP/HTTPS link.");
            return false;
        }

        if(!event.createdByEmail) {
            setErrorMessage('Please enter the email.');
            return false;
        }
        if(!event.createdByEmail.match('@')) {
            setErrorMessage('Please enter a correct email.');
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

        console.log("checking event changes", JSON.stringify(event), new Date('2022-10-29T06:00'));
        if(event.name && event.link && event.from && event.to && event.createdByEmail) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
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

        axios.post(`${USERURL}`, {
            token,
            event,
        }).then((res) => {

            setDisabled(false);
            if(res && res.data) {
                if(res.data.success) {
                    event = {};
                    setEvent(event);
                    setSuccessMessage('Your event has been sent for approval!');
                }
                else {
                    if(res.data.reason) {
                        setErrorMessage('Event registration failed. Reason: ' + res.data.reason);
                    }
                    else {
                        setErrorMessage('Event registration failed.');
                    }
                }
            }
            else {
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
                <div className={styles.eventForm}>
                    <div className={styles.eventFieldList}>
                        <div className={styles.eventField}>
                            <div className={styles.eventFieldLabel}>Name: </div>
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
                            <div className={styles.eventFieldLabel}>From: </div>
                            <div className={styles.eventFieldInputContainer}>
                                <input type='datetime-local'
                                    value={event.from ? event.from : ''}
                                    className={styles.eventFieldInput}
                                    onChange={(e) => onChange({from: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className={styles.eventField}>
                            <div className={styles.eventFieldLabel}>To: </div>
                            <div className={styles.eventFieldInputContainer}>
                                <input type='datetime-local'
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
                            <div className={styles.eventFieldLabel}>Email: </div>
                            <div className={styles.eventFieldInputContainer}>
                                <input type='text'
                                    value={event.createdByEmail ? event.createdByEmail : ''}
                                    className={styles.eventFieldInput}
                                    onChange={(e) => onChange({createdByEmail: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className={styles.eventField}>
                            <div className={styles.eventFieldLabel}>Category: </div>
                            <div className={styles.eventFieldInputContainer}>
                                <select name="category"
                                        value={event.category ? event.category : ''}
                                        onChange={(e) => onChange({category: e.target.value})}
                                        className={styles.eventFieldInput}
                                    >
                                    {
                                        categoriesList.map((category) => {
                                            return (
                                                <option value={category}>{category}</option>
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
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                ref={captchaRef}
                            />
                        </div>
                    </div>
                    <div className={styles.validateContainer}>
                        {errorMessage ? <div className={styles.errorMessage}>{errorMessage}</div> : ''}
                        {(!errorMessage) && successMessage ? <div className={styles.successMessage}>{successMessage}</div>: ''}
                    </div>
                    <div className={styles.buttonContainer}>
                        <button
                            type='button'
                            className={classNames('globalButton')}
                            disabled={isDisabled}
                            onClick={onSubmit}
                        >ENTER</button>
                    </div>
                </div>
                <div className={styles.lineContainer}>
                    <div className={classNames('globalEndLine', styles.endLine)}>&nbsp;</div>
                </div>
            </div>
        </div>
    );
}