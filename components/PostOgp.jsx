"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function PostOgp({ url }) {
  const [ogpData, setOgpData] = useState({});

  // route handlerを経由してOGPをjsonで受け取る
  async function getOgp(url) {
    try {
      const response = await fetch(`/api/ogp?url=${url}`);
      const text = await response.text();
      const jsonOgp = JSON.parse(text);
      setOgpData(jsonOgp);
    } catch (error) {
      setOgpData({});
    }
  }

  useEffect(() => {
    getOgp(url);
  }, [url]);

  if (!ogpData || Object.keys(ogpData).length === 0) return null;

  return (
    <div className="relative bg-white mt-4 hover:brightness-[.95] duration-200 z-10 rounded-xl">
      {url && (
        <Link
          href={url}
          className="absolute inset-0 w-full h-full z-10 pointer-events-auto"
          target="_blank"
          rel="noopener noreferrer"
        />
      )}
      <div
        className={`relative bg-white py-2 sm:border border-[#e0e0e0] rounded-xl flex ${ogpData.card === "summary_large_image" ? "flex-col" : ""} sm:p-4 sm:hover:brightness-[.95] duration-200`}
      >
        <div
          className={`${
            ogpData.card === "summary_large_image"
              ? "w-full mb-3"
              : "w-[5em] h-[5em] sm:w-[120px] sm:h-[120px] mr-[.5em]"
          } shrink-0`}
        >
          {ogpData.image && (
            <img
              src={ogpData.image}
              alt={ogpData.title}
              className={`object-cover w-full h-full ${ogpData.card === "summary_large_image" ? "rounded-t-md" : "rounded-md"}`}
            />
          )}
        </div>
        <div
          className={`${ogpData.card === "summary_large_image" ? "w-full" : "w-8/12 ml-0 sm:ml-3"} grow min-w-0`}
        >
          {ogpData.title && (
            <h1
              className={`${ogpData.card === "summary_large_image" ? "text-base sm:text-lg font-bold" : "text-sm sm:text-base"} truncate`}
            >
              {ogpData.title}
            </h1>
          )}
          {ogpData.description && (
            <div className="relative text-xs sm:text-sm ml-1 opacity-35 line-clamp-2 overflow-hidden">
              {ogpData.description}
            </div>
          )}
          {ogpData.url && (
            <div className="text-xs sm:text-sm opacity-35 truncate">
              {ogpData.url}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
