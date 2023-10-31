import { useEffect, useRef, useState } from "react";

const DEPTH = 800;

export default function Wormhole({ services, content }) {
  const l = useRef(null);
  const wormhole = useRef(null);
  const contentDiv = useRef(null);
  const [steps, setSteps] = useState([
    { text: "Content Production", offset: 0 },
    { text: "Art Direction", offset: 0 },
    { text: "Responsive Design", offset: 0 },
    { text: "Development", offset: 0 },
    { text: "Conversion", offset: 0 },
  ]);
  const last = useRef(null);
  // useEffect(() => {
  //   l.current = l.current.slice(0, e.images.length);
  // }, []);
  const [translateZ, setTranslateZ] = useState(0);

  useEffect(() => {
    wormhole.current.style.setProperty("--depth", "800px");

    setSteps((prev) => {
      const result = prev.map((step, index) => {
        const offset = Math.round((DEPTH / 6) * (index + 1) - 1.25);
        step.offset = -offset;
        return step;
      });
      return result;
    });

    // const handleScroll = () => {
    //   const scrollY = window.scrollY;
    //   const contentEle = contentDiv.current;
    //   const ratio = Math.min(
    //     (scrollY - contentEle.offsetTop - 350) /
    //       (3500 - contentEle.clientHeight - 350),
    //     1
    //   );
    //   const newTranslateZ = Math.min(ratio * DEPTH, DEPTH); // 最大值为 800
    //   wormhole.current.style.setProperty(
    //     "--position",
    //     `translateZ(${newTranslateZ}px)`
    //   );

    //   setTranslateZ(newTranslateZ);
    // };

    // handleScroll();
    // // 添加滚动事件监听器
    // window.addEventListener("scroll", handleScroll);

    // // 在组件卸载时移除事件监听器
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        let s;
        if (entry.isIntersecting) {
          s = requestAnimationFrame(() => observerCallback(entries));
        } else {
          cancelAnimationFrame(s);
        }

        if (wormhole.current.clientHeight) {
          const scrollY = window.scrollY;
          const ratio = Math.min(
            (scrollY - wormhole.current.offsetTop - 350) /
              (3500 - contentDiv.current.clientHeight - 350),
            1
          );
          const newPosition = Math.min(
            ratio * window.innerWidth,
            window.innerWidth
          );
          wormhole.current.style.setProperty(
            "--position",
            `translateZ(${newPosition}px)`
          );
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px",
    };

    const intersectionObserver = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (wormhole.current) {
      intersectionObserver.observe(wormhole.current);
    }

    return () => {
      if (wormhole.current) {
        intersectionObserver.unobserve(wormhole.current);
      }
    };
  }, []);

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

  return (
    <section
      ref={wormhole}
      id="wormhole"
      className="wormhole"
      style={{ height: "3500px" }}
    >
      <div className="wormhole-inner">
        <div className="wormhole-main p-fill">
          <div className="wormhole-step" ref={last}>
            <span className="wormhole-step__content wormhole-step__title wormhole-step__text t-h-0 cr-white">
              Our services
            </span>
          </div>
          {steps.length > 0 &&
            steps.map((item) => {
              return (
                <div
                  className="wormhole-step"
                  style={{ "--offset": item.offset + "px" }}
                  key={item.text}
                >
                  <p className="wormhole-step__content wormhole-step__text t-h-0 cr-black t-stroke">
                    {item.text}
                  </p>
                </div>
              );
            })}
          <div className="wormhole-step" style={{ "--offset": "-800px" }}>
            <div
              className="wormhole-step__content wormhole-step__content__full t-h-1 cr-black t-stroke"
              ref={contentDiv}
            >
              <p>
                In collaboration with Better Booch we developed the art
                direction for their relaunch including a bouquet of ingredient
                illustrations, new photography and a design focused on their
                distinct flavors and conversion. The e-commerce store was even
                featured on
                <a
                  href="https://www.shopify.com/blog/subscription-case-study-better-booch"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shopify's blog
                </a>
                as a fantastic performer, specifically with its subscription
                flow.
              </p>
            </div>
          </div>
          {["top", "right", "bottom", "left"].map((direction) => {
            return (
              <div
                className={`wormhole-wall wormhole-wall__${direction}`}
                style={{ "--depth": `${DEPTH}px` }}
              ></div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
