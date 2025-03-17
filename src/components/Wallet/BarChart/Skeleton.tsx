const BarChartSkeleton = () => (
  <div className="flex h-[250px] overflow-auto">
    <div className="flex flex-col place-items-start justify-between pt-[15px] pb-[25px] pl-[16px]">
      <div className="h-[10px] w-4 animate-pulse rounded-full bg-gray-200" />
      <div className="h-[10px] w-4 animate-pulse rounded-full bg-gray-200" />
      <div className="h-[10px] w-4 animate-pulse rounded-full bg-gray-200" />
      <div className="h-[10px] w-4 animate-pulse rounded-full bg-gray-200" />
      <div className="h-[10px] w-4 animate-pulse rounded-full bg-gray-200" />
      <div className="h-[10px] w-4 animate-pulse rounded-full bg-gray-200" />
    </div>
    <div className="flex h-full w-full flex-col items-end justify-end overflow-auto pr-[40px] pb-2">
      <div className="mb-2 flex w-[340px] shrink-0 items-end justify-between pr-[8px] pl-[12px]">
        <div className="h-[140px] w-5 animate-pulse rounded-md bg-gray-200" />
        <div className="h-[120px] w-5 animate-pulse rounded-md bg-gray-200" />
        <div className="h-[100px] w-5 animate-pulse rounded-md bg-gray-200" />
        <div className="h-[120px] w-5 animate-pulse rounded-md bg-gray-200" />
        <div className="h-[40px] w-5 animate-pulse rounded-md bg-gray-200" />
        <div className="h-[70px] w-5 animate-pulse rounded-md bg-gray-200" />
      </div>
      <div className="flex h-[10px] w-[340px] shrink-0 justify-between">
        <div className="h-[10px] w-10 animate-pulse rounded-full bg-gray-200" />
        <div className="h-[10px] w-10 animate-pulse rounded-full bg-gray-200" />
        <div className="h-[10px] w-10 animate-pulse rounded-full bg-gray-200" />
        <div className="h-[10px] w-10 animate-pulse rounded-full bg-gray-200" />
        <div className="h-[10px] w-10 animate-pulse rounded-full bg-gray-200" />
        <div className="h-[10px] w-10 animate-pulse rounded-full bg-gray-200" />
      </div>
    </div>
  </div>
)

export default BarChartSkeleton
