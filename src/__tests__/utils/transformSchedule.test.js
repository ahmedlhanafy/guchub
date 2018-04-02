const {
  transformSchedule,
  checkIfTransformedScheduleIsEmpty,
  getSchedule,
  getNextDaySchedule,
} = require('../../utils/transformSchedule');

const fakeSchedule = [
  {
    course: {
      name: 'Internet of Things',
    },
    type: 'LECTURE',
    venue: 'H19',
    weekday: 'SUNDAY',
    number: 3,
  },
  {
    course: {
      name: 'Advanced Computer Lab',
    },
    type: 'LAB',
    venue: 'C7.201',
    weekday: 'SUNDAY',
    number: 4,
  },
  {
    course: {
      name: 'Advanced Computer Lab',
    },
    type: 'LAB',
    venue: 'C7.201',
    weekday: 'SUNDAY',
    number: 5,
  },
  {
    course: {
      name: 'Architecture of Massively Scalable Apps',
    },
    type: 'LECTURE',
    venue: 'H5',
    weekday: 'MONDAY',
    number: 1,
  },
  {
    course: {
      name: 'Compiler',
    },
    type: 'LECTURE',
    venue: 'H13',
    weekday: 'TUESDAY',
    number: 1,
  },
  {
    course: {
      name: 'Seminar in Interaction Design & Evaluation',
    },
    type: 'LECTURE',
    venue: 'C6.204',
    weekday: 'TUESDAY',
    number: 2,
  },
  {
    course: {
      name: 'Computer and Network Security',
    },
    type: 'TUTORIAL',
    venue: 'C6.203',
    weekday: 'TUESDAY',
    number: 3,
  },
  {
    course: {
      name: 'Architecture of Massively Scalable Apps',
    },
    type: 'LAB',
    venue: 'C6.204',
    weekday: 'TUESDAY',
    number: 4,
  },
  {
    course: {
      name: 'Compiler',
    },
    type: 'TUTORIAL',
    venue: 'C6.203',
    weekday: 'WEDNESDAY',
    number: 2,
  },
  {
    course: {
      name: 'Project Management',
    },
    type: 'TUTORIAL',
    venue: 'C5.301',
    weekday: 'WEDNESDAY',
    number: 3,
  },
  {
    course: {
      name: 'Computer and Network Security',
    },
    type: 'LECTURE',
    venue: 'H17',
    weekday: 'WEDNESDAY',
    number: 4,
  },
  {
    course: {
      name: 'Project Management',
    },
    type: 'LECTURE',
    venue: 'H17',
    weekday: 'WEDNESDAY',
    number: 5,
  },
  {
    course: {
      name: 'Advanced Data structures and Algorithms',
    },
    type: 'LAB',
    venue: 'C7.220',
    weekday: 'THURSDAY',
    number: 1,
  },
  {
    course: {
      name: 'Advanced Data structures and Algorithms',
    },
    type: 'LECTURE',
    venue: 'H8',
    weekday: 'THURSDAY',
    number: 2,
  },
  {
    course: {
      name: 'Internet of Things',
    },
    type: 'TUTORIAL',
    venue: 'C5.301',
    weekday: 'THURSDAY',
    number: 4,
  },
];

it(`should transform GUC's schedule to a map between the days and schedule`, () => {
  const transformedSchedule = transformSchedule(fakeSchedule);
  expect(transformedSchedule.SUNDAY.length).toBe(3);
  expect(transformedSchedule.MONDAY.length).toBe(1);
  expect(transformedSchedule.TUESDAY.length).toBe(4);
  expect(transformedSchedule.WEDNESDAY.length).toBe(4);
  expect(transformedSchedule.THURSDAY.length).toBe(3);
});

it(`should decide if the transformed schedule is empty or not`, () => {
  const transformedSchedule = transformSchedule(fakeSchedule);
  expect(checkIfTransformedScheduleIsEmpty(transformedSchedule)).toBe(false);
  expect(checkIfTransformedScheduleIsEmpty({})).toBe(true);
  expect(checkIfTransformedScheduleIsEmpty({ SUNDAY: [], MONDAY: [] })).toBe(true);
});

it(`should get the next day that has a non-empty schedule`, () => {
  const transformedSchedule = transformSchedule(fakeSchedule);
  const { dayIndex } = getNextDaySchedule(transformedSchedule, 5);
  const { dayIndex: dayIndex1 } = getNextDaySchedule(transformedSchedule, 6);
  const { dayIndex: dayIndex2 } = getNextDaySchedule(transformedSchedule, 0);
  const { dayIndex: dayIndex3 } = getNextDaySchedule(transformedSchedule, 1);
  const { dayIndex: dayIndex4 } = getNextDaySchedule(transformedSchedule, 2);
  const { dayIndex: dayIndex5 } = getNextDaySchedule(transformedSchedule, 3);
  const { dayIndex: dayIndex6 } = getNextDaySchedule(transformedSchedule, 4);
  expect(dayIndex).toBe(0);
  expect(dayIndex1).toBe(0);
  expect(dayIndex2).toBe(0);
  expect(dayIndex3).toBe(1);
  expect(dayIndex4).toBe(2);
  expect(dayIndex5).toBe(3);
  expect(dayIndex6).toBe(4);
});

it(`should return empty schedule if the given schedule is empty`, () => {
  const transformedSchedule = { FRIDAY: [], SATURDAY: [] };
  const { schedule } = getNextDaySchedule(transformedSchedule, 1);
  expect(schedule.length).toBe(0);
});

describe('getSchedule', () => {
  const getDate = (index, shouldSetHoursBeforeSix = true) => {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + index);
    if (shouldSetHoursBeforeSix) {
      date.setHours(7);
    } else {
      date.setHours(19);
    }
    return date;
  };
  it(`should return the next day that has a schedule`, () => {
    const { label } = getSchedule(fakeSchedule, getDate(5));
    expect(label).toBe('Sunday');
  });

  it(`should detect that tomorrow has a schedule and return the label as tomorrow`, () => {
    const { label } = getSchedule(fakeSchedule, getDate(6));
    expect(label).toBe('Tomorrow');
  });

  it(`should detect that today has a schedule and return the label as today`, () => {
    const { label } = getSchedule(fakeSchedule, getDate(7));
    const { label: label0 } = getSchedule(fakeSchedule, getDate(0));
    const { label: label1 } = getSchedule(fakeSchedule, getDate(1));
    const { label: label2 } = getSchedule(fakeSchedule, getDate(2));
    const { label: label3 } = getSchedule(fakeSchedule, getDate(3));
    const { label: label4 } = getSchedule(fakeSchedule, getDate(4));
    expect(label).toBe('Today');
    expect(label0).toBe('Today');
    expect(label1).toBe('Today');
    expect(label2).toBe('Today');
    expect(label3).toBe('Today');
    expect(label4).toBe('Today');
  });

  it(`should detect if it's past 6 oclock and return the schedule of the next day`, () => {
    const { label: label0 } = getSchedule(fakeSchedule, getDate(0, false));
    const { label: label1 } = getSchedule(fakeSchedule, getDate(1, false));
    const { label: label2 } = getSchedule(fakeSchedule, getDate(2, false));
    const { label: label3 } = getSchedule(fakeSchedule, getDate(3, false));
    const { label: label4 } = getSchedule(fakeSchedule, getDate(4, false));
    const { label: label5 } = getSchedule(fakeSchedule, getDate(5, false));
    const { label: label6 } = getSchedule(fakeSchedule, getDate(6, false));
    expect(label0).toBe('Tomorrow');
    expect(label1).toBe('Tomorrow');
    expect(label2).toBe('Tomorrow');
    expect(label3).toBe('Tomorrow');
    expect(label4).toBe('Sunday');
    expect(label5).toBe('Sunday');
    expect(label6).toBe('Tomorrow');
  });

  it(`should return null if the schedule is not given`, () => {
    const output = getSchedule(null, getDate(0, false));
    expect(output).toBe(null);
  });
});
