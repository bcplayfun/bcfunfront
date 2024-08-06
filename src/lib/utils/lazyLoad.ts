const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};

export function lazyLoad(image: HTMLImageElement, src: string) {
  let observer: IntersectionObserver | undefined;
  const loaded = () => {
    image.style.opacity = "1";
    image.dispatchEvent(new CustomEvent("loaded"));
  };
  const observeImage = () => {
    if (!observer) {
      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          image.src = src;
          if (image.complete) {
            loaded();
          } else {
            image.addEventListener("load", loaded);
          }
        }
      }, options);
    }
    observer.observe(image);
  };
  const unobserveImage = () => {
    if (observer) {
      observer.unobserve(image);
      observer = undefined;
    }
  };
  observeImage();
  return {
    update(newSrc: string) {
      unobserveImage();
      src = newSrc;
      observeImage();
    },
    destroy() {
      image.removeEventListener("load", loaded);
    },
  };
}
