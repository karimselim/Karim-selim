import React, { useEffect } from "react";
import gsap from "gsap";

const Cursor = () => {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");
    const cursorText = document.getElementById("cursor-text");

    const onMouseMove = (event) => {
      const { clientX, clientY } = event;
      gsap.to(cursor, { x: clientX, y: clientY, duration: 0.1 });
    };

    const onMouseEnterLink = () => {
      gsap.to(cursor, { scale: 6, duration: 0.3 });
      cursorText.style.display = "block";
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      cursorText.style.display = "none";
    };

    const attachHoverListeners = () => {
      const elementsWithViewClass = document.querySelectorAll(".view");
      elementsWithViewClass.forEach((element) => {
        if (!element.dataset.cursorBound) {
          element.addEventListener("mouseenter", onMouseEnterLink);
          element.addEventListener("mouseleave", onMouseLeaveLink);
          element.dataset.cursorBound = "true";
        }
      });
    };

    const observer = new MutationObserver(() => {
      attachHoverListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    document.addEventListener("mousemove", onMouseMove);

    attachHoverListeners();

    return () => {
      observer.disconnect();
      document.removeEventListener("mousemove", onMouseMove);
      const elementsWithViewClass = document.querySelectorAll(".view");
      elementsWithViewClass.forEach((element) => {
        element.removeEventListener("mouseenter", onMouseEnterLink);
        element.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-5 w-5 items-center justify-center rounded-full bg-white p-[10px] mix-blend-difference"
      id="custom-cursor"
    >
      <span
        className="hidden text-[5px] font-black tracking-wide text-red-100"
        id="cursor-text"
      >
        view
      </span>
    </div>
  );
};

export default Cursor;
