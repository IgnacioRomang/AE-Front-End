import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Popper,
  Box,
} from "@mui/material";
import { blue, grey, red } from "@mui/material/colors";

const Calendar = ({ intStart, intEnd, msg }) => {
  const [currentDate, setCurrentDate] = useState(intStart);
  const hash = btoa(currentDate.toString() + intEnd.toString());
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

  const getTableCel = (day, rowIndex, cellIndex) => {
    let msg_active = false;
    let sizes = false;
    let range_start = false;
    let range_end = false;
    let color = grey[50];

    if (intStart === intEnd) {
      if (day != null && day === intEnd.getDate()) {
        color = blue[200];
        sizes = true;
        msg_active = true;
      }
    } else {
      const isExclusionOfFirstCal = intStart.getMonth() < intEnd.getMonth();
      range_start = intStart.getDate() === day && isExclusionOfFirstCal;
      range_end = intEnd.getDate() === day && !isExclusionOfFirstCal;
      if (
        isExclusionOfFirstCal
          ? day != null && day >= intStart.getDate()
          : day == null || day <= intEnd.getDate()
      ) {
        color = red[200];
        msg_active = true;
      }
    }

    return (
      <>
        <TableCell
          onMouseEnter={msg_active ? handleOver : null}
          onMouseLeave={msg_active ? handleOver : null}
          key={`${hash}-${rowIndex}-${cellIndex}`}
          sx={{
            //border: "1px solid #ddd",

            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2px",
            borderTopLeftRadius: sizes || range_start ? "30px" : "0px",
            borderBottomLeftRadius: sizes || range_start ? "30px" : "0px",
            borderTopRightRadius: sizes || range_end ? "30px" : "0px",
            borderBottomRightRadius: sizes || range_end ? "30px" : "0px",
            overflow: "hidden",
            backgroundColor: color,
            "&:hover": {
              backgroundColor: color,
            },
          }}
        >
          {day || " "}
        </TableCell>
        {msg_active && (
          <Popper id={`${hash}-${rowIndex}`} open={open} anchorEl={anchorEl}>
            <Box
              sx={{
                border: 1,
                p: 1,
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
                      backgroundColor: "#f2f2f2",
                      textAlign: "center",
                      padding: "2px",
                    }}
                    key={day + hash}
                  >
                    {day}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {chunkArray(daysInMonth, 7).map((row, rowIndex) => (
              <TableRow key={`${hash}-${rowIndex}`}>
                {row.map((day, index) => getTableCel(day, rowIndex, index))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

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

  return daysInMonth;
};

const chunkArray = (arr, size) => {
  const chunkedArray = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArray.push(arr.slice(i, i + size));
  }
  return chunkedArray;
};

export default Calendar;
