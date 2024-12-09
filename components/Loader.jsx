import { useEffect, useRef } from "react";
import gsap from "gsap";

function Loader() {
  const loading = useRef(null);
  const counter = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    tl.to(".counter3", { y: -2600, duration: 5 })
      .to(
        ".counter2",
        { y: -1300, duration: 3, delay: 2 },
        "<" // Position argument
      )
      .to(".counter1", { y: -130, duration: 1 }, "-=1");

    gsap.from(".loader1", { width: 0, duration: 6 });
    gsap.from(".loader2", { width: 0, ease: "power2.inOut", duration: 7 }, "<");

    gsap.to(".digit", {
      top: -150,
      duration: 1,
      stagger: 0.15,
      delay: 5,
      ease: "expo.inOut",
    });
    gsap.to(".loader", {
      background: "none",
      delay: 6,
      duration: 0.1,
    });
    gsap.to(".loader1", {
      rotate: 90,
      y: -50,
      duration: 0.5,
      delay: 6,
    });
    gsap.to(".loader2", { x: -68, y: 53, duration: 0.5 }, "<");
    gsap.to(".loader", { scale: 50, duration: 1, ease: "power3.inOut" }, ">");
    gsap.to(
      ".loader",
      {
        rotate: 45,
        y: 500,
        x: 2000,
        duration: 1,
        ease: "power2.inOut",
      },
      "<"
    );
  }, []);

  useEffect(() => {
    gsap.to(".loadings", {
      opacity: 0,
      delay: 7,
      duration: 0.2,
      ease: "power3.inOut",
    });
    gsap.to(".wrapper", { opacity: 1 }, "<");
    gsap.from(".menu", { y: -80, ease: "power3", duration: 1 }, "<");
    gsap.from(".reveal", { y: 80, ease: "power4", duration: 1 }, "<");
  }, []);

  return (
    <div className="contain relative h-screen w-screen bg-[#020001]">
      <div
        className="loadings bg-red-700 h-screen w-screen absolute text-white pointer-events-none top-0 left-0 right-0 bottom-0 opacity-[1]"
        ref={loading}
      >
        <div className="loader absolute flex top-1/2 left-1/2 bg-white w-[250px] h-[35px] transform translate-x-[-50%] translate-y-[-50%]">
          <div className="bar h-[35px] overflow-hidden loader1 relative bg-[#020001] w-[170px]"></div>
          <div className="bar  h-[35px] overflow-hidden loader2  relative bg-[#020001] w-[80px]"></div>
        </div>

        <div
          className="counter fixed bottom-[1%] left-[1%] text-white flex h-[110px] border-none overflow-hidden items-end"
          ref={counter}
        >
          <div className="counter1 relative digit flex flex-col max-h-[130px] box-content items-center justify-between">
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              0
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              1
            </span>
          </div>
          <div className="counter2 relative digit flex flex-col max-h-[130px] box-content items-center justify-between">
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              0
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              1
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              2
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              3
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              4
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              5
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              6
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              7
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              8
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              9
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              0
            </span>
          </div>
          <div className="counter3 relative digit flex flex-col max-h-[130px] box-content items-center justify-between">
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              0
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              1
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              2
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              3
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              4
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              5
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              6
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              7
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              8
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              9
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              0
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              1
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              2
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              3
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              4
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              5
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              6
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              7
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              8
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              9
            </span>
            <span className="number text-[7rem] -webkit-text-stroke-[3px_white] max-h-[130px]">
              0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
