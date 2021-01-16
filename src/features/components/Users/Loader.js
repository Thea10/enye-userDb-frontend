import React, { useState, useEffect, useRef } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";


const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  const progressRef = useRef(() => {});
  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="loader">
      {[1, 2, 3].map((i) => {
        return (
          <LinearProgress
            variant="buffer"
            key={i}
            value={progress}
            valueBuffer={buffer}
            color="secondary"
            style={{margin: "1rem 0"}}
          
          />
        );
      })}
    </div>
  );
};

export default Loader;
