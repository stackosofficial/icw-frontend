import styles from './eventLinkBar.module.css'


const moveTo = (elemID) => {
    const element = document.getElementById(elemID)
    if(element != null)
        element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

export default function Navbar () {
    return (
        <div className={styles.navbarSection}>
            <div className={styles.navbarButton} onClick={() => moveTo('newsletter')}>
                NOTIFICATIONS
            </div>
            <div className={styles.navbarButton} onClick={() => moveTo('event-table')}>
                SCHEDULE
            </div>
            <div className={styles.navbarButton} onClick={() => moveTo('event-register')}>
                ADD EVENT
            </div>
        </div>
    );
}