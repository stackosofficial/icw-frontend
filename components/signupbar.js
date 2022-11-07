import styles from './signupbar.module.css';
import classNames from 'classnames';

export default function SignupBar ({
    NEXT_PUBLIC_TELEGRAM_LINK,
    NEXT_PUBLIC_WHATSAPP_LINK
}) {

    return (
        <div className={styles.signupBar}>
            <div className={styles.signupMiddle}>
                <div className={styles.titleContainer}>
                    LETS CONNECT
                </div>
                <div className={styles.navBar}>
                    <div className={styles.navCell}>
                        <a href={NEXT_PUBLIC_TELEGRAM_LINK ? NEXT_PUBLIC_TELEGRAM_LINK : ''} rel="noopener noreferrer" target="_blank">
                            <button className={classNames('globalButton')} >JOIN TELEGRAM</button>
                        </a> 
                    </div>
                    <div className={styles.navCell}>
                        <a href= {NEXT_PUBLIC_WHATSAPP_LINK ? NEXT_PUBLIC_WHATSAPP_LINK : ''} rel="noopener noreferrer" target="_blank">
                            <button className={classNames('globalButton', styles.buttonPadding)}>JOIN WHATSAPP</button>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}