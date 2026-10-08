import { useEffect } from 'react';

function useViewportHover(selector) {
  useEffect(() => {
    if (!window.matchMedia('(hover: none) and (max-width: 780px)').matches) {
      return undefined;
    }

    const elements = document.querySelectorAll(selector);

    if (!('IntersectionObserver' in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [selector]);
}

export default useViewportHover;
