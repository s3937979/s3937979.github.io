import { useState } from "react";
import TabBar from "./TabBar";

interface CalendarScreenProps {
  onBack: () => void;
  onHomeClick: () => void;
  onMissionClick: () => void;
  onIslandClick?: () => void;
  onProfileClick?: () => void;
}

export default function CalendarScreen({ onBack, onHomeClick, onMissionClick, onIslandClick, onProfileClick }: CalendarScreenProps) {
  const [currentMonth, setCurrentMonth] = useState(3); // April (0-indexed, so 3 = April)
  const [currentYear, setCurrentYear] = useState(2026);
  const [barHeights, setBarHeights] = useState<number[]>([60, 80, 40, 70, 65, 75, 85]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generate calendar days for the current month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  // Generate calendar grid
  const calendarDays = [];
  // Add empty cells for days before the first day of month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  // Add actual days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    // Generate random heights between 30% and 90%
    const randomHeights = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 61) + 30 // Random number between 30 and 90
    );
    setBarHeights(randomHeights);
  };

  return (
    <div className="h-full flex flex-col bg-[#7A9B5F]">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
        {/* Header */}
        <div className="flex items-center justify-center relative pt-5 pb-4 flex-shrink-0">
          <button onClick={onBack} className="absolute left-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1 className="text-black" style={{ fontSize: '20px', fontWeight: 700 }}>
            Calendar
          </h1>
        </div>

        {/* Weekly Summary */}
        <div className="mx-4 mb-4 bg-white/90 rounded-2xl p-4 flex-shrink-0">
          <h2 className="text-black mb-3" style={{ fontSize: '14px', fontWeight: 700 }}>
            Weekly Summary
          </h2>
          {/* Bars container */}
          <div className="flex items-end justify-between gap-2 mb-2" style={{ height: '120px' }}>
            {weekdayLabels.map((label, index) => (
              <div key={`bar-${label}`} className="w-full bg-[#D1E7C2] rounded-full relative" style={{ height: '120px' }}>
                <div
                  className="absolute bottom-0 left-0 right-0 bg-[#7A9B5F] rounded-full transition-all duration-300"
                  style={{ height: `${barHeights[index]}%` }}
                ></div>
              </div>
            ))}
          </div>
          {/* Labels row */}
          <div className="flex justify-between gap-2">
            {weekdayLabels.map((label) => (
              <div key={`label-${label}`} className="flex-1 text-center">
                <span className="text-black" style={{ fontSize: '8px', fontWeight: 400 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="mx-4 mb-20 bg-white/90 rounded-2xl p-4 flex-shrink-0">
          {/* Month navigation */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <button onClick={previousMonth}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="black">
                <polygon points="15 18 9 12 15 6" />
              </svg>
            </button>
            <h3 className="text-black" style={{ fontSize: '16px', fontWeight: 700 }}>
              {monthNames[currentMonth]}
            </h3>
            <button onClick={nextMonth}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="black">
                <polygon points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekdayLabels.map((label) => (
              <div key={label} className="text-center">
                <span className="text-black/60" style={{ fontSize: '9px', fontWeight: 400 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                onClick={() => day && handleDateClick(day)}
                className={`aspect-square rounded-full flex items-center justify-center ${
                  day ? 'bg-[#D1D1D4] cursor-pointer hover:bg-[#B8B8BC] transition-colors' : ''
                } ${
                  day === selectedDate ? 'ring-2 ring-[#7A9B5F]' : ''
                }`}
              >
                {day && (
                  <span className="text-black" style={{ fontSize: '11px', fontWeight: 400 }}>
                    {day}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom tab bar - fixed at bottom */}
      <TabBar onTab1Click={onHomeClick} onTab2Click={onMissionClick} onTab3Click={onIslandClick} onTab4Click={onProfileClick} />
    </div>
  );
}
