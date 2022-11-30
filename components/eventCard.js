import classNames from 'classnames';
import { getDays, getMonth } from './common';
import styles from './eventCard.module.css';
import {useState} from 'react';
import {IoMdArrowDropdown} from 'react-icons/io';

export default function EventCard({eventData, index, disableGlow, onClickMore}) {

    const getLink = (link) => {
        if(!link)
            return 'javascript:void(0)';
        return link;
    }
    
    const getName = (event) => {
        const name = eventData.name.toUpperCase();
        if(name.length > 32) {
            return `${name.substr(0, 32)}...`
        }
        return name;
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

    const getVenue = (event) => {
        if(!event.venue) {
            return `TBA`;
        }
        if(event.venue.length > 64) {
            return `${event.venue.substr( 0, 64)}...`;
        }
        return event.venue;
    }

    return (
        <div className={classNames(styles.eventCard, 
            {[styles.eventCardFade]: !eventData.link},
            {[styles.eventCardAnim]: !disableGlow}
            // styles.eventCardAnim
            )}
        >
            <a
                className={classNames(styles.dateCell, {[styles.dateFade]: !eventData.link})}
                // className={styles.nameCellLink}
                key={index} target={eventData.link ? "_blank" : ''}
                href={getLink(eventData.link)}
                // href={'https://www.test.com'}
                rel="noopener noreferrer"
                title={getLink(eventData.link)}
                >
                {getDateTitle(eventData)}
            </a>

            <div className={styles.cardContent}>
                <h1 className={classNames(styles.nameCell, {[styles.nameFade]: !eventData.link})} title={eventData.name}>
                    <a
                        className={classNames(styles.nameCellLink)}
                        key={index} target={eventData.link ? "_blank" : ''}
                        href={getLink(eventData.link)}
                        rel="noopener noreferrer"
                        title={eventData.name}
                    >
                        {getName(eventData)}
                    </a>

                </h1>
                <div className={classNames(styles.dateCell)}></div>
                <div>
                    <div className={classNames(styles.venueCell, {[styles.venueFade]: !eventData.link})} title={eventData.venue}>{getVenue(eventData)}</div>
                </div>
            </div>
        
            <div className={styles.moreBottom}>
                <div className={styles.more}>
                    <div className={styles.moreLeft}>
                        <button className={styles.moreText} onClick={(e) => onClickMore(e, eventData)}>
                            <IoMdArrowDropdown className={styles.dropIcon}/>
                            </button>
                    </div>
                    {
                        eventData.price?
                            <div className={styles.moreRight}>
                                <div className={classNames(styles.priceSection, {[styles.priceFade]: !eventData.link})}>
                                    <div className={styles.priceText}>
                                        {!isNaN(eventData.price)?<span>&#8377;</span>:''}
                                        {eventData.price}</div>
                                </div>
                            </div>
                        : ''
                    }
                </div>
                <div className={classNames(styles.categoryCell, {[styles.categoryFade]: !eventData.link})} title={eventData.category}>{eventData.category}</div>
            </div>

    </div>
    );
}