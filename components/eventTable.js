import styles from './eventTable.module.css';
import classNames from 'classnames';
import axios from 'axios';
import {useState, useEffect} from 'react';

export default function EventTable () {

    const [eventList, setEventList] = useState();
    const [filteredEventList, setFilteredEventList] = useState();

    useEffect(() => {
        console.log("calling axios");
        axios.get(`${process.env.NEXT_PUBLIC_BE_URL}/users`).then((res) => {
            console.log("events: ",JSON.stringify(res.data));
            setEventList(res.data);
            setFilteredEventList(res.data);
        })
        .catch((err)=> {
            console.error("error occurred during get: ",err);
        });
    }, []);

    const getHours = (dateStr) => {
        const hours = new Date(dateStr).getHours();
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
        console.log("days: ", days, dateStr, new Date(dateStr), (new Date(dateStr)).getDate());
        return days + '';
    }

    const getMonth = (dateStr) => {
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return month[new Date(dateStr).getMonth()];
    }

    const getLink = (event) => {
        if(!event.link)
            return '';
        const match = event.link.match('https');
        if(!match) {
            return 'https://'+event.link;
        }
        return event.link;
    }

    const compareField = (filt, val) => {
        const matches = val.toLowerCase().match(filt.toLowerCase());
        console.log("compareField: ", val.toLowerCase(), filt.toLowerCase(), JSON.stringify(matches), matches && matches.length > 0);
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

    const displayEvents = () => (
        <div className={styles.tableContainer}>
        <div className={styles.tableSize}>
            <div className={styles.table}>
                <div>
                    {
                        filteredEventList && filteredEventList.map((eventData, index) => (
                            <a className={styles.tableRow} key={index} target="_blank" href={getLink(eventData)} rel="noopener noreferrer" title={getLink(eventData)}>
                                <div className={styles.dateCell}>{`${getDays(eventData.from)} ${getMonth(eventData.from)}`}</div>
                                <div className={styles.nameCell}>{eventData.name}</div>
                                <div className={styles.venueCell}>{
                                `${getHours(eventData.from)}:${getMinutes(eventData.from)} - ${getHours(eventData.to)}:${getMinutes(eventData.to)}`}</div>
                            </a>
                        ))
                    }
                </div>
            </div>
        </div>

    </div>
    )

    const displayEvents1 = () => (
        <div className={styles.eventContainer}>
            {
                filteredEventList && filteredEventList.map((eventData, index) => (
                    <a className={styles.eventCard} key={index} target="_blank" href={getLink(eventData)} rel="noopener noreferrer">
                        
                        <div className={styles.eventDateContainer}>
                            <div className={styles.eventName}>{eventData.name}</div>
                        </div>
                        <div className={styles.eventDateContainer}>
                                <div className={styles.eventDate}>{`${getDays(eventData.from)} ${getMonth(eventData.from)}`}</div>
                            </div>
                            
                            
                            <div className={styles.eventDateContainer}>
                                <div>{`${getHours(eventData.from)}:${getMinutes(eventData.from)} - ${getHours(eventData.to)}:${getMinutes(eventData.to)}`}</div>
                            </div>

                            <div className={styles.eventDateContainer}>
                                <div className={styles.eventName}>{eventData.venue}</div>
                            </div>
                        
                    </a>
                ))
            }
    </div>
    )


    return (
        <div className={styles.tableSection} id='event-table'>
                <div className={styles.tableTitleContainer}>
                    <div className={styles.tableTitle}>SCHEDULE</div>
                </div>
                {/* <div className={styles.addEventContainer}>
                    <button className={classNames('globalButton')} onClick={moveToRegister}>ADD YOUR EVENT</button>
                </div> */}
                <div className={styles.searchContainer}>
                    <input type='text'
                        className={classNames('globalInput', styles.searchBar)}
                        placeholder='Search'
                        onChange={(e) => filterEvents(e.target.value)}
                    />
                </div>
                
                {
                    displayEvents()
                }
        </div>
    );
}