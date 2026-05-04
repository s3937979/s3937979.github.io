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
  const summaryAnchorDay = selectedDate ?? 1;
  const summaryAnchorDate = new Date(currentYear, currentMonth, summaryAnchorDay);
  const summaryWeekStart = new Date(summaryAnchorDate);
  summaryWeekStart.setDate(summaryAnchorDate.getDate() - summaryAnchorDate.getDay());
  const weeklySummaryDates = weekdayLabels.map((label, index) => {
    const date = new Date(summaryWeekStart);
    date.setDate(summaryWeekStart.getDate() + index);

    return {
      label,
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === currentMonth,
    };
  });
  const barHeights = generateWeeklyBarHeights(summaryWeekStart);
  const selectedDateStats = selectedDate
    ? generateDailyStats(new Date(currentYear, currentMonth, selectedDate))
    : null;
  const selectedDateLabel = selectedDate
    ? `${monthNames[currentMonth]} ${selectedDate}, ${currentYear}`
    : "";

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
    setSelectedDate(1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(1);
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
  };

  return (
    <div className="h-full flex flex-col bg-[#7A9B5F]">
      {/* Fixed Header */}
      <div className="flex items-center justify-center relative pt-5 pb-4 flex-shrink-0 bg-[#7A9B5F] z-10">
        <button onClick={onBack} className="absolute left-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-black" style={{ fontSize: '20px', fontWeight: 700 }}>
          Calendar
        </h1>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
        {/* Weekly Summary */}
        <div className="mx-4 mb-4 bg-white/90 rounded-2xl p-4 flex-shrink-0">
          <h2 className="text-black mb-3" style={{ fontSize: '18px', fontWeight: 700 }}>
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
            {weeklySummaryDates.map(({ label, day, isCurrentMonth }) => (
              <div key={`label-${label}`} className="flex-1 text-center">
                <span className={isCurrentMonth ? "text-black" : "text-black/40"} style={{ fontSize: '12px', fontWeight: 400, lineHeight: '1.1' }}>
                  {label}
                </span>
                <span className={isCurrentMonth ? "block text-black" : "block text-black/40"} style={{ fontSize: '12px', fontWeight: 700, lineHeight: '1.1' }}>
                  {day}
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
                <polygon points="15 18 9 12 15 6" />
              </svg>
            </button>
            <h3 className="text-black" style={{ fontSize: '20px', fontWeight: 700 }}>
              {monthNames[currentMonth]}
            </h3>
            <button onClick={nextMonth}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
                <polygon points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekdayLabels.map((label) => (
              <div key={label} className="text-center">
                <span className="text-black/60" style={{ fontSize: '13px', fontWeight: 400 }}>
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
                  day === selectedDate
                    ? 'bg-[#BB362E] cursor-pointer transition-colors'
                    : day
                      ? 'bg-[#D1D1D4] cursor-pointer hover:bg-[#B8B8BC] transition-colors'
                      : ''
                }`}
              >
                {day && (
                  <span className={day === selectedDate ? "text-white" : "text-black"} style={{ fontSize: '15px', fontWeight: 400 }}>
                    {day}
                  </span>
                )}
              </div>
            ))}
          </div>

          {selectedDateStats && (
            <div className="mt-5 border-t-2 border-black pt-4">
              <h4 className="text-black mb-3" style={{ fontSize: '18px', fontWeight: 700 }}>
                {selectedDateLabel}
              </h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <CalendarStat label="Steps" value={selectedDateStats.steps.toLocaleString()} />
                <CalendarStat label="Coins" value={`${selectedDateStats.coins}`} />
                <CalendarStat label="Kcal" value={`${selectedDateStats.kcal}`} />
                <CalendarStat label="Km" value={`${selectedDateStats.km.toFixed(1)}`} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom tab bar - fixed at bottom */}
      <TabBar activeTab="home" onTab1Click={onHomeClick} onTab2Click={onMissionClick} onTab3Click={onIslandClick} onTab4Click={onProfileClick} />
    </div>
  );
}

function CalendarStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-black/60" style={{ fontSize: '12px', fontWeight: 400, lineHeight: '1.1' }}>
        {label}
      </p>
      <p className="numeric-italic text-black" style={{ fontSize: '18px', fontWeight: 700, lineHeight: '1.1' }}>
        {value}
      </p>
    </div>
  );
}

function generateWeeklyBarHeights(weekStart: Date) {
  const weekKey = weekStart.getFullYear() * 10000 + (weekStart.getMonth() + 1) * 100 + weekStart.getDate();
  let seed = weekKey;

  return Array.from({ length: 7 }, () => {
    seed = (seed * 9301 + 49297) % 233280;
    return Math.floor((seed / 233280) * 61) + 30;
  });
}

function generateDailyStats(date: Date) {
  let seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();

  const nextRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const steps = Math.floor(nextRandom() * 12001) + 2000;
  const coins = Math.floor(steps / 1000);
  const kcal = Math.round(steps * 0.04);
  const km = steps * 0.0007;

  return { steps, coins, kcal, km };
}
