import { test, expect, describe } from "bun:test";
import { dateFormat } from "@/utils/dateFormat.js";

// 日付フォーマット
/**
 * 引数
 * - 対象時刻
 * - 比較時刻 (デフォルトは現在時刻)
 * 条件
 * - 対象時刻との差分が1分未満の場合は「たった今」
 * - 対象時刻との差分が1時間未満の場合は「○分前」
 * - 対象時刻との差分が1日未満の場合は「○時間前」
 * - 対象時刻との差分が1年未満の場合は「⚪︎月⚪︎日」
 * - 対象時刻との差分が1年以上の場合は「⚪︎年⚪︎月⚪︎日」
 * - 対象時刻が無効な場合は「不明」
 */

describe("dateFormat", () => {
  test("dateFormat", async () => {
    const targetDate = new Date();
    const expected = "たった今";

    const result = dateFormat(targetDate, targetDate);
    expect(result).toStrictEqual(expected);
  });

  test("dateFormat", async () => {
    const targetDate = new Date();
    const expected = "たった今";

    const result = dateFormat(targetDate);
    expect(result).toStrictEqual(expected);
  });

  test("dateFormat", async () => {
    const targetDate = new Date();
    targetDate.setSeconds(targetDate.getSeconds() - 59);
    const expected = "たった今";

    const result = dateFormat(targetDate, targetDate);
    expect(result).toStrictEqual(expected);
  });

  test("dateFormat", async () => {
    const targetDate = new Date();
    targetDate.setMinutes(targetDate.getMinutes() - 1);
    const expected = "1分前";

    const result = dateFormat(targetDate);
    expect(result).toStrictEqual(expected);
  });

  test("dateFormat", async () => {
    const targetDate = new Date();
    targetDate.setMinutes(targetDate.getMinutes() - 2);
    const expected = "2分前";

    const result = dateFormat(targetDate);
    expect(result).toStrictEqual(expected);
  });

  test("dateFormat", async () => {
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() - 1);
    const expected = "1時間前";

    const result = dateFormat(targetDate);
    expect(result).toStrictEqual(expected);
  });

  test("dateFormat", async () => {
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() - 2);
    const expected = "2時間前";

    const result = dateFormat(targetDate);
    expect(result).toStrictEqual(expected);
  });

  test("dateFormat", async () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - 1);
    const expected = `${targetDate.getMonth() + 1}月${targetDate.getDate()}日`;

    const result = dateFormat(targetDate);
    expect(result).toStrictEqual(expected);
  });

  test("dateFormat", async () => {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() - 1);
    const expected = `${targetDate.getMonth() + 1}月${targetDate.getDate()}日`;

    const result = dateFormat(targetDate);
    expect(result).toStrictEqual(expected);
  });

  test("dateFormat", async () => {
    const targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() - 1);
    const expected = `${targetDate.getFullYear()}年${targetDate.getMonth() + 1}月${targetDate.getDate()}日`;

    const result = dateFormat(targetDate);
    expect(result).toStrictEqual(expected);
  });

  test("dateFormat", async () => {
    const targetDate = new Date("invalid");
    const expected = "不明";

    const result = dateFormat(targetDate);
    expect(result).toStrictEqual(expected);
  });
});
