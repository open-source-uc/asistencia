export default function UploadFile({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element {
  return (
    <div className="flex items-center justify-center h-96">
      <label className="rounded-xl flex flex-col items-center justify-center h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-100 hover:bg-slate-200">
        <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
          <p className="mb-2 text-sm text-slate-500 font-semibold">
            Arrastra y suelta tu archivo .csv
          </p>
          <p className="text-xs text-slate-500">CSV, XLS</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept=".csv"
          onChange={onChange}
        />
      </label>
    </div>
  );
}
