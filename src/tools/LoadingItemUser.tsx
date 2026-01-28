import { Skeleton } from "../components/ui/skeleton";

export default function LoadingItemUser() {
  return (
    <div className="max-w-[470px] w-full h-[58px]">
      <div className="flex items-center gap-4 mb-3 ml-[14px]">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-35" />
        </div>
      </div>
    </div>
  );
}
