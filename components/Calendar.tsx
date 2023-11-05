"use client";

import FullCalendar from "@fullcalendar/react";
import deLocal from "@fullcalendar/core/locales/de";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { EventSourceInput } from "@fullcalendar/core/index.js";

const events: EventSourceInput[] = [
    {
        events: [
            {
                title: "Kornettausbildung",
                start: "2023-03-24",
                end: "2023-03-26",
            },
            {
                title: "Palmen bauen",
                start: "2023-04-01",
            },
            {
                title: "Palmsonntag",
                start: "2023-04-02",
            },
            {
                title: "Hütteneinsatz",
                start: "2023-04-29",
            },
            {
                title: "Stafette X-trem",
                start: "2023-06-17",
                end: "2023-06-18",
            },
            {
                title: "Sommerlager",
                start: "2023-08-05",
                end: "2023-08-19",
            },
            {
                title: "Übergabe",
                start: "2023-10-18",
            },
            {
                title: "Hütteneinsatz",
                start: "2023-10-21",
            },
            {
                title: "Schlössle in Flammen",
                start: "2023-11-18",
            },
            {
                title: "Adventsnachmittag",
                start: "2023-12-03",
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