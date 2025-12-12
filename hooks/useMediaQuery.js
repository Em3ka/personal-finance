import { useEffect, useState } from "react";

/**
 * React hook that returns whether the current viewport matches a given CSS media query.
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 *
 * if (isMobile) {
 *   console.log("User is on a mobile device!");
 * }
 *
 * @param {string} breakpoint - A valid CSS media query string (e.g. "(max-width: 768px)").
 * @returns {boolean} `true` if the viewport matches the media query, otherwise `false`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries
 */
export function useMediaQuery(breakpoint) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(breakpoint).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(breakpoint);
    const handleChange = (e) => setIsMobile(e.matches);

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [breakpoint]);

  return isMobile;
}
