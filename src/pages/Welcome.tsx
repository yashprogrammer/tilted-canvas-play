const Welcome = () => {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-gradient-bg flex items-center justify-center">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
      
      {/* Welcome content */}
      <div className="relative z-10 text-center animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
          Welcome to{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            ARious
          </span>
        </h1>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px]" />
      </div>
    </main>
  );
};

export default Welcome;
