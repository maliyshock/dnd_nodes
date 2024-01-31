import { generateRandomString, getRandomInt } from "./common.ts";

describe("generateRandomString", () => {
  test("should generate a string of correct length", () => {
    const length = 10;
    const result = generateRandomString(length);

    expect(result).toHaveLength(length);
  });
});

describe("generate integer", () => {
  test("should return an integer", () => {
    const result = getRandomInt(10);

    expect(Number.isInteger(result)).toBeTruthy();
  });

  test("should return a number within the range 0 to max - 1", () => {
    const max = 10;

    for (let i = 0; i < 100; i++) {
      // Run multiple times to ensure reliability
      const result = getRandomInt(max);

      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(max);
    }
  });

  test("should handle the max value of 1", () => {
    const result = getRandomInt(1);

    expect(result).toBe(0);
  });
});
