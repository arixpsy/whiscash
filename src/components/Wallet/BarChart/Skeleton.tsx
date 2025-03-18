const BarChartSkeleton = () => (
  <div className="grid h-[250px] grid-cols-[auto_1fr] overflow-auto">
    <div className="flex flex-col place-items-start justify-between pt-[15px] pb-[25px] pl-[16px]">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="h-[10px] w-4 animate-pulse rounded-full bg-gray-200"
        />
      ))}
    </div>
    <div
      className="hide-scrollbar grid place-items-end overflow-auto pr-[40px] pb-2"
      dir="rtl"
    >
      <div className="flex w-max flex-col">
        <div className="mb-2 flex w-[340px] shrink-0 items-end justify-between pr-[10px] pl-[10px]">
          {[140, 120, 100, 120, 40, 70].map((v, i) => (
            <div
              key={i}
              className="w-5 animate-pulse rounded-md bg-gray-200"
              style={{ height: v }}
            />
          ))}
        </div>
        <div className="flex h-[10px] w-[340px] shrink-0 justify-between">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-[10px] w-10 animate-pulse rounded-full bg-gray-200"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default BarChartSkeleton
