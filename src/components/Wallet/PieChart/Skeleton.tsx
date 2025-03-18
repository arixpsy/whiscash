const PieChartSkeleton = () => (
  <div className="grid w-full grid-cols-2 rounded-lg bg-white p-6 px-3 shadow-lg">
    <div className="grid h-[120px] place-items-center">
      <div className="h-[120px] w-[120px] animate-pulse rounded-full bg-gray-200" />
    </div>

    <div className="grid gap-2 self-center justify-self-center">
      {[1, 2, 3, 4].map((i) => (
        <div className="flex items-center justify-between gap-6" key={i}>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />

            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="h-4 w-8 animate-pulse rounded bg-gray-200" />
        </div>
      ))}
    </div>
  </div>
)

export default PieChartSkeleton
