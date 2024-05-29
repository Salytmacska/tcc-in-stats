import { useColorMode } from "@docusaurus/theme-common";
import { useEffect, useState } from "react";

// Based on: https://stackoverflow.com/a/76394484
// Note that this currently fires twice (once with the old value) per theme change
const useDelayedColorMode = () => {
    const colorMode = useColorMode();
    const [delayedColorMode, setDelayedColorMode] = useState(colorMode);
  
    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setDelayedColorMode(colorMode);
        });
  
        return () => clearTimeout(timeoutID);
    }, [colorMode]);
  
    return delayedColorMode;
};

export default useDelayedColorMode;
