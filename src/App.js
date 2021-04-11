import { useEffect, useState } from "react";
import "./App.css";
import Overlay from "./Overlay";
import unsplash from "./unsplash";
// import { dummyResponse } from "./data";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [images, setImages] = useState([]);
  const [overlayImages, setOverlayImages] = useState(undefined);
  let page = 1;

  useEffect(() => {
    unsplash.search
      .getPhotos({
        query: "cat",
        page,
        perPage: 30,
        color: "green",
        orientation: "portrait",
      })
      .then((result) => setImages(result.response.results.map((obj) => obj.urls.small)))
      .catch((err) => console.log(err));

    // setTimeout(() => {
    //   setImages(dummyResponse.map((obj) => obj.urls.small));
    // }, 1000);
  }, []);

  const fetchData = () => {
    page = page+1
    unsplash.search
      .getPhotos({
        query: "cat",
        page,
        perPage: 20,
        color: "green",
        orientation: "portrait",
      })
      .then((result) => setImages([...images, ...result.response.results.map((obj) => obj.urls.small)]))
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* Overlay */}
      {overlayImages && (
        <Overlay
          imgList={overlayImages}
          closeOverlay={() => setOverlayImages(undefined)}
        />
      )}
      <div className="pageWrapper">
        {/* Heading section */}
        <div className="headingWrapper">
          <span>My attempt to create a Masonry view</span>
        </div>

        {/* Gallery section */}
        <div className="gallerySectionWrapper">
          <InfiniteScroll
            dataLength={images.length} //This is important field to render the next data
            next={fetchData}
            hasMore={true}
            loader={<div className="loading">Getting more kitties ...</div>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>No more Images!</b>
              </p>
            }
          >
            <div className="galleryContainer">
              {images.map((img, index) => (
                <div
                  key={`img-${index}`}
                  className="imgWrapper"
                  onClick={() =>
                    setOverlayImages({
                      images,
                      index,
                    })
                  }
                >
                  <img className="img" alt="img" src={img} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}

export default App;
