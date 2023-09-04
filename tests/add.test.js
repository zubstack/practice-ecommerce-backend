import { add } from "../utils/for_testing.js";

describe("for_testing.js", () => {
  test("Add two numbers", () => {
    expect(add(4, 4)).toBe(8);
  });
  test("Add two numbers", () => {
    expect(add(5, 5)).toBe(10);
  });
});
