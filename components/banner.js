import styles from './banner.module.css';
import Image from 'next/image';
import tokenPic from '../public/images/token.webp';
import stackosPic from '../public/images/stackos.png';
import classNames from 'classnames';

export default function Banner() {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.titleCard}>

                    <div className={styles.titleDate}>
                        <div>25th Nov - 6th Dec 2022</div>
                    </div>
                    <div className={styles.titleDate}>
                        <div>Bangalore</div>
                    </div>
                    <div className={styles.title}>
                        <h1 className={styles.titleWord}>INDIA</h1>
                        <h1 className={styles.titleWord}>BLOCKCHAIN</h1>
                        <h1 className={styles.titleWord}>WEEK</h1>
                    </div>
                    <div className={styles.ownerLineContainer}>
                        <div className={styles.ownerLine}>&nbsp;</div>
                    </div>

                    <div className={styles.sponserCenter}>
                        <div className={styles.sponserRow}>
                            <div className={styles.owner}>
                            <div className={styles.ownerText}>Sponsored by:</div>
                                <div className={styles.ownerImage}>
                                    <a href='http://decloud.org/' target='_blank'>
                                    <Image
                                        src={tokenPic}
                                        // width={160}
                                        // height={40}
                                        width={140}
                                        height={34}
                                        alt="Picture of landscape"
                                    />
                                    {/* <img
                                        src='images/token.webp'
                                        className={styles.tokenPic}
                                        /> */}
                                    </a>
                                </div>
                            </div>
                            <div className={classNames(styles.owner, styles.stackosContainer)}>
                                <div className={classNames(styles.ownerText, styles.stackosText)}>Running on:</div>
                                <div className={styles.ownerImage}>
                                    <a href='https://www.stackos.io/' target='_blank'>
                                    <Image
                                        src={stackosPic}
                                        // width={140}
                                        // height={30}
                                        width={110}
                                        height={22}
                                        alt="Picture of landscape"
                                    /> 
                                    {/* <img
                                        src='images/stackos.png'
                                        className={styles.stackosPic}
                                        /> */}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
   

                </div>
            </div>
        </div>
    );
}