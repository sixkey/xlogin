import { useEffect } from "react";
import { getStaticPath } from "./paths";

const useScript = (url) => {
    useEffect(() => {
        const script = document.createElement("script");

        script.src = getStaticPath(url);
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [url]);
};

export default useScript;
