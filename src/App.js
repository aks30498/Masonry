import { useEffect, useState } from "react";
import "./App.css";
import Overlay from "./Overlay";
import unsplash from "./unsplash";
// import { dummyResponse } from "./data";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [images, setImages] = useState(undefined);
  const [overlayImages, setOverlayImages] = useState(undefined);
  const [page, setPage] = useState(1);

  useEffect(() => {
    unsplash.search
      .getPhotos({
        query: "cat",
        page,
        perPage: 30,       
        orientation: "portrait",
      })
      .then((result) =>
        setImages((images) =>
          images
            ? [
                ...images,
                ...result.response.results.map((obj) => obj.urls.small),
              ]
            : result.response.results.map((obj) => obj.urls.small)
        )
      )
      .catch((err) => console.log(err));
  }, [page]);

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
        {images && (
          <div className="gallerySectionWrapper">
            <InfiniteScroll
              dataLength={images ? images.length : 0}
              next={() => setPage((page) => page + 1)}
              hasMore={true}
              loader={<div className="loading">Getting more kitties ...</div>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>No more Images!</b>
                </p>
              }
            >
              <div className="galleryContainer">
                {images &&
                  images.map((img, index) => (
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
        )}
      </div>
    </>
  );
}

export default App;
