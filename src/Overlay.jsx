import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./Overlay.css";

const Overlay = ({ imgList: { images, index }, closeOverlay }) => {
  const [currentIndex, setCurrentIndex] = useState(index);
  const [inImage, setInImage] = useState(true);

  const showPrev = () => {
    setInImage(false);
    setTimeout(() => {
      setCurrentIndex(
        currentIndex - 1 > 0 ? currentIndex - 1 : images.length - 1
      );
      setInImage(true);
    }, 500);
  };

  const showNext = () => {
    setInImage(false);
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1 < images.length ? currentIndex + 1 : 0);
      setInImage(true);
    }, 500);
  };

  return (
    <div className="base">
      <div className="imageCard">
        {images.length && (
          <>
            <CSSTransition in={inImage} timeout={500} classNames="animation">
              <img
                className="overlayImage"
                src={images[currentIndex]}
                alt="overlay"
              />
            </CSSTransition>
          </>
        )}
      </div>
      <div className="controlsWrapper">
        <button onClick={() => showPrev()} className="controlButton">
          &lt;
        </button>
        <button onClick={() => closeOverlay()} className="controlButton">
          X
        </button>
        <button onClick={() => showNext()} className="controlButton">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Overlay;
