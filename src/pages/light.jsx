import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Light() {
  const spaceRef = useRef(null);
  const perspectiveRef = useRef(100); // 初始透视值
  const perspectiveStep = 10; // 滚轮每次滚动的透视变化量
  const minPerspective = 30; // 最小透视值
  useEffect(() => {
    // 获取空间元素
    const space = document.getElementById("space");

    // 设置视口尺寸
    function setSpaceSize() {
      const viewportWidth = window.innerWidth - 56;
      const viewportHeight = window.innerHeight - 100;
      space.style.width = `${viewportWidth}px`;
      space.style.height = `${viewportHeight}px`;
      const maxPerspective = window.innerHeight - 100; // 最大透视值

      const perspective = 80;
      space.style.setProperty("--perspective", `${perspective}px`);

      const visibleRangeMaximum =
        (viewportWidth > viewportHeight ? viewportWidth : viewportHeight) / 2;

      function makeStar() {
        const star = document.createElement("time"),
          starWidth = gsap.utils.random(4, 10, 1),
          starHeight = starWidth * gsap.utils.random(30, 50, 1),
          randomRotation = Math.random() * 360,
          scaleModifier = Math.random();

        gsap.set(star, {
          width: `${starWidth}px`,
          height: `${starHeight}px`,
          opacity: Math.random(0.1, 0.8, 1),
          transform: `
          translateY(${starHeight / 2}px)
          rotate(${randomRotation}deg)
          rotateX(90deg)
          translateZ(0px)
          scaleX(${scaleModifier})
        `,
        });
        gsap
          .to(star, {
            duration: gsap.utils.random(5, 20),
            transform: `
          translateY(${starHeight / 2}px)
          rotate(${randomRotation}deg)
          rotateX(90deg)
          translateZ(${perspectiveRef.current + visibleRangeMaximum}px)
          scaleX(${scaleModifier})
        `,
            repeat: -1,
            ease: "none",
          })
          .progress(Math.random());

        space.appendChild(star);
      }
      function handleMouseWheel(event) {
        if (event.deltaY > 0) {
          // 向下滚动
          perspectiveRef.current += perspectiveStep;
        } else {
          // 向上滚动
          perspectiveRef.current -= perspectiveStep + 30; // 减小透视值
        }
        perspectiveRef.current = Math.max(
          minPerspective,
          Math.min(maxPerspective, perspectiveRef.current)
        );

        // 更新透视值
        space.style.setProperty("--perspective", `${perspectiveRef.current}px`);
      }

      window.addEventListener("wheel", handleMouseWheel);
      for (let i = 0; i < 120; i++) {
        makeStar();
      }
    }

    // 初始化视口尺寸
    setSpaceSize();

    // 当窗口大小改变时更新视口尺寸
    window.addEventListener("resize", setSpaceSize);
  }, []);

  return <div id="space" ref={spaceRef}></div>;
}
