import capitalize from 'lodash.capitalize';
import type { Course } from '../types/Course';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const transformSchedule = (schedule: Array<Course>): { [string]: Array<Course> } => {
  return schedule
    ? schedule.reduce((acc, val) => {
        if (acc[val.weekday]) {
          acc[val.weekday] = [...acc[val.weekday], val];
        } else {
          acc[val.weekday] = [val];
        }
        return acc;
      }, {})
    : {};
};

export const checkIfTransformedScheduleIsEmpty = (transformedSchedule: {
  [string]: Array<Course>,
}) =>
  Object.keys(transformedSchedule)
    .map(day => transformedSchedule[day])
    .reduce((acc, next) => acc + next.length, 0) === 0;

export const getNextDaySchedule = (
  transformedSchedule: { [string]: Array<Course> },
  dayIndex: number
): { schedule: Array<Course>, dayIndex: number } => {
  if (checkIfTransformedScheduleIsEmpty(transformedSchedule)) {
    return {
      schedule: [],
      dayIndex: 0,
    };
  }
  const dayName = days[dayIndex];
  const todaySchedule = transformedSchedule[dayName.toUpperCase()] || [];
  if (todaySchedule.length === 0) {
    return getNextDaySchedule(transformedSchedule, (dayIndex + 1) % 7);
  }
  return {
    schedule: todaySchedule,
    dayIndex,
  };
};

export const getSchedule = (gucSchedule: Array<Object>, todayDate: Date = new Date()) => {
  let label = 'Today';
  const transformedSchedule = transformSchedule(gucSchedule);
  const todayIndex = todayDate.getDay();
  const tomorrowIndex = (todayIndex + 1) % 7;

  const { schedule, dayIndex } = getNextDaySchedule(
    transformedSchedule,
    todayDate.getHours() >= 18 ? tomorrowIndex : todayIndex
  );
  if (schedule.length === 0) {
    return null;
  }
  if (dayIndex === todayIndex) {
    label = 'Today';
  } else if (dayIndex === tomorrowIndex) {
    label = 'Tomorrow';
  } else {
    label = capitalize(days[dayIndex]);
  }
  return {
    schedule,
    label,
  };
};
