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
import { getHSL } from "../../utiles";

const Calendar = ({ intStart, intEnd, msg }) => {
  const [currentDate, setCurrentDate] = useState(intStart);

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

  const getTableCel = (day, index) => {
    let { h, s, l } = { h: 228, s: 0, l: 100 };
    let msgon = false;
    if (intStart === intEnd) {
      if (day != null && day === intEnd.getDate()) {
        h = 204;
        s = 70;
        l = 63;
        msgon = true;
      }
      // estoy en marcado de un dia
    } else {
      //tengo que colorar rango
      if (intStart.getMonth() < intEnd.getMonth()) {
        //es exclusion de un mes o de PRIMER cal
        if (day != null && day >= intStart.getDate()) {
          h = 6;
          s = 39;
          l = 81;
          msgon = true;
        }
      } else {
        // seg cal
        if (day != null && day <= intEnd.getDate()) {
          h = 6;
          s = 39;
          l = 81;
          msgon = true;
        }
      }
    }

    return (
      <>
        <TableCell
          onMouseEnter={msgon ? handleOver : null}
          onMouseLeave={msgon ? handleOver : null}
          key={index}
          sx={{
            border: "1px solid #ddd",
            textAlign: "center",
            padding: "2px",
            backgroundColor: getHSL(h, s, l),
            "&:hover": {
              backgroundColor: getHSL(h, s, l - 10),
            },
          }}
        >
          {day || " "}
        </TableCell>
        {msgon && (
          <Popper id={index} open={open} anchorEl={anchorEl}>
            <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
              {msg}
            </Box>
          </Popper>
        )}
      </>
    );
  };

  return (
    <div>
      <Typography variant="h7" paddingBottom={2}>
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
                    key={index}
                    sx={{
                      backgroundColor: "#f2f2f2",
                      textAlign: "center",
                      padding: "2px",
                    }}
                  >
                    {day}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {chunkArray(daysInMonth, 7).map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((day, index) => getTableCel(day, index))}
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
