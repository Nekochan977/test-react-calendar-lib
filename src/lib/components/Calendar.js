import React from "react";

import Cell from "./Cell"
import {add, differenceInDays, endOfMonth, format, setDate, startOfMonth, sub} from "date-fns"
import {useState} from "react"
import "./Calendar.css"
import PropTypes from "prop-types";

const weekDays = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun" ]
/**
 * Creates a calendar component with label and input elements
 * @param className: to customise the calendar css
 * @param text: customise label text
 * @param handleMyClick: function to retrieve the date
 * @param ID to add an ID to the input
 * @return { component }
 */

const Calendar = ({className, text, handleMyClick, ID }) => {
    const [openCalendar, setOpenCalendar] = useState(false)
    const [currentDate, setCurrentDate] = useState(new Date())

    const showCalendar = () => {
        setOpenCalendar((openCalendar)=> true)
    }

    const startDate = startOfMonth(currentDate)
    const endDate = endOfMonth(currentDate)
    const numDays = differenceInDays(endDate, startDate) +1

    const prefixDays = startDate.getDay() -1
    const suffixDays = 7 - endDate.getDay()

    const prevMonth = () => setCurrentDate(sub(currentDate, {months: 1}))
    const nextMonth = () => setCurrentDate(add(currentDate, {months: 1}))
    const prevYear = () => setCurrentDate(sub(currentDate, {years: 1}))
    const nextYear = () => setCurrentDate(add(currentDate, {years: 1}))

    const handleClickDate = ( index) => {
        const date = setDate(currentDate, index)
        handleMyClick&& handleMyClick(format(date, "PPP"))
        setCurrentDate(date)
        setOpenCalendar(false)
    }

    return(
        <div>
            <div className={"calendar-block"}>
                <label htmlFor={ID}>{text}</label>
                <input id={ID} className={"calendar-input"} onClick={showCalendar} onChange={()=>{}} value={format(currentDate, "PPP")}/>
            </div>
            {openCalendar === true ?
                <div className={className}>
                    <div className={"calendar-container"}>
                        <div className={"cell-container"}>
                            <Cell className={"cell top-cell clickable-cell"} onClick={prevYear}>{"<<"}</Cell>
                            <Cell className={"cell top-cell clickable-cell"} onClick={prevMonth}>{"<"}</Cell>
                            <Cell className={"cell top-cell full-date-cell"}>{format(currentDate, "LLLL yyyy")}</Cell>
                            <Cell className={"cell top-cell clickable-cell"} onClick={nextMonth}>{">"}</Cell>
                            <Cell className={"cell top-cell clickable-cell"} onClick={nextYear}>{">>"}</Cell>

                            {weekDays.map((day) => (
                                <Cell key={day} className={"cell day-cell"}>{day}</Cell>
                            ))}

                            {Array.from({length: prefixDays}).map((_, index)  => {
                                return( <Cell key={index} className={"cell"}/>)
                            })}

                            {Array.from({length : numDays}).map((_, index) =>{
                                const date = index +1
                                return(<Cell key={date} className={"cell clickable-cell"} onClick={()=> handleClickDate(date, index+1)}>{date}</Cell>)
                            })}

                            {Array.from({length: suffixDays}).map((_, index)  => {
                                return( <Cell key={index} className={"cell"}/>)
                            })}
                        </div>
                    </div>
                </div>
                :
                ""
            }
        </div>
    )
}

export default Calendar

Calendar.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    handleMyClick: PropTypes.func,
    ID: PropTypes.string,
}