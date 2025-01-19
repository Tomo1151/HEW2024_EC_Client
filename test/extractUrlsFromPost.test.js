import { test, expect, describe } from "bun:test";

import { extractTagsFromPost } from "@/utils/extractUrlsFromPost.js";

describe("extractUrlsFromPost", () => {
  test("extractUrlsFromPost", async () => {
    const postContent = "Hello, world!";
    const expected = [];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });
  test("extractUrlsFromPost", async () => {
    const postContent = "Hello, world! http://example.com";
    const expected = ["http://example.com"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });
  test("extractUrlsFromPost", async () => {
    const postContent = "Hello, world! http://example.com/hello!";
    const expected = ["http://example.com/hello!"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });
  test("extractUrlsFromPost", async () => {
    const postContent = "Hello, world!http://example.com";
    const expected = ["http://example.com"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });
  test("extractUrlsFromPost", async () => {
    const postContent = "Hello, world!http://example.com hello";
    const expected = ["http://example.com"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });
  test("extractUrlsFromPost", async () => {
    const postContent = "Hello, world!http://example.com/こんにちは";
    const expected = ["http://example.com/こんにちは"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });
  test("extractUrlsFromPost", async () => {
    const postContent = "Hello, world! https://example.com";
    const expected = ["https://example.com"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });
  test("extractUrlsFromPost", async () => {
    const postContent = "Hello, world! https://example.com/hello!";
    const expected = ["https://example.com/hello!"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });
  test("extractUrlsFromPost", async () => {
    const postContent = "Hello, world!https://example.com";
    const expected = ["https://example.com"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });
  test("extractUrlsFromPost", async () => {
    const postContent = "Hello, world!https://example.com hello";
    const expected = ["https://example.com"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });
  test("extractUrlsFromPost", async () => {
    const postContent = "Hello, world!https://example.com/こんにちは";
    const expected = ["https://example.com/こんにちは"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });
});
