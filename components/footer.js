import Image from 'next/image';
import styles from './footer.module.css'

export default function Footer () {
    return (
        <div className={styles.footerSection}>
            <div className={styles.footerCard}>
                <div className={styles.footerText}>
                    © 2022 www.IndiaBlockchainWeek.in. All Rights Reserved.
                    <span className={styles.stackLink}> | </span> Running on: <a href='https://www.stackos.io' target="_blank" rel="noopener noreferrer" className={styles.stackLink}>www.stackos.io</a>
                </div>
                <div className={styles.footerTwitterContainer}>
                    {/* <div className={styles.footerTwitterImage}>
                        <Image
                            src={twitterPic}
                            alt="Picture of twitter"
                            />
                    </div> */}
                </div>
            </div>

        </div>
    );
}