import styles from './banner.module.css';
import Image from 'next/image';
import tokenPic from '../public/images/token.webp';

export default function Banner() {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.titleCard}>
                    <div className={styles.titleDate}>
                        <div>26 Sep - 2 Oct 2022</div>
                    </div>
                    <div className={styles.title}>
                        <div className={styles.titleWord}>INDIA</div>
                        <div className={styles.titleWord}>CRYPTO</div>
                        <div className={styles.titleWord}>WEEK</div>
                    </div>
                    <div className={styles.ownerLineContainer}>
                        <div className={styles.ownerLine}>&nbsp;</div>
                    </div>
                    
                    <div className={styles.owner}>
                        <div className={styles.ownerText}>Powered by:</div>
                        <Image
                            src={tokenPic}
                            width={192}
                            height={48}
                            alt="Picture of landscape"
                        /> 
                    </div>
                </div>
            </div>
        </div>
    );
}