import styles from './eventTable.module.css';
import classNames from 'classnames';
import axios from 'axios';
import {useState, useEffect, useRef} from 'react';
import EventCard from './eventCard';
import EventTimeline from './eventTimeline'

export default function EventTable ({NEXT_PUBLIC_BE_URL, propEventList}) {

    const [eventList, setEventList] = useState();
    var [filteredEventList, setFilteredEventList] = useState();
    const [currentTab, setTab] = useState(0);
    const [mousePos, setMousePos] = useState({});
    const [clickPos, setClickPos] = useState({});
    const [showInfoCard, setInfoCard] = useState(-1);
    const myRef = useRef();

    const getHours = (dateStr) => {
        var hours = new Date(dateStr).getHours();
        if(hours > 12)
            hours -= 12;
        if(hours < 10) {
            return '0' + hours;
        }
        return hours + '';
    }

    const getMinutes = (dateStr) => {
        const minutes = new Date(dateStr).getMinutes();
        if(minutes < 10) {
            return '0' + minutes;
        }
        return minutes + '';
    }

    const getDays = (dateStr) => {
        const days = (new Date(dateStr)).getDate();
        return days + '';
    }

    const getMonth = (dateStr) => {
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return month[new Date(dateStr).getMonth()];
    }

    function getAMPM(date) {
        var hours = (new Date(date)).getHours();
        return hours >= 12 ? 'pm' : 'am';
      }
      

    const getLink = (event) => {
        if(!event.link)
            return 'javascript:void(0)';
        return event.link;
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

    const compareField = (filt, val) => {
        const matches = val.toLowerCase().match(filt.toLowerCase());
       return  matches && matches.length > 0;
    }

    const filterEvents = (filterText) => {
        if(!filterText) {
            setFilteredEventList(eventList);
        }
        
        filteredEventList = eventList.filter((event) => {
            
            if(event.name && compareField(filterText, event.name)) {
                return true;
            }
            if(event.venue && compareField(filterText, event.venue)) {
                return true;
            }
            return false;
        });

        setFilteredEventList(filteredEventList);
    }

    const moveToRegister = () => {
        const element = document.getElementById('event-register')
        if(element != null)
            element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }

    const onClickMore = (e, index) => {
        e.stopPropagation();
        e.preventDefault();
        setClickPos({...mousePos});
        setInfoCard(index);
    }

    const displayEvents = () => (
        <div className={styles.tableContainer}>
            <div className={styles.table}>
            {
                        filteredEventList && filteredEventList.map((eventData, index) => (
                            <EventCard eventData={eventData} index={index} onClickMore={onClickMore} disableGlow={!eventData.link}/>
                        ))
                    }
            </div>

    </div>
    )

    useEffect(() => {
        // const sortedEventList = sortEvents(propEventList);
        const sortedEventList = propEventList;
        setEventList(sortedEventList);
        setFilteredEventList(sortedEventList);
    }, [propEventList]);

    useEffect(() => {
        const handleMouseMove = (event) => {
          setMousePos({ x: event.clientX, y: event.clientY });
        };
    
        window.addEventListener('mousemove', handleMouseMove);
    
        function handleClickOutside(event) {
          if (myRef.current && !myRef.current.contains(event.target)) {
            setInfoCard(-1);
          }
        }
  
        document.addEventListener("mousedown", handleClickOutside);
  
      }, []);

    return (
        <div className={styles.tableSection} id='event-table'>
            <div className={styles.tableBorder}>
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
                    showInfoCard!=-1?
                    <div className={styles.contactCard}
                        ref={myRef}
                        style={{
                            left: `${clickPos.x-100}px`,
                            top: `${clickPos.y + 20}px`
                        }}
                    >
                        {propEventList[showInfoCard].contact}
                    </div>
                    : ''
                }
            </div>
        </div>
    );
}