/* @flow */
import type { WeekDay, Course } from '../types/Course';

export default (schedule: Array<Course>): Object<WeekDay, Array<Course>> => {
  return schedule.reduce((acc, val) => {
    if (acc[val.weekday]) {
      acc[val.weekday] = [...acc[val.weekday], val];
    } else {
      acc[val.weekday] = [val];
    }
    return acc;
  }, {});
};
