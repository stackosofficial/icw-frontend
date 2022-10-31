import Image from 'next/image';
import styles from './partners.module.css'
import bloombergPic from '../public/images/partners/bloomberg.webp'
import cnbcPic from '../public/images/partners/cnbc.webp'
import coindeskPic from '../public/images/partners/coindesk.webp'
import fastCompanyPic from '../public/images/partners/fastCompany.webp'

export default function Partners () {
    return (
        <div className={styles.mediaSection} id='event-media-partners'>
            <div className={styles.mediaCard}>
                <div className={styles.mediaColumn}>
                    <div className={styles.mediaTitle}>FEATURED MEDIA PARTNERS</div>
                    <div className={styles.mediaRow}>
                        <div className={styles.mediaPic}>
                        <Image
                            src={bloombergPic}
                            alt="Picture of landscape"
                            />       
                        </div>
                        <div className={styles.mediaPic}>
                        <Image
                            src={cnbcPic}
                            alt="Picture of landscape"
                            />       
                        </div>
                        <div className={styles.mediaPic}>
                        <Image
                            src={coindeskPic}
                            alt="Picture of landscape"
                            />       
                        </div>
                    </div>
                    <div className={styles.mediaRow}>
                        <div className={styles.mediaPic}>
                        <Image
                            src={fastCompanyPic}
                            alt="Picture of landscape"
                            />       
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}