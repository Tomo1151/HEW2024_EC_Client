"use client";

import Image from "next/image";
import Link from "next/link";

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

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  elements,
} from "chart.js";
import { Chart } from "react-chartjs-2";

import { useUserContext } from "@/context/UserContext";
import { urlForImage } from "@/utils/utils";
import CircularLoading from "@/components/loading/CircularLoading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const page = () => {
  const { activeUser } = useUserContext();

  if (activeUser === null) {
    return <CircularLoading />;
  }

  return (
    <Container
      sx={{
        backgroundColor: "#fafafa",
        maxWidth: "1000px",
        px: {
          xs: 1,
          sm: 4,
        },
        py: 2,
        mx: "auto",
      }}
    >
      <h1 className="text-xl border-l-[.5em] border-[#6dc965] pl-2 py-1 my-2">
        ダッシュボード
      </h1>
      <Box
        sx={{ display: "flex", columnGap: "1em", alignItems: "center", my: 2 }}
      >
        <Link href={`/users/${activeUser?.username}`} className="block w-fit">
          <Image
            src={urlForImage(activeUser?.icon_link)}
            width={150}
            height={150}
            alt="ユーザーアイコン"
            priority
            className="rounded-full object-cover w-[100px] h-[100px]"
          />
        </Link>
        <p className="text-center font-bold">{activeUser?.nickname}</p>
      </Box>
      <p className="mb-4">
        {activeUser?.nickname}
        さんのダッシュボードです。ここでは、売上金額、インプレッション数、フォロワー数の推移を確認できます。
      </p>
      <p className="text-xl text-center mt-8">過去30日間の統計</p>
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
          <p className="text-xl">￥1,000</p>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <p>インプレッション数</p>
          <p className="text-xl">1,200</p>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <p>フォロワー数</p>
          <p className="text-xl">100</p>
        </Box>
      </Box>
      <ChartComponent />

      <TableContainer component={Box} sx={{ mt: 8, mb: 4 }}>
        <h2 className="text-xl text-center mb-2">売り上げの詳細</h2>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell width="50%" sx={{ backgroundColor: "transparent" }}>
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
            <TableRow sx={{ height: "100px" }}>
              <TableCell sx={{ position: "relative", height: "100%" }}>
                <Box
                  sx={{
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    inset: 0,
                    columnGap: 2,
                    p: 1,
                  }}
                >
                  <Image
                    src={`http://localhost:3000/media/images/6ff98699-f277-4247-a516-74f99ba3feb8-disks.png`}
                    width={1920}
                    height={1080}
                    alt="商品A"
                    className="hidden sm:block w-[100px] h-4/5 object-cover rounded"
                  />
                  <p className="grow">【テスト出品】 商品_1</p>
                </Box>
              </TableCell>
              <TableCell align="right">10</TableCell>
              <TableCell align="right">￥1,000</TableCell>
            </TableRow>
            <TableRow sx={{ height: "100px" }}>
              <TableCell sx={{ position: "relative", height: "100%" }}>
                <Box
                  sx={{
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    inset: 0,
                    columnGap: 2,
                    p: 1,
                  }}
                >
                  <Image
                    src={`http://localhost:3000/media/images/ba68b7a9-0c71-46d4-8137-4209a27fb7cb-P1030444__.jpg`}
                    width={1920}
                    height={1080}
                    alt="商品A"
                    className="hidden sm:block w-[100px] h-4/5 object-cover rounded"
                  />
                  <p className="grow">きれいなお月さま</p>
                </Box>
              </TableCell>
              <TableCell align="right">10</TableCell>
              <TableCell align="right">￥1,000</TableCell>
            </TableRow>
            <TableRow sx={{ height: "100px" }}>
              <TableCell sx={{ position: "relative", height: "100%" }}>
                <Box
                  sx={{
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    inset: 0,
                    columnGap: 2,
                    p: 1,
                  }}
                >
                  <Image
                    src={`http://localhost:3000/media/images/cdea38a8-f424-49c5-8cf7-18642a06bdaa-result_a.png`}
                    width={1920}
                    height={1080}
                    alt="商品A"
                    className="hidden sm:block w-[100px] h-4/5 object-cover rounded"
                  />
                  <p className="grow">【テスト出品】商品名～</p>
                </Box>
              </TableCell>
              <TableCell align="right">10</TableCell>
              <TableCell align="right">￥1,000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

function ChartComponent({}) {
  const data = {
    labels: [
      "2025-01-01",
      "2025-01-08",
      "2025-01-15",
      "2025-01-22",
      "2025-01-29",
      "2025-02-05",
      "2025-02-12",
    ], // X軸の日付
    datasets: [
      {
        type: "line", // 線グラフ
        label: "インプレッション数",
        data: [1500, 1800, 1400, 2000, 1700, 1600, 1900],
        borderColor: "rgba(109, 201, 101, 1)", // 緑色
        backgroundColor: "rgba(109, 201, 101, .2)",
        pointStyle: "rectRounded", // ポイントのスタイル
        yAxisID: "y1", // 右側のY軸
      },
      {
        type: "line", // 線グラフ
        label: "フォロワー数",
        data: [50, 60, 55, 70, 65, 70, 75],
        borderColor: "rgba(239, 83, 80, 1)", // 赤色
        backgroundColor: "rgba(239, 83, 80, .2)",
        pointStyle: "triangle", // ポイントのスタイル
        yAxisID: "y1", // 右側のY軸
      },
      {
        type: "bar", // 棒グラフ
        label: "売上金額",
        data: [100, 120, 90, 150, 130, 110, 140],
        borderColor: "rgba(66, 165, 245, 1)", // 青色
        backgroundColor: "rgba(66, 165, 245, .2)",
        borderWidth: 3, // 枠線の太さ
        borderRadius: 10, // 棒グラフの角丸
        yAxisID: "y", // 左側のY軸
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
          text: "売上金額",
          font: {
            family: "monospace",
          },
        },
        position: "left",
      },
      y1: {
        title: {
          display: true,
          text: "インプレッション数・フォロワー数",
          font: {
            family: "monospace",
          },
        },
        position: "right",
        grid: {
          drawOnChartArea: false, // y軸1のグリッドを重ねない
        },
      },
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
      <Chart type="bar" data={data} options={options} plugins={[plugin]} />
    </div>
  );
}

export default page;
