import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});

const AnimationLottie = ({ animationPath, width }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationPath,
    style: {
      width: '95%',
    }
  };

  if (!isMounted) {
    return <div style={{ width: '95%', height: '200px' }} />; // Placeholder
  }

  return (
    <Lottie {...defaultOptions} />
  );
};

export default AnimationLottie;