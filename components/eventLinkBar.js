import styles from './eventLinkBar.module.css'
import classNames from 'classnames';

const moveTo = (elemID) => {
    const element = document.getElementById(elemID)
    if(element != null)
        element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

export default function Navbar () {
    return (
        <div className={styles.navbarSection}>
            <div className={styles.navBar}>
                <div className={styles.navbarButton} onClick={() => moveTo('newsletter')}>
                    NOTIFICATIONS
                </div>
                <div className={classNames(styles.navbarButton, styles.paddingLeft)} onClick={() => moveTo('event-table')}>
                    SCHEDULE
                </div>
                <div className={classNames(styles.navbarButton, styles.paddingLeft)} onClick={() => moveTo('event-register')}>
                    ADD EVENT
                </div>
            </div>
        </div>

    );
}