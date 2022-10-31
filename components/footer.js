import Image from 'next/image';
import styles from './footer.module.css'
import twitterPic from '../public/images/icons/twitter.webp';

export default function Footer () {
    return (
        <div className={styles.footerSection}>
            <div className={styles.footerCard}>
                <div className={styles.footerText}>
                    © 2022 India Crypto Week. All Rights Reserved.
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