import styles from './signupbar.module.css';
import classNames from 'classnames';

export default function SignupBar () {

    return (
        <div className={styles.signupBar}>
            <div className={styles.signupMiddle}>
                <div className={styles.titleContainer}>
                    LETS CONNECT
                </div>
                <div className={styles.navBar}>
                    <div className={styles.navCell}>
                        <a href='https://t.me/IndiaCryptoWeek' rel="noopener noreferrer">
                            <button className={classNames('globalButton')} >JOIN TELEGRAM</button>
                        </a> 
                    </div>
                    <div classname={styles.navCell}>
                        <button className={classNames('globalButton', styles.buttonPadding)}>JOIN WHATSAPP</button>
                    </div>
                </div>

            </div>
        </div>
    );
}