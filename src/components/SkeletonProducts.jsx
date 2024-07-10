function SkeletonProducts() {
  return (
    <div className={`shadow rounded-xl p-4 border skeleton`}>
      <div
        className={`aspect-[1/1] bg-slate-50 overflow-hidden mb-2 rounded-md skeleton`}
      ></div>
      <div className="flex flex-col gap-3">
        <h3 className="bg-slate-50 h-6 rounded skeleton"></h3>
        <div className="flex gap-2">
          <div className="bg-slate-50 badge rounded w-full h-5 skeleton"></div>
          <div className="bg-slate-50 badge rounded w-full h-5 skeleton"></div>
        </div>
        <p className="bg-slate-50 h-6 rounded skeleton"></p>
      </div>
    </div>
  );
}

export default SkeletonProducts;
