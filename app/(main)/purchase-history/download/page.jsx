"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import MainColumnHeader from "@/components/MainColumnHeader";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { Suspense, useEffect, useState } from "react";
import { fetchHeaders } from "@/config/fetchConfig";
import { formatDataSize } from "@/utils/formatDataSize";
import CircularLoading from "@/components/loading/CircularLoading";

const DownloadPage = () => {
  return (
    <Suspense loading={<CircularLoading />}>
      <DownloadPageContainer />
    </Suspense>
  );
};

const DownloadPageContainer = () => {
  const params = useSearchParams().get("id");

  const [isGenerating, setIsGenerating] = useState(false);
  const [productId, setProductId] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [downloadName, setDownloadName] = useState(null);
  const [downloadSize, setDownloadSize] = useState(null);

  const generateDownloadLink = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_FETCH_BASE_URL +
          `/products/${productId}/download`,
        {
          headers: fetchHeaders,
          credentials: "include",
        }
      );

      const resJson = await response.json();

      if (resJson.success) {
        setDownloadLink(resJson.data.url);
        setDownloadName(resJson.data.blobName);
        setDownloadSize(resJson.data.blobSize);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    setProductId(params);
    // console.log(params.id);
  }, [params]);

  if (!params) {
    return (
      <>
        <MainColumnHeader>
          <h3 className="font-bold tracking-wider">ダウンロードページ</h3>
        </MainColumnHeader>
        <CircularLoading />
      </>
    );
  }

  return (
    <>
      <MainColumnHeader>
        <h3 className="font-bold tracking-wider">ダウンロードページ</h3>
      </MainColumnHeader>

      <Box sx={{ px: 4, py: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <DownloadRoundedIcon sx={{ fontSize: 32, mr: 2 }} />
          <h2 className="text-2xl font-bold">ダウンロードページ</h2>
        </Box>
        <p className="text-gray-500 mt-4">
          商品をダウンロードリンクを生成します。
        </p>
        <p className="text-gray-500">このダウンロードリンクは7日間有効です。</p>

        <LoadingButton
          variant="outlined"
          sx={{ mt: 4 }}
          onClick={generateDownloadLink}
          disabled={downloadLink}
          loading={isGenerating}
        >
          ダウンロードリンクを生成する
        </LoadingButton>

        {isGenerating && <CircularLoading />}

        {downloadLink && (
          <>
            <Box sx={{ display: "flex", flexDirection: "column", my: 4 }}>
              <p className="text-gray-500 mt-4">ファイル名: {downloadName}</p>
              <p className="text-gray-500">
                ファイルサイズ: {formatDataSize(downloadSize)}
              </p>
            </Box>
            <Link href={downloadLink} className="text-blue-500 hover:underline">
              ダウンロード
            </Link>
          </>
        )}
      </Box>
    </>
  );
};

export default DownloadPage;
