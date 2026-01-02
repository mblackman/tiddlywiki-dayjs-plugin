const wrapper = require('../src/wrapper.js');

describe('Day.js Wrapper Macro', () => {
  test('exports expected macro properties', () => {
    expect(wrapper.name).toBe('dayjs');
    expect(wrapper.params).toEqual([{ name: "date" }, { name: "format" }]);
    expect(typeof wrapper.run).toBe('function');
  });

  test('formats date with default format (YYYY-MM-DD)', () => {
    const result = wrapper.run('2023-12-25');
    expect(result).toBe('2023-12-25');
  });

  test('formats date with custom format', () => {
    const result = wrapper.run('2023-12-25', 'DD/MM/YYYY');
    expect(result).toBe('25/12/2023');
  });

  test('supports ISO Week plugin (WW-GGGG)', () => {
    // Jan 1st 2023 is a Sunday, which falls in the last ISO week of 2022
    const result = wrapper.run('2023-01-01', 'GGGG-WW');
    expect(result).toBe('2022-52');
  });

  test('supports Advanced Format plugin (Do)', () => {
    // 1st, 2nd, 3rd...
    const result = wrapper.run('2023-01-01', 'Do MMM');
    expect(result).toBe('1st Jan');
  });
});