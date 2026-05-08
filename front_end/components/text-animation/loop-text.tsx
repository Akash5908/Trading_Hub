"use client";
import { useState, useEffect } from "react";
import { TextEffect } from "../motion-primitives/text-effect";

export function LoopText({
  value,
  className,
}: {
  value: string;
  className: string;
}) {
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrigger((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  const blurSlideVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.02 },
      },
      exit: {
        transition: { staggerChildren: 0.02, staggerDirection: 1 },
      },
    },
    item: {
      hidden: {
        opacity: 0,
        filter: "blur(10px) brightness(0%)",
        y: 0,
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px) brightness(100%)",
        transition: {
          duration: 0.8,
        },
      },
      exit: {
        opacity: 0,
        y: 0,
        filter: "blur(10px) brightness(0%)",
        transition: {
          duration: 0.8,
        },
      },
    },
  };

  return (
    <TextEffect
      className={`${className}`}
      per="char"
      variants={blurSlideVariants}
      trigger={trigger}
    >
      {value}
    </TextEffect>
  );
}
