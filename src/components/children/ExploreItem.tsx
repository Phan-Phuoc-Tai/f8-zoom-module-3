import { use } from "react";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { PostsContext } from "../../contexts/PostsContext";

export function ExploreItem() {
  const context = use(PostsContext);
  const image = context?.image;
  const video = context?.video;
  const API_URL = "https://instagram.f8team.dev";

  return (
    <Carousel>
      <CarouselContent>
        {/* {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div>
              <Card className=" outline-none border-0 p-0 rounded-sm overflow-hidden">
                <CardContent className="flex aspect-square items-center justify-center p-0 px-px">
                  {image && <img src={`${API_URL}${image}`}></img>}
                  {video && <video src={`${API_URL}${video}`} controls></video>}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))} */}
        <CarouselItem>
          <div>
            <Card className=" outline-none border-0 p-0 rounded-sm overflow-hidden">
              <CardContent className="flex aspect-square items-center justify-center p-0 px-px">
                {image && (
                  <img
                    src={`${API_URL}${image}`}
                    className="object-cover h-80 w-80"
                  ></img>
                )}
                {video && (
                  <video
                    src={`${API_URL}${video}`}
                    controls
                    className="object-cover h-80 w-80"
                  ></video>
                )}
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
