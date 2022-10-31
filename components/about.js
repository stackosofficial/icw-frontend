import styles from './about.module.css'
import classNames from 'classnames'

export default function eventDescription () {
    return (
        <div className={styles.aboutSection} id='event-about'>
            <div className={styles.aboutTitle}>ABOUT</div>
            <div className={styles.textContainer}>
                <div className={styles.aboutText}>
                India Crypto Week is a week of various independently organised side events around 
                major crypto events in India. This time it is centered around
                ETH India, Bangalore from from 26 November - 4 December 2022.
                The week concludes with the ETH India on 4 December.
                Expect a wide range of meetups, workshops, networking, drinks 
                parties - creating unparalleled networking opportunities. 
                Watch this space for continuous event updates taking place throughout the week.
                </div>
            </div>
            <div className={styles.lineContainer}>
                <div className={classNames('globalEndLine')}>&nbsp;</div>
            </div>
        </div>
    );
}