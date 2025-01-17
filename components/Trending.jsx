"use client";

import { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import Link from "next/link";
import { countFormat } from "@/utils/countFormat";

const Trending = () => {
  const [isDataFetching, setIsDataFetching] = useState(false);
  const [trendTags, setTrendTags] = useState([]);
  const [trendProducts, setTrendProducts] = useState([]);

  const doFontKerning = (strings) => {
    const brackets = [
      "（",
      "）",
      "〈",
      "〉",
      "《",
      "》",
      "「",
      "」",
      "『",
      "』",
      "【",
      "】",
      "〔",
      "〕",
      "〖",
      "〗",
      "〘",
      "〙",
      "〚",
      "〛",
      "〝",
      "〞",
    ];
    return brackets.some((bracket) => strings.startsWith(bracket));
  };

  const fetchTrends = async () => {
    setIsDataFetching(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/trendings",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const resJson = await response.json();

      if (resJson.success) {
        setTrendTags(resJson.data.tags);
        setTrendProducts(resJson.data.products);
      }
    } catch (error) {
      console.error(error);
    }
    setIsDataFetching(false);
  };

  useEffect(() => {
    (async () => {
      fetchTrends();
    })();
  }, []);

  if (trendTags.length === 0 && trendProducts.length === 0) {
    return (
      <>
        <Box
          sx={{
            backgroundColor: "white",
            border: "1px solid #cdcdcd",
            borderRadius: ".5em",
            mt: 4,
          }}
        >
          <h3 className="text-[1.15em] pt-4 pb-2 px-4">人気のタグ</h3>
          {[1, 2, 3].map((i) => (
            <Box
              key={i}
              sx={{
                // backgroundColor: "white",
                position: "relative",
                width: "100%",
                fontSize: "1em",
                borderRadius: ".25em",
                px: "1em",
                py: ".5em",
                marginBottom: ".5em",
              }}
            >
              <Skeleton variant="text" animation="wave" height="2em" />
              <Skeleton
                variant="text"
                animation="wave"
                width="5em"
                height="1em"
              />
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            border: "1px solid #cdcdcd",
            borderRadius: ".5em",
            mt: 4,
          }}
        >
          <h3 className="text-[1.15em] pt-4 pb-2 px-4">人気の商品</h3>
          {[1, 2, 3].map((i) => (
            <Box
              key={i}
              sx={{
                // backgroundColor: "white",
                position: "relative",
                width: "100%",
                fontSize: "1em",
                borderRadius: ".25em",
                px: "1em",
                py: ".5em",
                marginBottom: ".5em",
              }}
            >
              <Skeleton
                variant="text"
                animation="wave"
                width="5em"
                height="1em"
              />
              <Skeleton variant="text" animation="wave" height="2em" />
              <Skeleton
                variant="text"
                animation="wave"
                width="5em"
                height="1em"
              />
            </Box>
          ))}
        </Box>
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          border: "1px solid #cdcdcd",
          borderRadius: ".5em",
          mt: 4,
        }}
      >
        <h3 className="text-[1.15em] pt-4 pb-2 px-4">人気のタグ</h3>
        {trendTags.map((tag) => (
          <Box
            key={tag.name}
            sx={{
              backgroundColor: "white",
              position: "relative",
              width: "100%",
              fontSize: "1em",
              borderRadius: ".25em",
              px: "1em",
              textIndent: doFontKerning(tag.name) ? "-.5em" : "0",
              py: ".5em",
              marginBottom: ".5em",
            }}
            className="hover:brightness-[.95] duration-200"
          >
            <a
              href={`/search?q=${tag.name}&src=tag_click`}
              className="absolute inset-0 w-full h-full z-10"
            ></a>
            <h4>{tag.name}</h4>
            <span className="text-[.75em] opacity-75">
              {countFormat(tag._count.tagged_posts || 0)}件の投稿
            </span>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          border: "1px solid #cdcdcd",
          borderRadius: ".5em",
          mt: 4,
        }}
      >
        <h3 className="text-[1.15em] pt-4 pb-2 px-4">人気の商品</h3>
        {trendProducts.map((product) => (
          <Box
            key={product.post.id}
            sx={{
              position: "relative",
              backgroundColor: "white",
              width: "100%",
              fontFeatureSettings: '"palt"',
              fontKerning: "normal",
              borderRadius: ".25em",
              px: "1em",
              textIndent: doFontKerning(product.name) ? "-.5em" : "0",
              py: ".5em",
              marginBottom: ".5em",
            }}
            className="hover:brightness-[.95] duration-200"
          >
            <Link
              href={`/posts/${product.post.id}`}
              className="absolute inset-0 w-full h-full z-10"
            ></Link>
            <p className="text-[.75em] indent-0 opacity-75">
              {product.post.author.nickname || product.post.author.username}
              さんの商品
            </p>
            <h4>{product.name}</h4>
            <span className="text-[.75em] opacity-75">
              {countFormat(product._count.Purchase || 0)}件の購入
            </span>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Trending;
