import { test, expect, describe } from "bun:test";

import { extractTagsFromPost } from "@/utils/extractTagsFromPost.js";

// タグ抽出
/**
 * 抽出条件
 * - #または＃で始まる文字列
 * - 連続する#または＃は1つにまとめる
 * - 直前にスペースまたは改行があるか、文字列の先頭である
 * - URLの中に含まれる#または＃はタグとして抽出しない
 * - 複数のタグがある場合は、それぞれを抽出する
 * - タグは重複しない
 * - タグはアルファベット、数字のみ使用可能
 * - タグは最大64文字まで
 * - タグは大文字小文字を区別しない
 * - タグは半角スペース、記号、改行で終了する
 */

describe("extractTagsFromPost", () => {
  test("extractTagsFromPost", async () => {
    const postContent = "Hello, #world!";
    const expected = ["world"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = "Hello, #world! #world!";
    const expected = ["world"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = "Hello, #world! #world! #world!";
    const expected = ["world"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = "Hello, #world! #world! #world! #world!";
    const expected = ["world"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = "Hello, world!";
    const expected = [];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `Hello,
    world!`;
    const expected = [];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `Hello,
    #world!`;
    const expected = ["world"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `Hello,
    # world!`;
    const expected = [];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `Hello,
  ＃world!`;
    const expected = ["world"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `Hello,
  ＃#world!`;
    const expected = ["world"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `Hello,
	#＃world!`;
    const expected = ["world"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `Hello, world! https://example.com`;
    const expected = [];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `Hello, world! https://example.com/#world`;
    const expected = [];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `Hello, world! https://example.com/ #world`;
    const expected = ["world"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `Hello, world! https://example.com#world!`;
    const expected = [];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `Hello, world! https://example.com/日本語#world!`;
    const expected = [];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `Hello, world! https://example.com/#world日本`;
    const expected = [];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `Hello, world! https://example.com #world!`;
    const expected = ["world"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `Hello, world!#world!`;
    const expected = ["world"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `Hello, world!
#world!`;
    const expected = ["world"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `#tag1 #tag2 #tag3`;
    const expected = ["tag1", "tag2", "tag3"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `#tag1 #tag2 #tag3 #tag1`;
    const expected = ["tag1", "tag2", "tag3"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `#tag1 #tag2 #tag3 #tag1 #tag2`;
    const expected = ["tag1", "tag2", "tag3"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `#tag1 #tag2 #tag3 #tag1 #tag2 #tag3`;
    const expected = ["tag1", "tag2", "tag3"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `#tag1 #tag2 #tag3 #タグ1 #タグ2 #タグ3`;
    const expected = ["tag1", "tag2", "tag3", "タグ1", "タグ2", "タグ3"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `#tag1 #tag2 #tag3 #タグ1 #タグ2 #タグ3 #tag1 #tag2 #tag3 #タグ1 #タグ2 #タグ3`;
    const expected = ["tag1", "tag2", "tag3", "タグ1", "タグ2", "タグ3"];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `#tag1#tag2`;
    const expected = [];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = ` #tag1#tag2`;
    const expected = [];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = `#tag1＃tag2`;
    const expected = [];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = ` #タグ1#tag2`;
    const expected = [];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });

  test("extractTagsFromPost", async () => {
    const postContent = ` #タグ1#タグ2`;
    const expected = [];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });
  test("extractTagsFromPost", async () => {
    const postContent = ` #tag1#タグ2`;
    const expected = [];

    const result = extractTagsFromPost(postContent);
    expect(result).toStrictEqual(expected);
  });
});
