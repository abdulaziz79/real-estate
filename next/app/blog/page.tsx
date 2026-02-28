export default function Blog() {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center">
      <h1 className="text-4xl font-bold mb-8">Real Estate Blog</h1>
      <p className="text-slate-500 mb-12">Coming soon...</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-slate-200 animate-pulse rounded-3xl" />
        ))}
      </div>
    </div>
  );
}
