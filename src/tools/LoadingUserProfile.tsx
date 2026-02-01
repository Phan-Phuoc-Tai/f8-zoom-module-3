import { Skeleton } from "../components/ui/skeleton";

export default function LoadingUserProfile() {
  return (
    <div className="max-w-[700px] w-full h-[58px] mb-12">
      <div className="flex items-center gap-4 mb-3 ml-[14px]">
        <Skeleton className="w-37.5 h-37.5 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-30" />
          <Skeleton className="h-4 w-30 mb-8" />
          <Skeleton className="h-4 w-60" />
        </div>
      </div>
    </div>
  );
}
