import styles from './eventTimeline.module.css';
import {getDays, getMonth, categoriesColor, getDayName} from './common';
import classNames from 'classnames';
import EventCard from './eventCard';
import { useState, useEffect, useRef } from 'react';

export default function Timeline ({eventList, onClickMore}) {


    const [clickPos, setClickPos] = useState({})
    const [eventIndex, setEventIndex] = useState(-1);
    const [cardEvent, setCardEvent] = useState(null);
    const [mousePos, setMousePos] = useState({});
    const [totalDays, setTotalDays] = useState(0);
    const [eventStartDate, setEventStartDate] = useState(new Date());

    const myRef = useRef();

    // const totalDays = 40;
    // const eventStartDate = new Date('2022-11-01');
    const fixedMargin = 150;

    const renderHeaderCell = (day) => {
        const width = (1) * fixedMargin;
        return (
            <div style={{
                minWidth: `${width}px`,
                width: `${width}px`
                // minWidth: `${fixedMargin}px`
            }}
            className={styles.headerCellContainer}
            >
                <div className={styles.headerCell}>
                    <div>{`${getDays(day)} ${getMonth(day)}`}</div>
                    <div className={styles.headerDay}>{getDayName(new Date(day))}</div>
                    {/* <div>&nbsp;</div> */}
                </div>
            </div>
        )
    }

    const renderHeader = () => {
        const cells = [];
        for(var i = 0; i < totalDays; i++) {
            const cellDay = new Date(eventStartDate);
            cellDay.setUTCDate(cellDay.getUTCDate() + i);
            cells.push(renderHeaderCell(cellDay));
        }
        return cells;
    }

    const createEventBins = () => {
        let rowBin = [[]];
        for(var ev = 0; ev < eventList.length; ev++) {
            const event = eventList[ev];

            if(!event.from)
                continue;

            var curRowID = 0;
            var binFound = false;
            while(curRowID < rowBin.length)
            {
                var curBinValid = true;
                for(var i = 0; i < rowBin[curRowID].length; i++)
                {
                    const compEvent = eventList[rowBin[curRowID][i]];
                    if(!compEvent.from) {
                        continue;
                    }

                    let toDate = compEvent.to;
                    if(!toDate) {
                        toDate = compEvent.from;
                    }

                    if(event.from >= compEvent.from && event.from <= compEvent.to) {
                        curBinValid = false;
                        break;
                    }

                    if(!event.to) {
                        continue;
                    }

                    if(event.to >= compEvent.from && event.to <= compEvent.to) {
                        curBinValid = false;
                        break;
                    }   

                }

                if(curBinValid) {
                    binFound = true;
                    rowBin[curRowID].push(ev);
                    break;
                }
                curRowID++;
            }

            if(!binFound) {
                rowBin.push([ev]);
            }

        }
        return rowBin;
    }

    const remTime = (date) => {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          );
    }

    const getNumDays = (date1, date2) => {
        date1 = remTime(date1);
        date2 = remTime(date2);
        var Difference_In_Time = date2.getTime() - date1.getTime();
        return Difference_In_Time / (1000 * 3600 * 24);
    }

    const compareDays = (day1, day2) => {
        if(getDays(day1) == getDays(day2) && (getMonth(day1) == getMonth(day2))) {
            return true;
        }
        return false;
    }

    const onClick = (event, index) => {
        setCardEvent(event);
        setEventIndex(index);
        setClickPos({x: mousePos.x, y: mousePos.y})
    }

    const createCells = () => 
    {
        const rowBins = createEventBins();

        const rowArray = [];
        let cellWidth = 0;
        let emptyWidth = fixedMargin;

        for(var r = 0; r < rowBins.length; r++)
        {
            const cellArray = [];
            for(var i = 0; i < totalDays; i++)
            {
                const cellDay = new Date(eventStartDate);
                cellDay.setUTCDate(cellDay.getUTCDate() + i);

                let cardFlag = false;
                for(var e = 0; e < rowBins[r].length; e++)
                {
                    const event = eventList[rowBins[r][e]];
                    
                    if(!event.from) {
                        continue;
                    }

                    if(compareDays(event.from, cellDay) )
                    {
                        let days = 1;
                        if(event.to) {
                            days = (getNumDays(new Date(event.from), new Date(event.to)) + 1);
                        }
                        
                        cellWidth = (days) * fixedMargin;

                        cellArray.push(
                            <div style={{
                                width: `${cellWidth}px`,
                                minWidth: `${cellWidth}px`,
                                }}
                                className={classNames(styles.cell)}
                                >
                                <div className={classNames(styles.eventCell)}
                                    style={{
                                            backgroundColor: categoriesColor[event.category]? categoriesColor[event.category]: 'grey'
                                    }}
                                    onClick={()=>onClick(event, 1)}
                                >
                                    <span>{event.name}</span>
                                </div>
                                
                            </div>
                        )

                        i += days - 1;
                        cardFlag = true;

                        break;
                    }
                }

                if(!cardFlag) {
                    cellArray.push(
                        <div style={{
                            width: `${emptyWidth}px`,
                            minWidth: `${emptyWidth}px`,
                            }}
                            className={styles.cell}
                            >
                                &nbsp;
                        </div>
                    )
                }
            }

            rowArray.push(<div className={styles.rowList}>
                {cellArray}
            </div>)
        }
        
        return rowArray;
    }

    useEffect(() => {
      const handleMouseMove = (event) => {
        setMousePos({ x: event.clientX, y: event.clientY });
      };
  
      window.addEventListener('mousemove', handleMouseMove);
  
      function handleClickOutside(event) {
        if (myRef.current && !myRef.current.contains(event.target)) {
          setCardEvent(null);
          setEventIndex(-1);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      let smallDate = new Date();
      let bigDate = new Date();
      for(var i = 0; i < eventList.length; i++)
      {
        const event = eventList[i];
        if(!event.from)
            continue;

            smallDate = new Date(Math.min(smallDate, new Date(event.from)));
            bigDate = new Date(Math.max(bigDate, new Date(event.from)));

        if(event.to) {
            bigDate = new Date(Math.max(bigDate, new Date(event.to)));
        }
      }

      console.log("values dates ", smallDate, bigDate);

      setEventStartDate(smallDate);
      setTotalDays(getNumDays(smallDate, bigDate) + 1);

    }, []);

    return (
        <div className={styles.timeline}>
            <div className={styles.headerRow}>
                {renderHeader()}
            </div>
            {createCells()}
            {
                cardEvent?
                    <div ref={myRef} style={{
                        position: 'fixed',
                        top: clickPos.y,
                        left: clickPos.x
                    }}
                    >
                        <EventCard eventData={cardEvent} index={eventIndex} onClickMore={onClickMore}/>
                    </div>
                : ''
            }
        </div>
    );
}