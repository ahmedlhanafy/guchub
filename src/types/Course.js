/* @flow */

export type WeekDay = 'SATURDAY' | 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY';

export type Course = {
  course: {
    name: string,
  },
  venue: string,
  type: string,
  weekday: WeekDay,
  number: number,
};
