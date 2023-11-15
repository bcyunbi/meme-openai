import { useEffect, useRef, useState } from "react";

const DEPTH = 800;
const WORMHOLE_HEIGHT = 3500;
const ADDITIONAL_DEPTH = WORMHOLE_HEIGHT * 0.1;
const observerOptions = {
  root: null,
  rootMargin: "0px",
};
export default function WormholeSteps({ stepList, title, content }) {
  const wormhole = useRef(null);
  const contentDiv = useRef(null);
  const lastContent = useRef(null);
  const wormholeMain = useRef(null);
  const [steps, setSteps] = useState(stepList);

  useEffect(() => {
    const contentEle = contentDiv.current;
    const innerText = contentEle.innerText.split("").length;
    const area = contentEle.clientHeight * contentEle.clientWidth;
    const rate = Math.sqrt(area / innerText) || 1;
    const size = 100 / (contentEle.clientWidth.width / rate);
    contentEle.style.setProperty(
      "font-size",
      Math.max(Math.min(size, 12), 3) + "vw"
    );
  }, []);

  useEffect(() => {
    wormhole.current.style.setProperty("--depth", `${DEPTH}px`);
    lastContent.current.style.setProperty("--offset", `-${DEPTH}px`);

    setSteps((prev) => {
      const result = prev.map((step, index) => {
        const offset = Math.round((DEPTH / 6) * (index + 1) - 1.25);
        step.offset = -offset;
        return step;
      });
      return result;
    });
  }, []);

  useEffect(() => {
    const observerCallback = (entries) => {
      let observerFuc;

      entries.forEach((entry) => {
        if (entry.isIntersecting)
          observerFuc = requestAnimationFrame(() => observerCallback(entries));
        else cancelAnimationFrame(observerFuc);

        if (wormhole.current.clientHeight) {
          const scrollY = window.scrollY;
          const ratio = Math.min(
            (scrollY - wormholeMain.current.offsetTop - ADDITIONAL_DEPTH) /
              (WORMHOLE_HEIGHT -
                (contentDiv.current.clientHeight + ADDITIONAL_DEPTH)),
            1
          );
          let newPosition = Math.min(
            ratio * (DEPTH + contentDiv.current.clientHeight),
            DEPTH
          );

          wormhole.current.style.setProperty(
            "--position",
            `translateZ(${newPosition}px)`
          );
        }
      });
    };

    const intersectionObserver = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (wormhole.current) intersectionObserver.observe(wormhole.current);

    return () => {
      if (wormhole.current) intersectionObserver.unobserve(wormhole.current);
    };
  }, []);

  return (
    <section
      ref={wormhole}
      id="wormhole"
      className="wormhole"
      style={{ height: `${WORMHOLE_HEIGHT}px` }}
    >
      <div className="wormhole-inner">
        <div className="wormhole-main p-fill" ref={wormholeMain}>
          <div className="wormhole-step">
            <span className="wormhole-step__content wormhole-step__title wormhole-step__text t-h-0 cr-white">
              {title}
            </span>
          </div>
          {steps.length > 0 &&
            steps.map((item) => {
              return (
                <div
                  className="wormhole-step"
                  style={{ "--offset": `${item.offset}px` }}
                  key={item.text}
                >
                  <p className="wormhole-step__content wormhole-step__text t-h-0 cr-black t-stroke">
                    {item.text}
                  </p>
                </div>
              );
            })}
          <div className="wormhole-step" ref={lastContent}>
            <div
              className="wormhole-step__content wormhole-step__content__full t-h-1 cr-black t-stroke"
              ref={contentDiv}
            >
              {content}
            </div>
          </div>
          {["top", "right", "bottom", "left"].map((direction) => {
            return (
              <div
                className={`wormhole-wall wormhole-wall__${direction}`}
                style={{ "--depth": `${DEPTH}px` }}
                key={direction}
              ></div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
