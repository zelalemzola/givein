"use client";
import { useEffect, useState } from "react";
import  Player  from "lottie-react";
import { loadTgs } from "@/utils/loadTgs";

export default function Sticker({ src }: { src: string }) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    loadTgs(src).then(setAnimationData);
  }, [src]);

  if (!animationData) return <div>Loading...</div>;

  return (
    <div className="w-84 h-84">
      <Player
        autoplay
        loop
        animationData={animationData}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}