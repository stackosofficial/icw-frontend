import classNames from 'classnames';
import { getDays, getMonth } from './common';
import styles from './eventCard.module.css';
import {useState} from 'react';

export default function EventCard({eventData, index, onClickMore, disableGlow}) {

    const getLink = (link) => {
        if(!link)
            return 'javascript:void(0)';
        return link;
    }
    
    const getDateTitle = (event) => {
        if(!event.from) {
            return 'TBD';
        }
        
        if(event.to && !((getDays(event.from)==getDays(event.to)) && (getMonth(event.from)==getMonth(event.to)))) {
            return `${getDays(event.from)} ${getMonth(event.from)} - ${getDays(event.to)} ${getMonth(event.to)}`;
        }
    
        return `${getDays(event.from)} ${getMonth(event.from)}`;
    }


    return (
        <div className={classNames(styles.eventCard, {[styles.eventCardFade]: !eventData.link}, {[styles.eventCardAnim]: !disableGlow})}
        >
        <a className={styles.eventCardLink}
            key={index} target={eventData.link ? "_blank" : ''}
            href={getLink(eventData.link)}
            rel="noopener noreferrer"
            title={getLink(eventData.link)}
        >
            <div className={styles.dateCell}>{getDateTitle(eventData)}</div>
            <div className={classNames(styles.dateCell)}></div>
            <h1 className={styles.nameCell} title={eventData.name}>{eventData.name}</h1>
            <div className={styles.venueCell} title={eventData.venue}>{eventData.venue}</div>
            <div className={styles.categoryCell} title={eventData.category}>{eventData.category}</div>
            <div className={styles.bottomSection}>
                <div className={styles.moreSection}>
                    {
                        eventData.price?
                        <div className={styles.priceSection}>
                            <div className={styles.priceText}>&#8377;10000</div>
                        </div>
                        : ''
                    }
                    {
                        eventData.contact?
                            <div className={styles.more}>
                                <button className={styles.moreText} onClick={(e)=>onClickMore(e, index)}>
                                    Info
                                </button>

                            </div>
                        : ''
                    }

                </div>
            </div>
        </a>

    </div>
    );
}