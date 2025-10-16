export default function Scanlines() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-50 opacity-10">
        <div className="h-full w-full bg-[repeating-linear-gradient(0deg,#0f0_0px,transparent_1px,transparent_2px,#0f0_3px)] animate-scan" />
      </div>
      <div className="pointer-events-none fixed inset-0 z-50 bg-[radial-gradient(circle,transparent_30%,#000_100%)] opacity-40" />
    </>
  )
}
