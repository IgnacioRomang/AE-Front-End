import {
  Box,
  Paper,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { blue, grey, red } from "@mui/material/colors";
import React from "react";

/**
 * The `Calendar` component is a React component that displays a calendar table. It takes three props
 * as input: `intStart`, `intEnd`, and `msg`.
 *
 * @param {Date} intStart - The start date of the calendar range
 * @param {Date} intEnd - The end date of the calendar range
 * @param {string} msg - The message to display when the user hovers over a date in the calendar
 */
const Calendar = ({ intStart, intEnd, msg }) => {
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
   * @param {number} rowIndex - The index of the roisSameMOnthining the given date
   */
  const getTableCel = (day, rowIndex, cellIndex) => {
    let msg_active = false;
    let isToday = day === intStart.getDate() || day === intEnd.getDate();
    let sizes = false;
    let range_start = cellIndex === 0;
    let range_end = cellIndex === 6;
    let color = grey[50];
    let colorhover = blue[50];
    const radius = "7px";
    if (intStart === intEnd) {
      if (day === intEnd.getDate()) {
        color = blue[200];
        colorhover = blue[300];
        msg_active = true;
        sizes = true;
      }
    } else {
      if (intStart.getMonth() === intEnd.getMonth()) {
        // es un solo calendar para el tramo
        color =
          day >= intStart.getDate() && day <= intEnd.getDate()
            ? red[200]
            : grey[50];
        colorhover =
          day >= intStart.getDate() && day <= intEnd.getDate()
            ? red[300]
            : grey[50];
        msg_active = true;
        range_start = day === intStart.getDate() || cellIndex === 0;
        range_end = day === intEnd.getDate() || cellIndex === 6;
      } else if (intStart < intEnd) {
        // se usan dos  calendar para el tramo
        if (
          day >= intStart.getDate() ||
          (day === null && cellIndex + 7 * rowIndex >= intStart.getDate())
        ) {
          color = red[200];
          colorhover = red[300];
          range_start = isToday || cellIndex === 0;
          range_end = cellIndex === 6;
          msg_active = true;
        }
      } else {
        if (day <= intStart.getDate() || day === null) {
          color = red[200];
          colorhover = red[300];
          range_end = isToday || cellIndex === 6;
          msg_active = true;
        }
      }
    }

    return (
      <>
        <TableCell
          onMouseEnter={msg_active ? handleOver : null}
          onMouseLeave={msg_active ? handleOver : null}
          //key={`${hash}-${rowIndex}-${cellIndex}`}
          sx={{
            padding: "2px",
            borderBlock: "0px",
            borderTopLeftRadius: sizes || range_start ? radius : "0px",
            borderBottomLeftRadius: sizes || range_start ? radius : "0px",
            borderTopRightRadius: sizes || range_end ? radius : "0px",
            borderBottomRightRadius: sizes || range_end ? radius : "0px",
            overflow: "hidden",
            backgroundColor: color,
            "&:hover": {
              border: "0.6px solid black",
              backgroundColor: colorhover,
            },
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            {day === null ? "" : day.toString()}
          </div>
        </TableCell>
        {msg_active && (
          <Popper //id={`${hash}-${rowIndex}`}
            open={open}
            anchorEl={anchorEl}
          >
            <Box
              sx={{
                border: 1,
                bgcolor: "background.paper",
              }}
            >
              {msg}
            </Box>
          </Popper>
        )}
      </>
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
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "300px", margin: "auto" }}
      >
        <Table>
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
export default Calendar;
