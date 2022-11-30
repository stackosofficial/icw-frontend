import Image from 'next/image';
import styles from './partners.module.css';
import decodeWeb3 from '../public/images/partners/decodeWeb3.png';
import HydDAO from '../public/images/partners/Hyd_Dao.jpg';
import Web3Punjab from '../public/images/partners/web3pb.png';
import StackOS from '../public/images/partners/StackOS.png';
import PuneDAO from '../public/images/partners/PuneDAO.png';
import Doodhwala from '../public/images/partners/doodhwala.png';
import QuilAudits from '../public/images/partners/QuillAudits_logo.png';
import CredSheilds from '../public/images/partners/credShields.png';
import ProductHouse from '../public/images/partners/productHouse.png';
import Web3Events from '../public/images/partners/web3Events.png';
import BuildersTribe from '../public/images/partners/BuildersTribe_logo.png';
import CoinGabbar from '../public/images/partners/CoinGabbar_logo.png';
import Web3Chennai from '../public/images/partners/Web3Chennai_logo.png';
import DaolensLogo from '../public/images/partners/Daolens_logo.png';
import ArmurLogo from '../public/images/partners/Armur_logo.png';
import UPDaoLogo from '../public/images/partners/UPDao_logo.png';
import G3CLogo from '../public/images/partners/Gggc_logo.png';
import OGClub from '../public/images/partners/OGClubDao_logo.png';


export default function Partners ({NEXT_PUBLIC_WHATSAPP_LINK}) {
    const width = 200;
    const height = 160;
    return (
        <div className={styles.mediaSection} id='event-media-partners'>
            <div className={styles.mediaCard}>
                <div className={styles.mediaColumn}>
                    <div className={styles.mediaTitle}>FEATURED PARTNERS</div>
                    <div className={styles.linkContainer}>
                        <a
                        href={NEXT_PUBLIC_WHATSAPP_LINK ? NEXT_PUBLIC_WHATSAPP_LINK : ''}
                        target='_blank'
                        className={styles.mediaLink}>
                            Want to partner with us?
                        </a>
                    </div>

                    <div className={styles.mediaCenter}>
                        <div className={styles.mediaRow}>
                            <a className={styles.mediaPic} href='https://www.stackos.io/' target='_blank'>
                                <Image
                                    src={StackOS}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </a>
                            <a className={styles.mediaPic} href='https://twitter.com/DeployOnStackOS' target='_blank'>
                                <Image
                                    src={decodeWeb3}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </a>
                            <a className={styles.mediaPic} href='https://twitter.com/pune_dao' target='_blank'>
                                <Image
                                    src={PuneDAO}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </a>
                            <a className={styles.mediaPic} >
                                    <Image
                                        src={OGClub}
                                        width={225}
                                        height={150}
                                        alt="Picture of landscape"
                                        />       
                            </a>
                            <a className={styles.mediaPic} href='https://twitter.com/TheProductfolks' target='_blank'>
                                <Image
                                    src={ProductHouse}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </a>
                           <a className={styles.mediaPic} href='https://twitter.com/BuidlersTribe' target='_blank'>
                                <Image
                                    src={BuildersTribe}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </a>
                            <a className={styles.mediaPic} href='https://twitter.com/hyderabaddao' target='_blank'>
                                <Image
                                    src={HydDAO}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </a>
                            <a className={styles.mediaPic} href='https://twitter.com/Web3Panjab' target='_blank'>
                                <Image
                                    src={Web3Punjab}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </a>
                            <a className={styles.mediaPic} href='https://twitter.com/DoodhwalaDaily' target='_blank'>
                                <Image
                                    src={Doodhwala}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </a>
                            <a className={styles.mediaPic} href='https://twitter.com/QuillAudits' target='_blank'>
                                <Image
                                    src={QuilAudits}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </a>
                            <a className={styles.mediaPic} href='https://twitter.com/CredShields' target='_blank'>
                                <Image
                                    src={CredSheilds}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </a>
                            <a className={styles.mediaPic} href='https://twitter.com/web3_events' target='_blank'>
                                <Image
                                    src={Web3Events}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </a>
                            <a className={styles.mediaPic} href='https://twitter.com/coin_gabbar' target='_blank'>
                                <Image
                                    src={CoinGabbar}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </a>
                            <a className={styles.mediaPic} href='https://twitter.com/Web3Chennai' target='_blank'>
                                <Image
                                    src={Web3Chennai}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </a>
                            <a className={styles.mediaPic} href='https://twitter.com/DaoLens' target='_blank'>
                                <Image
                                    src={DaolensLogo}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </a>
                            <a className={styles.mediaPic}>
                                <Image
                                    src={ArmurLogo}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </a>
                            <a className={styles.mediaPic}>
                                <Image
                                    src={UPDaoLogo}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </a>
                            <a className={styles.mediaPic} >
                                <Image
                                    src={G3CLogo}
                                    width={225}
                                    height={150}
                                    alt="Picture of landscape"
                                    />       
                            </a>
 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}