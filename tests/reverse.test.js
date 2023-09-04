import { reverseString } from "../utils/for_testing.js";

describe("for_testing.js", () => {
  test("Reverse string", () => {
    expect(reverseString("react")).toBe("tcaer");
  });
});
