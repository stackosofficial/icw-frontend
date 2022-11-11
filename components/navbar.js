import styles from './navbar.module.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import React, {useEffect, useState} from 'react';
import OptionMenu from './optionMenu';

const moveTo = (elemID) => {
    const element = document.getElementById(elemID)
    if(element != null)
        element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

export default function Navbar () {

    const [isMobile, setMobile] = useState(false);
    useEffect(() => {
        const resizeFunc = () => {
            if(window && window.innerWidth < 768) {
                setMobile(true);
                console.log("ismobile true");
            }
            else {
                setMobile(false);
            }
        }
        resizeFunc();
        window.addEventListener('resize', resizeFunc)
    }, [])

    const optionList = [
        {name: 'ABOUT', onClick: () => moveTo('event-about')},
        {name: 'NEWSLETTER', onClick: () => moveTo('newsletter')},
        {name: 'SCHEDULE', onClick: () => moveTo('event-table')},
        {name: 'ADD EVENT', onClick: () => moveTo('event-register')},
        {name: 'MEDIA', onClick: () => moveTo('event-media-partners')},
    ];

    const renderDesktop = () => (
        <div className={styles.navbarSection}>
            <div className={styles.navbarButton} onClick={() => moveTo('event-about')}>
                ABOUT
            </div>
            <div className={styles.navbarButton} onClick={() => moveTo('newsletter')}>
                NEWSLETTER
            </div>
            <div className={styles.navbarButton} onClick={() => moveTo('event-table')}>
                SCHEDULE
            </div>
            <div className={styles.navbarButton} onClick={() => moveTo('event-register')}>
                REGISTER
            </div>
            <div className={styles.navbarButton} onClick={() => moveTo('event-media-partners')}>
                MEDIA
            </div>
        </div>
    );

    const renderMobile = () => (
        <div className={styles.mobileSection}>
            <div>
                <OptionMenu optionList={optionList} isRight={true} alignX={-32}/>
            </div>
        </div>
    )

    return (
        <React.Fragment>
            {
                isMobile? renderMobile() : renderDesktop()
            }
        </React.Fragment>
    );
}