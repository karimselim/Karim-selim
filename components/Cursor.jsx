import React, { useEffect } from "react";
import gsap from "gsap";

const Cursor = () => {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");
    const cursorText = document.getElementById("cursor-text");

    // Mouse move handler to follow the cursor
    const onMouseMove = (event) => {
      const { clientX, clientY } = event;
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
      });
    };

    // Hover enter handler
    const onMouseEnterLink = () => {
      gsap.to(cursor, {
        scale: 6,
        duration: 0.3,
      });
      if (cursorText) cursorText.style.display = "block";
    };

    // Hover leave handler
    const onMouseLeaveLink = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
      });
      if (cursorText) cursorText.style.display = "none";
    };

    // Function to add hover listeners to elements with the .view class
    const attachHoverListeners = () => {
      const elementsWithViewClass = document.querySelectorAll(".view");
      elementsWithViewClass.forEach((element) => {
        if (!element.dataset.cursorBound) {
          element.addEventListener("mouseenter", onMouseEnterLink);
          element.addEventListener("mouseleave", onMouseLeaveLink);
          element.dataset.cursorBound = "true"; // Prevent multiple bindings
        }
      });
    };

    // Use MutationObserver to dynamically monitor DOM changes
    const observer = new MutationObserver(() => {
      attachHoverListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Add mousemove event
    document.addEventListener("mousemove", onMouseMove);

    // Initial attachment of listeners
    attachHoverListeners();

    // Cleanup on unmount
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
      id="custom-cursor"
      className="pointer-events-none fixed left-0 top-0 z-50 flex h-5 w-5 items-center justify-center rounded-full bg-white p-[10px] mix-blend-difference"
    >
      <span
        id="cursor-text"
        className="hidden text-[5px] font-black tracking-wide text-red-100"
      >
        view
      </span>
    </div>
  );
};

export default Cursor;
