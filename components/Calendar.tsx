"use client";

import FullCalendar from "@fullcalendar/react";
import deLocal from "@fullcalendar/core/locales/de";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { EventSourceInput } from "@fullcalendar/core/index.js";

// end date is exclusive
const events: EventSourceInput[] = [
    {
        events: [
            {
                title: "Christbaumsammelaktion",
                start: "2024-01-05",
            },
            {
                title: "Palmsonntag",
                start: "2024-03-24",
            },
            {
                title: "Hütteneinsatz",
                start: "2024-04-13",
            },
            {
                title: "Kornettausbildung",
                start: "2024-05-03",
                end: "2024-05-06",
            },
            {
                title: "Pfingstlager",
                start: "2024-05-18",
                end: "2024-05-26",
            },
            {
                title: "Stafette Extrem",
                start: "2024-07-06",
                end: "2024-07-08",
            },
            {
                title: "Pfadihoffest",
                start: "2024-06-30",
            },
            {
                title: "Jubiläumswochenende",
                start: "2024-09-06",
                end: "2024-09-09",
            },
            {
                title: "Hütteneinsatz",
                start: "2024-10-19",
            },
            {
                title: "Übergabe",
                start: "2024-10-23",
            },
            {
                title: "Adventsnachmittag",
                start: "2024-12-01",
            }
        ],
    }
]

export default function Calendar() {
    return (
        <div className="not-prose text-sm break-all m-6">
        <FullCalendar
            height={670}
            aspectRatio={1}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView="dayGridMonth"
            locales={[deLocal]}
            weekNumbers={true}
            headerToolbar={{
                left: "",
                center: "title",
                right: "",
            }}
            footerToolbar={{
                left: "prev,next",
                center: "",
                right: "dayGridMonth,timeGridWeek,listYear",
            }}
            buttonText={{
                today: "Heute",
                month: "Monat",
                week: "Woche",
                day: "Tag",
                list: "Liste",
            }}
            eventSources={events}
            eventContent={(event) => (
                <div className="event-title">{event.event.title}</div>
            )}
        />
        </div>
    )
}
