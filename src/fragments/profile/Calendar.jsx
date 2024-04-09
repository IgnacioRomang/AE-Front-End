import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { blue, green, grey, purple, red } from "@mui/material/colors";
import React from "react";

/**
 * The `Calendar` component is a React component that displays a calendar table. It takes three props
 * as input: `intStart`, `intEnd`, and `msg`.
 *
 * @param {Date} intStart - The start date of the calendar range
 * @param {Date} intEnd - The end date of the calendar range
 * @param {string} msg - The message to display when the user hovers over a date in the calendar
 */
const Calendar = ({ intStart, intEnd }) => {
  const currentDate = intStart;
  //const hash = btoa(currentDate.toString() + intEnd.toString() + msg);
  const daysInMonth = getDaysInMonth(currentDate);

  const monthName = new Intl.DateTimeFormat("es", { month: "long" }).format(
    currentDate
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOver = (event) => {
    setOpen(!open);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  /**
   * Returns a table cell for a given date.
   *
   * @param {Date} day - The date to display in the table cell
   * @param {number} rowIndex - The index of the row containing the given date
   * @param {number} cellIndex - The index of the cell in the row containing the
   * given date
   * @returns {*} A JSX element representing a table cell
   */
  const getTableCel = (day, rowIndex, cellIndex) => {
    const isSingleCalendar = intStart === intEnd;
    // Set default styles for the table cell
    let range_start = null;
    let range_end = null;
    const radius = "7px";

    // If the user is using a single calendar, highlight the end date
    if (isSingleCalendar) {
      if (isToday(day, intEnd)) {
        return (
          <TableCell
            size="small"
            sx={{
              padding: "5px",
              borderRadius: radius,
              backgroundColor: blue[200],
            }}
          >
            <Typography sx={{ textAlign: "center" }}>
              {day === null ? "" : day.toString()}
            </Typography>
          </TableCell>
        );
      }
    } else {
      let color = grey[50];
      range_start = isStartdate(day, intStart, cellIndex);
      range_end = isEnddate(day, intEnd, cellIndex);
      if (isSameMonth(intStart, intEnd)) {
        if (dateBetween(intStart, day, intEnd)) {
          color = red[200];
          range_start = range_start || isToday(day, intStart);
          range_end = range_end || isToday(day, intEnd);
        }
      } else {
        if (monthGreater(intStart, intEnd)) {
          // Primercalendar
          if (dayGreaterEqual(day, intStart, cellIndex, rowIndex)) {
            color = red[200];
            range_start = range_start || isToday(day, intStart);
          }
        } else {
          if (dayLessEqual(day, intStart, cellIndex, rowIndex)) {
            color = red[200];
            range_end = range_end || isToday(day, intStart);
          }
        }
      }

      return (
        <TableCell
          size="small"
          sx={{
            padding: "5px",
            borderTopLeftRadius: range_start ? radius : 0,
            borderBottomLeftRadius: range_start ? radius : 0,
            borderTopRightRadius: range_end ? radius : 0,
            borderBottomRightRadius: range_end ? radius : 0,
            backgroundColor: color,
          }}
        >
          <Typography sx={{ textAlign: "center" }}>
            {day === null ? "" : day.toString()}
          </Typography>
        </TableCell>
      );
    }

    return (
      <TableCell
        size="small"
        sx={{
          padding: "5px",
          backgroundColor: grey[50],
        }}
      >
        <Typography sx={{ textAlign: "center" }}>
          {day === null ? "" : day.toString()}
        </Typography>
      </TableCell>
    );
  };

  return (
    <div>
      <Typography variant="body7" padding={2}>
        {monthName.charAt(0).toUpperCase() +
          monthName.slice(1) +
          " " +
          currentDate.getFullYear()}
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(
                (day, index) => (
                  <TableCell
                    sx={{
                      backgroundColor: "#d9d9d9",
                      textAlign: "center",
                      textJustify: "center",
                      padding: "2px",
                    }}
                    //key={day + hash + index}
                  >
                    {day}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {chunkArray(daysInMonth, 7).map((row, rowIndex) => (
              <TableRow //key={`${hash}-${rowIndex}`}
              >
                {row.map((day, index) => getTableCel(day, rowIndex, index))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

/**
 * Returns an array containing the days of the month, including any empty cells for days before the first day of the month.
 *
 * @param {Date} date - The date for which to retrieve the days of the month
 * @returns {number[]} An array containing the days of the month, starting with the first day of the month and including any empty cells for days before the first day of the month
 */
const getDaysInMonth = (date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const startingDayOfWeek = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)
  const daysInMonth = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    daysInMonth.push(null);
  }

  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  // Add the days of the month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    daysInMonth.push(i);
  }
  if (daysInMonth.length % 7 !== 0) {
    const remainingDays = 7 - (daysInMonth.length % 7);
    for (let i = 0; i < remainingDays; i++) {
      daysInMonth.push(null);
    }
  }
  return daysInMonth;
};

/**
 * The `chunkArray` function takes an array and a size as input and returns a new array with the
 * original array split into smaller arrays of the specified size.
 *
 * @param {Array} arr - The array to be split into smaller arrays
 * @param {number} size - The maximum length of each subarray
 * @returns {Array} The function `chunkArray` returns a new array that contains subarrays of the original array
 * `arr`, where each subarray has a maximum length of `size`.
 */
const chunkArray = (arr, size) => {
  const chunkedArray = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArray.push(arr.slice(i, i + size));
  }
  return chunkedArray;
};

const isToday = (day, date) => {
  return day === date.getDate();
};

const isStartdate = (day, date, cellIndex) => {
  return cellIndex === 0;
};

const isEnddate = (day, date, cellIndex) => {
  return cellIndex === 6;
};

const isSameMonth = (date1, date2) => {
  return date1.getMonth() === date2.getMonth();
};

const dateBetween = (start, day, end) => {
  return start.getDate() <= day && day <= end.getDate();
};

const monthGreater = (date1, date2) => {
  return date1.getMonth() < date2.getMonth();
};

const realIndex = (cellIndex, rowIndex) => {
  return cellIndex + 7 * rowIndex;
};

const dayGreaterEqual = (day, date1, cellIndex, rowIndex) => {
  let dayg = date1.getDate();
  return day >= dayg || (day === null && realIndex(cellIndex, rowIndex) > dayg);
};

const dayLessEqual = (day, date1, cellIndex, rowIndex) => {
  let dayg = date1.getDate();
  return (
    (day <= dayg && day !== null) ||
    (day === null && realIndex(cellIndex, rowIndex) < dayg)
  );
};
export default Calendar;
