import styles from './banner.module.css';
import Image from 'next/image';
import tokenPic from '../public/images/token.webp';
import stackosPic from '../public/images/stackos.png';

export default function Banner() {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.titleCard}>
                    {/* <div className={styles.ownerHeader}>
                            <div className={styles.ownerImage}>
                                <Image
                                    src={tokenPic}
                                    width={192}
                                    height={48}
                                    alt="Picture of landscape"
                                /> 
                            </div>
                    </div> */}

                    <div className={styles.titleDate}>
                        <div>25th Nov - 6th Dec 2022</div>
                    </div>
                    <div className={styles.titleDate}>
                        <div>Bangalore</div>
                    </div>
                    <div className={styles.title}>
                        <div className={styles.titleWord}>INDIA</div>
                        <div className={styles.titleWord}>BLOCKCHAIN</div>
                        <div className={styles.titleWord}>WEEK</div>
                    </div>
                    <div className={styles.ownerLineContainer}>
                        <div className={styles.ownerLine}>&nbsp;</div>
                    </div>

                    <div className={styles.sponserRow}>

                        <div className={styles.owner}>
                        <div className={styles.ownerText}>Sponsored by:</div>
                            <div className={styles.ownerImage}>
                                <Image
                                    src={tokenPic}
                                    width={192}
                                    height={48}
                                    alt="Picture of landscape"
                                /> 
                            </div>
                        </div>
                        <div className={styles.owner}>
                            <div className={styles.ownerText}>Running on:</div>
                            <div className={styles.ownerImage}>
                                <Image
                                    src={stackosPic}
                                    width={170}
                                    height={36}
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