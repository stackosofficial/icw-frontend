import styles from './eventTable.module.css';
import classNames from 'classnames';
import axios from 'axios';
import {useState, useEffect, useRef} from 'react';
import EventCard from './eventCard';
import EventTimeline from './eventTimeline'
import {getDays, getMonth} from './common';

export default function EventTable ({NEXT_PUBLIC_BE_URL, propEventList}) {

    var [filteredEventList, setFilteredEventList] = useState();
    const [currentTab, setTab] = useState(0);
    const [infoEvent, setInfoEvent] = useState(null);
    const [infoPos, setInfoPos] = useState({});
    const myRef = useRef();

    const filterEvents = (filterString) => {
        filterString = filterString.toLowerCase();
        if(!filterString) {
            setFilteredEventList(propEventList);
        }
        const filterList = propEventList.filter((event) => {
            if(event.name.toLowerCase().match(filterString)) {
                return true;
            }
            if(event.venue && event.venue.toLowerCase().match(filterString)) {
                return true;
            }
            if(event.category && event.category.toLowerCase().match(filterString)) {
                return true;
            }
            
            if(event.price && event.price.toLowerCase().match(filterString)) {
                return true;
            }

            return false;
        })
        setFilteredEventList(filterList);
    }

    const displayEvents = () => (
        <div>
            <div  className={styles.tabContainer}>
                <input type="text" placeholder='Search' className={classNames('globalInput', styles.inputWidth)} onChange={(e) => filterEvents(e.target.value)} />
            </div>
            <div className={styles.tableContainer}>
                <div className={styles.table}>
                {
                        filteredEventList && filteredEventList.map((eventData, index) => (
                            <EventCard key={index} eventData={eventData} index={index} disableGlow={!eventData.link} onClickMore={onClickMore}/>
                    ))
                }
                </div>
            </div>
        </div>

    )

    const onClickMore = (e, eventData) => {
        if(infoEvent && infoEvent.name === eventData.name) {
            setInfoEvent(null);
            return;
        }

        var px = e.pageX;
        var py = e.pageY;

        setInfoPos({x:px,y:py});
        setInfoEvent({...eventData});
    }

    useEffect(() => {
        setFilteredEventList(propEventList);
    }, [propEventList]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (myRef.current && !myRef.current.contains(event.target)) {
              setInfoEvent(null);
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          document.addEventListener("touchmove", handleClickOutside);
    }, [])

    return (
        <div className={styles.tableSection} id='event-table'>
            <div className={styles.tableTitleContainer}>
                <div className={styles.tableTitle}>SCHEDULE</div>
            </div>
            <div className={styles.tabContainer}>
                <div className={styles.tabList}>
                    <div className={classNames(styles.tab, 
                        {[styles.clickableTab]: currentTab != 0})
                        } onClick={() =>setTab(0)}>EVENT</div>
                    <div className={classNames(styles.tab,
                        styles.timelineTab,
                        {[styles.clickableTab]: currentTab != 1})
                        } onClick={() =>setTab(1)}>TIMELINE</div>
                </div>
            </div>
            {
                !currentTab?
                    displayEvents()
                :
                (
                    <div className={styles.timelineContainer}>
                        <div className={styles.timeline}>
                            <EventTimeline eventList={propEventList} onClickMore={onClickMore}/>
                        </div>
                    </div>
                )
            }

            {
                    infoEvent ?
                    <span className={styles.contactCard}
                    style={{
                        left: infoPos.x,
                        top: infoPos.y
                    }}
                    ref={myRef}
                    >
                        <span>
                            <span>Name: {infoEvent.name}</span>
                            <br/>
                            <br/>
                            <span>From Date: {infoEvent.from || '-'}</span>
                            <br/>
                            <br/>
                            <span>To Date: {infoEvent.to || '-'}</span>
                            <br/>
                            <br/>
                            <span>Venue: {infoEvent.venue || '-'}</span>
                            <br/>
                            <br/>
                            <span>Category: {infoEvent.category || '-'}</span>
                            <br/>
                            <br/>
                            <span>Price: {infoEvent.price || '-'}</span>
                            <br/>
                            <br/>
                            <span>Link: {infoEvent.link || '-'}</span>
                        </span>
                        
                        </span>
                    : ''
                }
        </div>
    );
}