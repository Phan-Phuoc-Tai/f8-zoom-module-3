import { Skeleton } from "../components/ui/skeleton";

export default function LoadingPost() {
  return (
    <div className="max-w-[470px] w-full mb-5 pb-4">
      <div className="flex items-center gap-4 mb-3 ml-[14px]">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-50" />
        </div>
      </div>
      <Skeleton className="h-100 w-full" />
    </div>
  );
}
