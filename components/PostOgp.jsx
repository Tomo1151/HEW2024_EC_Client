"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function PostOgp({ urls }) {
  const [ogpData, setOgpData] = useState({});

  // route handlerを経由してOGPをjsonで受け取る
  async function getOgp(url) {
    const response = await fetch(`/api/ogp?url=${url}`);
    const text = await response.text();
    const jsonOgp = JSON.parse(text);
    setOgpData(jsonOgp);
  }

  useEffect(() => {
    getOgp(urls);
  }, [urls]);

  return (
    <div className="relative p-2">
      {ogpData.url && (
        <Link
          href={ogpData.url}
          className="absolute inset-0 w-full h-full z-[10] pointer-events-auto bg-white"
        />
      )}
      {ogpData && (
        <div className="relative bg-white py-2 sm:border border-[#e0e0e0] rounded-xl flex sm:p-4 sm:hover:brightness-[.95] duration-200">
          <div className="w-[7.5em] sm:w-[150px] mr-[.5em]">
            {ogpData.image && <img src={ogpData.image} alt={ogpData.title} />}
          </div>
          <div className="w-8/12 ml-0 sm:ml-3 grow">
            {ogpData.title && <h1>{ogpData.title}</h1>}
            {ogpData.description && (
              <div className="relative text-[1em] ml-1 opacity-35">
                {ogpData.description}
              </div>
            )}

            {ogpData.url && (
              <div className="text-[1em] opacity-35">{ogpData.url}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
