"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function PostOgp({ urls }) {
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
    getOgp(urls);
  }, [urls]);

  if (!ogpData || Object.keys(ogpData).length === 0) return null;

  return (
    <div className="relative bg-white hover:brightness-[.95] duration-200 rounded">
      {ogpData.url && (
        <Link
          href={ogpData.url}
          className="absolute inset-0 w-full h-full z-10 pointer-events-auto"
          target="_blank"
          rel="noopener noreferrer"
        />
      )}
      <div className="relative bg-white py-2 sm:border border-[#e0e0e0] rounded flex sm:p-4 sm:hover:brightness-[.95] duration-200">
        <div className="w-[5em] h-[5em] sm:w-[128px] sm:h-[86px] mr-[.5em] shrink-0">
          {ogpData.image && (
            <img
              src={ogpData.image}
              alt={ogpData.title}
              className="rounded-sm object-cover w-full h-full"
            />
          )}
        </div>
        <div className="w-8/12 ml-0 sm:ml-3 grow min-w-0">
          {ogpData.title && (
            <h1 className="truncate text-sm sm:text-base">{ogpData.title}</h1>
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
