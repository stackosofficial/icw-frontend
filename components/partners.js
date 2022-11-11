import Image from 'next/image';
import styles from './partners.module.css'
import decodeWeb3 from '../public/images/partners/decodeWeb3.png'
import HydDAO from '../public/images/partners/Hyd_Dao.jpg'
import Web3Punjab from '../public/images/partners/web3pb.png'
import StackOS from '../public/images/partners/StackOS.png'
import PuneDAO from '../public/images/partners/PuneDAO.png'
import Doodhwala from '../public/images/partners/doodhwala.png'
import QuilAudits from '../public/images/partners/QuillAudits_logo.png'
import CredSheilds from '../public/images/partners/credShields.png'
import ProductHouse from '../public/images/partners/productHouse.png'
import Web3Events from '../public/images/partners/web3Events.png'

export default function Partners () {
    const width = 200;
    const height = 160;
    return (
        <div className={styles.mediaSection} id='event-media-partners'>
            <div className={styles.mediaCard}>
                <div className={styles.mediaColumn}>
                    <div className={styles.mediaTitle}>FEATURED PARTNERS</div>
                    <div className={styles.mediaCenter}>
                        <div className={styles.mediaRow}>
                        <div className={styles.mediaPic}>
                                <Image
                                    src={StackOS}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </div>
                            <div className={styles.mediaPic}>
                                <Image
                                    src={decodeWeb3}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </div>
                            <div className={styles.mediaPic}>
                                <Image
                                    src={PuneDAO}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </div>
                            <div className={styles.mediaPic}>
                                <Image
                                    src={Web3Punjab}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </div>
                            <div className={styles.mediaPic}>
                                <Image
                                    src={Doodhwala}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </div>
                            <div className={styles.mediaPic}>
                                <Image
                                    src={HydDAO}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </div>
                            <div className={styles.mediaPic}>
                                <Image
                                    src={QuilAudits}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </div>
                            <div className={styles.mediaPic}>
                                <Image
                                    src={CredSheilds}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </div>
                            <div className={styles.mediaPic}>
                                <Image
                                    src={ProductHouse}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </div>
                            <div className={styles.mediaPic}>
                                <Image
                                    src={Web3Events}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}