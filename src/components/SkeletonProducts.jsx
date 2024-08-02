function SkeletonProducts() {
  return (
    <div className={`skeleton rounded-xl border p-4 shadow`}>
      <div
        className={`skeleton mb-2 aspect-[1/1] overflow-hidden rounded-md bg-slate-50`}
      ></div>
      <div className="flex flex-col gap-3">
        <h3 className="skeleton h-6 rounded bg-slate-50"></h3>
        <div className="flex gap-2">
          <div className="badge skeleton h-5 w-full rounded bg-slate-50"></div>
          <div className="badge skeleton h-5 w-full rounded bg-slate-50"></div>
        </div>
        <p className="skeleton h-6 rounded bg-slate-50"></p>
      </div>
    </div>
  );
}

export default SkeletonProducts;
