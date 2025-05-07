const LoadingDots = () => (
  <div className="mx-auto flex h-6 w-5 items-center justify-between">
    <div className="h-[5px] w-[5px] animate-bounce justify-self-start rounded-full bg-white" />
    <div
      className="h-[5px] w-[5px] animate-bounce rounded-full bg-white"
      style={{ animationDelay: '100ms' }}
    />
    <div
      className="h-[5px] w-[5px] animate-bounce justify-self-end rounded-full bg-white"
      style={{ animationDelay: '200ms' }}
    />
  </div>
)

export default LoadingDots
