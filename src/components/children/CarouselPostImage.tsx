import { use } from "react";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "../ui/carousel";
import { PostsContext } from "../../contexts/PostsContext";

export function CarouselPostImage() {
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
                {image && <img src={`${API_URL}${image}`}></img>}
                {video && <video src={`${API_URL}${video}`} controls></video>}
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      {/* <CarouselPrevious className="left-1 cursor-pointer size-6" />
      <CarouselNext className="right-1 cursor-pointer size-6" /> */}
    </Carousel>
  );
}
