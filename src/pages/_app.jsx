import Link from "next/link";
import "../styles/global.css";
import "@/styles/light.css";
import "@/styles/wormhole.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as React from "react";
import { p5background } from "../components/background";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [path, setPath] = useState("/");
  useEffect(() => {
    setPath(router.asPath);
  }, [router]);
  return (
    <>
      <div className="nav">
        {links.map((link) => {
          return (
            <Link key={link.href} href={link.href}>
              <span className={path === link.href ? "link-active" : ""}>
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
      <Component {...pageProps} />
      {path === "/wormhole" && (
        <div
          style={{ width: "100%", height: "1000px", background: "#3799e970" }}
        ></div>
      )}
      <div
        style={{
          zIndex: "-1",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <NextReactP5Wrapper sketch={p5background} />
      </div>
    </>
  );
}

const links = [
  { href: "/", label: "Text" },
  { href: "/paint", label: "paint" },
  { href: "/light", label: "light" },
  { href: "/wormhole", label: "wormhole" },
];
