export default function GridBackground() {
  return (
    <div className="fixed inset-0 z-0">
      {/* Dot grid */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(100, 100, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-purple/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyber-cyan/20 rounded-full blur-3xl" />
    </div>
  )
}
