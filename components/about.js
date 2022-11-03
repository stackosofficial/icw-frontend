import styles from './about.module.css'
import classNames from 'classnames'

export default function eventDescription () {
    return (
        <div className={styles.aboutSection} id='event-about'>
            <div className={styles.aboutTitle}>ABOUT</div>
            <div className={styles.textContainer}>
                <div className={styles.aboutText}>
                India Blockchain Week is a week of various independently organised side events around 
                major crypto events in India. This time it is centered around
                ETHIndia, Bangalore from from 26th November - 4th December 2022.
                The week concludes with the ETHIndia on 4th December.
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