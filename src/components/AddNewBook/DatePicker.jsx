import React, { useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import style from './DatePicker.module.css'
import { DateRange } from 'react-date-range'

const DatePicker = () => {
  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ])
  const handleSelect = (ranges) => {
    setSelectionRange([ranges.selection])
  }
  return (
    <DateRange
      className={style.rdrCalendarWrapper}
      ranges={selectionRange}
      onChange={handleSelect}
    />
  )
}

export default DatePicker
