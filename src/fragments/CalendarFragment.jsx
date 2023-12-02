import React, { useState } from "react";
import { DayPicker } from "react-day-picker";

import { isSameDay, eachDayOfInterval } from "date-fns";

const CalendarFragment = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDayClick = (day) => {
    const updatedDates = [...selectedDates];

    // Si ya hay 4 fechas seleccionadas, reiniciar la selección
    if (updatedDates.length === 4) {
      setSelectedDates([day]);
    } else {
      // Agregar el día seleccionado
      updatedDates.push(day);

      // Si se seleccionaron 2 fechas individuales, convertir las siguientes 2 en un rango
      if (updatedDates.length === 2) {
        updatedDates.push(day);
        setSelectedDates(updatedDates);
      } else if (updatedDates.length === 4) {
        // Si se seleccionaron 4 fechas, mantener solo las últimas 2
        updatedDates.splice(0, 2);
        setSelectedDates(updatedDates);
      }
    }
  };

  const getRandomDates = () => {
    const randomStartDate = new Date(2023, 0, 1);
    const randomEndDate = new Date(2023, 11, 31);
    const randomInterval = eachDayOfInterval({
      start: randomStartDate,
      end: randomEndDate,
    });

    // Seleccionar 4 fechas aleatorias
    const randomDates = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * randomInterval.length);
      randomDates.push(randomInterval[randomIndex]);
      randomInterval.splice(randomIndex, 1);
    }

    return randomDates;
  };

  const randomDates = getRandomDates();

  return (
    <div>
      <h2>Calendar</h2>
      <DayPicker
        selected={selectedDates}
        numberOfMonths={12}
        onDayClick={handleDayClick}
        modifiers={{
          random: randomDates,
        }}
        showMonths={true}
      />
      <p>
        Random Dates:{" "}
        {randomDates.map((date) => date.toDateString()).join(", ")}
      </p>
    </div>
  );
};

export default CalendarFragment;
