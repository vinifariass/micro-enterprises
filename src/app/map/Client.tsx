"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("./view"), { ssr: false });

export default function MapClientWrapper() {
  return <MapClient />;
}

