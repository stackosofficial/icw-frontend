import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './control.module.css'
import { useRouter } from 'next/router';

const URL = 'http://localhost:3000/admin';
export default function Control()
{
    const [events, setEvents] = useState([]);
    const [isSuccess, setSuccess] = useState(false);
    const [isError, setError] = useState('');
    const [changeID, setChangeID] = useState(0);
    const [filterOptions, setFilterOptions] = useState({});
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [isSaveDisabled, setSaveDisabled] = useState(false);

    const router = useRouter();
    const [eventChanges, setEventChanges] = useState({
        updatedEvents: {},
        addedEvents: {},
        deletedEvents:[],
    });

    const getID = (index) => {
        return `newID_${index}`;
    }

    const compareField = (filt, val) => {
        const matches = val.toLowerCase().match(filt.toLowerCase());
        console.log("compareField: ", val.toLowerCase(), filt.toLowerCase(), JSON.stringify(matches), matches && matches.length > 0);
       return  matches && matches.length > 0;
    }

    const filterEvents = (filter) => {
        filterOptions = {...filterOptions, ...filter};
        setFilterOptions(filterOptions);

        filteredEvents = events.filter((event) => {
            if(filterOptions.name && (!event.name || !compareField(filterOptions.name, event.name))) {
                return false;
            }
            if(filterOptions.link && (!event.link || !compareField(filterOptions.link, event.link))) {
                return false;
            }
            if(filterOptions.from && (!event.from || !compareField(filterOptions.from, event.from))) {
                return false;
            }
            if(filterOptions.to && (!event.to || !compareField(filterOptions.to, event.to))) {
                return false;
            }
            if(filterOptions.venue && (!event.venue || !compareField(filterOptions.venue, event.venue))) {
                return false;
            }
            if(filterOptions.senderIP && (!event.senderIP || !compareField(filterOptions.senderIP, event.senderIP))) {
                return false;
            }
            if(filterOptions.status && (!event.status || !compareField(filterOptions.status, event.status))) {
                return false;
            }
            return true;
        });

        console.log("filteredEvents: ", JSON.stringify(filteredEvents));
        setFilteredEvents(filteredEvents);
    }
    
    const setEventsFunc = (newEventList) => {
        events = newEventList;
        setEvents(events);
        filterEvents();
    }

    const getAllEvents = () => {
        setSaveDisabled(true);
        axios.get(URL).then((res) => {
            console.log("events: ",JSON.stringify(res.data));
            setEventsFunc(res.data);
            setSaveDisabled(false);
        })
        .catch((err)=> {
            setSaveDisabled(false);
            setSuccess(false);
            setError('Error duing fetching event data');
        });
    }

    const callModifyAPI = () => {
        console.log("eventChanges: ", eventChanges);
        if(!Object.keys(eventChanges.updatedEvents).length
          &&  !Object.keys(eventChanges.addedEvents).length
          && !eventChanges.deletedEvents.length
        ) {
            setSuccess(false);
            setError('Nothing to save');
            return;
        }
        setSuccess(false);
        setError('');
        setSaveDisabled(true);

        axios.post(URL, eventChanges)
        .then((res) => {
            setSaveDisabled(false);
            if(res && res.data && res.data.success) {
                setEventChanges(
                    {
                        updatedEvents: {},
                        addedEvents: {},
                        deletedEvents:[],
                    }
                );

                if(res.data.events) {
                    console.log("recieved events: ", JSON.stringify(res.data.events));
                    setEventsFunc(res.data.events);
                    setSuccess(true);
                }
                else {
                    router.reload(window.location.pathname)
                }
                console.log("success");
            } else {
                setSuccess(false);
                if(res && res.data && !res.data.success && res.data.reason) {
                    setError('ERROR: ' + res.data.reason);
                }
                else {
                    setError('ERROR');
                }
            }
        })
        .catch((err) => {
            console.error("error occured during modify event", err);
            setSuccess(false);
            setSaveDisabled(false);
            setError('ERROR: '+err);
        });
    }

    const addEvent = () => {
        const newID = getID(changeID);
        setChangeID(changeID + 1);

        const event = {"_id" : newID};

        events.push(event)
        setEventsFunc([...events]);

        eventChanges.addedEvents[newID] = event;
        setEventChanges({...eventChanges});
    }

    const deleteEvent = (eventIndex, event) => {
        const eID = event._id;

        if(eventChanges.addedEvents[eID]) {
            delete eventChanges.addedEvents[eID];
        }
        else {
            eventChanges.deletedEvents.push(eID);
        }

        if(eventChanges.updatedEvents[eID]) {
            delete eventChanges.updatedEvents[eID];
        }

        setEventChanges({...eventChanges});

        events = events.filter((val, index) => index != eventIndex);
        setEventsFunc([...events]);
    }

    const compareEvent = (eventID, eventChange) => {
        const event = events[eventID];
        if(eventChange.name && eventChange.name != event.name) {
            return true;
        }
        if(eventChange.link && eventChange.link != event.link) {
            return true;
        }
        if(eventChange.from && eventChange.from != event.from) {
            return true;
        }
        if(eventChange.to && eventChange.to != event.to) {
            return true;
        }
        if(eventChange.venue && eventChange.venue != event.venue) {
            return true;
        }
        if(eventChange.day && eventChange.day != event.day) {
            return true;
        }
        if(eventChange.status && eventChange.status != event.status) {
            return true;
        }

        return false;
    }

    const saveModifiedEvent = (index, event, eventChange) => {
        const newID = event._id;
        console.log("event: ", JSON.stringify(event));
        if(eventChanges.addedEvents[newID]) {
            eventChanges.addedEvents[newID] = { ...eventChanges.addedEvents[newID], ...eventChange};
        }
        else {
            eventChanges.updatedEvents[newID] = {...eventChanges.updatedEvents[newID], ...eventChange};
        }

        setEventChanges({...eventChanges});
        events[index] = {...events[index], ...eventChange};
        setEventsFunc([...events]);
    }

    useEffect(() => {
        getAllEvents()
    }, []);

    const renderEvents = ()=> {
        return filteredEvents.map((event, index) => {
            return (
                <tr className={styles.tableRow} key={index}>
                    <td className={styles.tableCell}>
                        <button onClick={() =>deleteEvent(index, event)}>DEL</button>
                    </td>
                    <td className={styles.tableCell}>
                        {index + 1}
                    </td>
                    <td className={styles.tableCell}>
                        <input type='text'
                            value={event.name ? event.name : ''}
                            onChange={(e) => saveModifiedEvent(index, event, {name: e.target.value})}
                        />
                    </td>
                    <td className={styles.tableCell}>
                        <input type='text'
                            value={event.link ? event.link : ''}
                            onChange={(e) => saveModifiedEvent(index, event, {link: e.target.value})}
                        />
                    </td>
                    <td className={styles.tableCell}>
                        <input type='datetime-local'
                            value={event.from ? event.from : ''}
                            onChange={(e) => saveModifiedEvent(index, event, {from: e.target.value})}
                        />
                    </td>
                    <td className={styles.tableCell}>
                        <input type='datetime-local'
                        value={event.to ? event.to : ''}
                        onChange={(e) => saveModifiedEvent(index, event, {to: e.target.value})}
                        />
                    </td>
                    <td className={styles.tableCell}>
                        <input type='text'
                        value={event.venue ? event.venue : ''}
                        onChange={(e) => saveModifiedEvent(index, event, {venue: e.target.value})}
                        />
                    </td>
                    <td className={styles.tableCell}>
                        <input type='text'
                            value={event.senderIP ? event.senderIP : ''}
                            onChange={(e) => saveModifiedEvent(index, event, {senderIP: e.target.value})}
                            />
                    </td>
                    <td className={styles.tableCell}>
                        {/* <input type='text'
                            value={event.status}
                            onChange={(e) => saveModifiedEvent(index, event, {status: e.target.value})}
                            /> */}
                        <select name="status"
                            value={event.status ? event.status : ''}
                            onChange={(e) => saveModifiedEvent(index, event, {status: e.target.value})}
                            >
                            <option value="W">Waiting</option>
                            <option value="A">Approved</option>
                        </select>
                    </td>
                </tr>
            );
            index+=1;
        });
    }

    console.log('restart');
    return (
        <div className={styles.section}>
            <div>
                <button onClick={callModifyAPI} disabled={isSaveDisabled}>SAVE</button>
                {
                    isError ?
                        <span className={styles.failed}>{isError}</span>
                    : !isError && isSuccess? 
                    <span className={styles.saved}> Saved</span>
                    : ''
                }
            </div>
            <div>
                <table className={styles.table}>
                    <tr className={styles.tableRow}>
                        <th className={styles.tableCell}>DEL</th>
                        <th className={styles.tableCell}>ID</th>
                        <th className={styles.tableCell}>
                            Name
                            <input type='text'
                                onChange={(e) => filterEvents({name: e.target.value})}
                                />
                            </th>
                        <th className={styles.tableCell}>
                            Link
                            <input type='text'
                                onChange={(e) => filterEvents({link: e.target.value})}
                                />
                        </th>
                        <th className={styles.tableCell}>
                            From(YYYY-MM-DDtHH-MM)
                            <input type='text'
                                onChange={(e) => filterEvents({from: e.target.value})}
                                />
                        </th>
                        <th className={styles.tableCell}>
                            To(YYYY-MM-DDtHH-MM)
                            <input type='text'
                                onChange={(e) => filterEvents({to: e.target.value})}
                                />
                        </th>
                        <th className={styles.tableCell}>Venue
                            <input type='text'
                                onChange={(e) => filterEvents({venue: e.target.value})}
                                />
                        </th>
                        <th className={styles.tableCell}>
                            senderIP
                            <input type='text'
                                onChange={(e) => filterEvents({senderIP: e.target.value})}
                            />
                        </th>
                        <th className={styles.tableCell}>
                            Status
                            <input type='text'
                                onChange={(e) => filterEvents({status: e.target.value})}
                                />
                        </th>
                    </tr>
                    <tbody>
                        {
                            renderEvents().map((event)=>
                            event)
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={addEvent}>ADD EVENT</button>
            </div>
        </div>
    );
}