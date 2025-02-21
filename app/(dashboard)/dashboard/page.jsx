"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FormControl, Select, MenuItem } from "@mui/material";

import {
  Box,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";

import { useUserContext } from "@/context/UserContext";
import { urlForImage } from "@/utils/utils";
import CircularLoading from "@/components/loading/CircularLoading";

ChartJS.register(...registerables);

const page = () => {
  const { activeUser, refreshToken } = useUserContext();
  const [stats, setStats] = useState(null);
  const [sales, setSales] = useState(null);
  const [periodType, setPeriodType] = useState("daily");

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/stats`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const resJson = await response.json();
      // console.log(resJson);

      if (resJson.success) {
        // console.log(aggregateWholeCounts(resJson.data.impressions));
        setStats(resJson.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSales = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/stats/sales`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const resJson = await response.json();
      // console.log(Object.values(resJson.data));
      setSales(resJson.data);
    } catch (error) {
      console.error(error);
    }
  };

  const aggregateWholeCounts = (data) => {
    if (!data) return 0;
    if (periodType === "total") {
      const dailySum = Object.values(data.daily || {}).reduce(
        (acc, count) => acc + count,
        0
      );
      return (data.total || 0) + dailySum;
    }
    return Object.values(data.daily || {}).reduce(
      (acc, count) => acc + count,
      0
    );
  };

  useEffect(() => {
    (async function () {
      await refreshToken();
      await fetchStats();
      await fetchSales();
    })();
  }, []);

  if (activeUser === null || stats === null) {
    return <CircularLoading />;
  }

  return (
    <Container
      sx={{
        backgroundColor: "white",
        maxWidth: "1000px",
        px: {
          xs: 1,
          sm: 4,
        },
        py: 2,
        my: { xs: 0, sm: 4 },
        mx: "auto",
        boxShadow: "0 0 10px rgba(0, 0, 0, .1)",
        borderRadius: ".375em",
      }}
    >
      <h1 className="text-xl border-l-[.5em] border-[#6dc965] pl-2 py-1 my-2">
        ダッシュボード
      </h1>
      <Box
        sx={{ display: "flex", columnGap: "1em", alignItems: "center", my: 2 }}
      >
        <Link href={`/users/${activeUser.username}`} className="block w-fit">
          <Image
            src={urlForImage(activeUser.icon_link)}
            width={150}
            height={150}
            alt="ユーザーアイコン"
            priority
            className="rounded-full object-cover w-[50px] h-[50px] sm:w-[100px] sm:h-[100px]"
          />
        </Link>
        <p className="text-center font-bold">
          {activeUser.nickname || activeUser.username}
        </p>
      </Box>
      <p className="mb-4">
        {activeUser.nickname || activeUser.username}
        さんのダッシュボードです。ここでは、 過去30日間 の売上金額 /
        インプレッション数 / フォロワー数の
        {periodType === "daily" ? "推移" : "累計"}を確認できます。
      </p>
      <p className="mb-4 text-sm text-gray-500">
        ※インプレッション数は、ユーザーがコンテンツを見た回数です。 過去30日間の
        {periodType === "daily" ? "日次データ" : "累計値"}を表示しています。
        正確な数値を反映していない場合があります。
      </p>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <Select
            value={periodType}
            onChange={(e) => setPeriodType(e.target.value)}
          >
            <MenuItem value="daily">過去30日間の推移</MenuItem>
            <MenuItem value="total">過去30日間の累計</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: {
            xs: 2,
            sm: 8,
          },
          width: "100%",
          px: 2,
          pb: 2,
          my: 2,
          borderRadius: ".375em",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <p>売上金額</p>
          <p className="text-xl">
            {aggregateWholeCounts(stats.sales).toLocaleString("ja-JP", {
              style: "currency",
              currency: "JPY",
            })}
          </p>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <p>インプレッション数</p>
          <p className="text-xl">
            {aggregateWholeCounts(stats.impressions).toLocaleString("ja-JP")}
          </p>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <p>フォロワー数</p>
          <p className="text-xl">
            {aggregateWholeCounts(stats.followers).toLocaleString("ja-JP")}
          </p>
        </Box>
      </Box>
      <ChartComponent {...formatStats(stats, periodType)} />

      <TableContainer component={Box} sx={{ mt: 8, mb: 4 }}>
        <h2 className="text-xl text-center mb-2">売り上げの詳細</h2>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                width="20%"
                sx={{
                  backgroundColor: "transparent",
                  display: { xs: "none", sm: "table-cell" },
                }}
              ></TableCell>
              <TableCell width="30%" sx={{ backgroundColor: "transparent" }}>
                コンテンツ
              </TableCell>
              <TableCell
                width="20%"
                align="right"
                sx={{ backgroundColor: "transparent" }}
              >
                販売数
              </TableCell>
              <TableCell
                width="30%"
                align="right"
                sx={{ backgroundColor: "transparent" }}
              >
                売上金額&nbsp;(￥)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales &&
              Object.values(sales).map((sale) => (
                <TableRow key={sale[0].product.id} sx={{ height: "100px" }}>
                  <TableCell
                    align="center"
                    sx={{
                      position: "relative",
                      height: "100%",
                      display: { xs: "none", sm: "table-cell" },
                    }}
                  >
                    <Image
                      src={urlForImage(
                        sale[0].product.thumbnail_link,
                        "images"
                      )}
                      width={1920}
                      height={1080}
                      alt="コンテンツ画像"
                      className="inline-block rounded-md object-cover w-[150px] h-[100px]"
                    />
                  </TableCell>
                  <TableCell sx={{ position: "relative", height: "100%" }}>
                    {sale[0].product.name}
                  </TableCell>
                  <TableCell align="right">{sale.length}</TableCell>
                  <TableCell align="right">
                    {(sale[0].purchase_price * sale.length).toLocaleString(
                      "ja-JP",
                      {
                        style: "currency",
                        currency: "JPY",
                      }
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

function formatStats(stats, periodType) {
  let dates;
  let salesData;
  let impressionsData;
  let followersData;

  if (periodType === "total") {
    // 全期間の場合、累計からの推移を計算
    const allDates = [
      ...new Set([
        ...Object.keys(stats.impressions.daily || {}),
        ...Object.keys(stats.followers.daily || {}),
        ...Object.keys(stats.sales.daily || {}),
      ]),
    ].sort();

    // 累計値を初期値として設定
    let totalSales = stats.sales.total || 0;
    let totalImpressions = stats.impressions.total || 0;
    let totalFollowers = stats.followers.total || 0;

    // 日付ごとの累計を計算
    dates = allDates;
    salesData = [];
    impressionsData = [];
    followersData = [];

    dates.forEach((date) => {
      totalSales += stats.sales.daily[date] || 0;
      totalImpressions += stats.impressions.daily[date] || 0;
      totalFollowers += stats.followers.daily[date] || 0;

      salesData.push(totalSales);
      impressionsData.push(totalImpressions);
      followersData.push(totalFollowers);
    });
  } else {
    // 過去30日間の場合、日次データをそのまま使用
    dates = [
      ...new Set([
        ...Object.keys(stats.impressions.daily || {}),
        ...Object.keys(stats.followers.daily || {}),
        ...Object.keys(stats.sales.daily || {}),
      ]),
    ].sort();

    salesData = dates.map((date) => stats.sales.daily[date] || 0);
    impressionsData = dates.map((date) => stats.impressions.daily[date] || 0);
    followersData = dates.map((date) => stats.followers.daily[date] || 0);
  }

  return {
    dateLabels: dates,
    sales: salesData,
    impressions: impressionsData,
    followers: followersData,
  };
}

function ChartComponent({ dateLabels, sales, impressions, followers }) {
  const data = {
    labels: dateLabels,
    datasets: [
      {
        type: "bar", // 棒グラフ
        label: "売上金額",
        data: sales,
        backgroundColor: "rgba(66, 165, 245, .2)",
        borderColor: "rgba(66, 165, 245, 1)",
        borderWidth: 1, // 枠線の太さ
        borderRadius: 5, // 棒グラフの角丸
        maxBarThickness: 50, // 棒グラフの最大幅
        order: 1, // グラフのz-index
        yAxisID: "y", // 左側のY軸
      },
      {
        type: "line", // 線グラフ
        label: "インプレッション数",
        data: impressions,
        borderColor: "rgba(109, 201, 101, 1)", // 緑色
        backgroundColor: "rgba(109, 201, 101, .2)",
        pointStyle: "rectRounded", // ポイントのスタイル
        order: 2, // グラフのz-index
        yAxisID: "y1", // 右側のY軸
      },
      {
        type: "line", // 線グラフ
        label: "フォロワー数",
        data: followers,
        borderColor: "rgba(239, 83, 80, 1)", // 赤色
        backgroundColor: "rgba(239, 83, 80, .2)",
        pointStyle: "triangle", // ポイントのスタイル
        order: 3, // グラフのz-index
        yAxisID: "y1", // 右側のY軸
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4, // グラフの滑らかさ
      },
      point: {
        radius: 7, // ポイントの大きさ
        hoverRadius: 10, // ホバー時のポイントの大きさ
      },
    },
    plugins: {
      legend: {
        position: "top", // 凡例の位置
        labels: {
          usePointStyle: true, // ポイントのスタイルを使用
          font: {
            size: 14, // フォントサイズ
            family: "monospace", // フォントファミリー
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "日付",
        },
      },
      y: {
        title: {
          display: true,
          text: "売上金額（累計）",
          font: {
            family: "monospace",
          },
        },
        position: "left",
      },
      y1: {
        title: {
          display: true,
          text: "インプレッション数・フォロワー数（累計）",
          font: {
            family: "monospace",
          },
        },
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    onHover: function (e, el) {
      if (!el || el.length === 0) {
        document.getElementById("chart").style.cursor = "default";
      } else {
        document.getElementById("chart").style.cursor = "pointer";
      }
    },
  };

  const plugin = {
    beforeInit(chart) {
      const originalFit = chart.legend.fit;
      chart.legend.fit = function () {
        originalFit.call(this);
        this.height += 20;
      };
    },
  };

  return (
    <div className="my-4 w-full h-[500px]">
      <Chart
        type="bar"
        data={data}
        options={options}
        plugins={[plugin]}
        id="chart"
      />
    </div>
  );
}

export default page;
