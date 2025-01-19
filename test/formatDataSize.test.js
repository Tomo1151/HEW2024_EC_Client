import { test, expect, describe } from "bun:test";
import { formatDataSize } from "@/utils/formatDataSize.js";

describe("formatDataSize", () => {
  test("formatDataSize", async () => {
    const size = 10;
    const limit = 5;
    const expected = "10.0 B";

    const result = formatDataSize(size, limit);
    expect(result).toStrictEqual(expected);
  });

  test("formatDataSize", async () => {
    const size = 1000;
    const limit = 5;
    const expected = "1.0 kB";

    const result = formatDataSize(size, limit);
    expect(result).toStrictEqual(expected);
  });

  test("formatDataSize", async () => {
    const size = 123456;
    const limit = 5;
    const expected = "123.4 kB";

    const result = formatDataSize(size, limit);
    expect(result).toStrictEqual(expected);
  });

  test("formatDataSize", async () => {
    const size = 1234567;
    const limit = 5;
    const expected = "1.2 MB";

    const result = formatDataSize(size, limit);
    expect(result).toStrictEqual(expected);
  });

  test("formatDataSize", async () => {
    const size = 1234567890;
    const limit = 5;
    const expected = "1.2 GB";

    const result = formatDataSize(size, limit);
    expect(result).toStrictEqual(expected);
  });

  test("formatDataSize", async () => {
    const size = 5678901234;
    const limit = 5;
    const expected = "ファイルサイズが大きすぎます";

    const result = formatDataSize(size, limit);
    expect(result).toStrictEqual(expected);
  });
});
