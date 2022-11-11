
export const categoriesList = [
    "Meetup",
    "Workshop",
    "Conference",
    "Talks & Networking",
    "Networking & After-party",
    "Hackathon"
];

export const categoriesColor = {
    "Meetup": '#FF0097',
    "Workshop": '#FCFF00',
    "Conference": '#80E961',
    "Talks & Networking": '#FDA600',
    "Networking & After-party": '#009665',
    "Hackathon": '#5603BD'
}


export const sortEvents = (oldEventsList) => {
    return oldEventsList.sort((event1, event2) => {
        if(!event1.from && !event2.from)
            return 1;
        if(!event1.from)
            return 1;
        if(!event2.from)
            return -1;

        return event1.from <= event2.from ? -1: 1;
    })
}

export const getDays = (dateStr) => {
    const days = (new Date(dateStr)).getDate();
    return days + '';
}

export const getMonth = (dateStr) => {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return month[new Date(dateStr).getMonth()];
}

export const getDayName = (date) =>  {
    const dayList = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'];
    return dayList[date.getDay()];
}