import { struktur as s } from "@/data/struktur";

function Box({ jabatan, nama, className = "" }) {
  return (
    <div className={`bg-white border-2 border-emerald-700 rounded-lg px-3 py-3 text-center shadow-sm min-h-[4.5rem] flex flex-col justify-center ${className}`}>
      <p className="text-sm font-bold text-emerald-900 leading-snug">{jabatan}</p>
      {nama && <p className="text-sm text-gray-700 leading-snug">{nama}</p>}
    </div>
  );
}

const Tick = () => <div className="mx-auto h-6 border-l-2 border-emerald-700" />;
const Bar = () => <div className="border-t-2 border-emerald-700" />;

export default function StrukturBagan() {
  return (
    <>
      <div className="hidden md:block bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <div className="grid grid-cols-[1fr_16rem_1fr] items-center">
          <div />
          <Box {...s.kepala} className="bg-emerald-50" />
          <div className="flex items-center">
            <div className="w-10 border-t-2 border-dashed border-emerald-700" />
            <Box {...s.komite} className="w-44" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 border-l-2 border-emerald-700" />

          <div className="relative py-8">
            <div className="w-1/2 flex items-center">
              <Box {...s.tu} className="w-64" />
              <div className="flex-1 border-t-2 border-dashed border-emerald-700" />
            </div>
          </div>

          <Bar />
          <div className="relative grid grid-cols-4 gap-4">
            {s.wakasek.map((w) => (
              <div key={w.jabatan}><Tick /><Box {...w} /></div>
            ))}
          </div>

          <div className="h-8" />
          <Bar />
          <div className="relative grid grid-cols-4 gap-4">
            {s.unit.map((u) => (
              <div key={u.jabatan}><Tick /><Box {...u} /></div>
            ))}
          </div>

          <div className="h-8" />
          <div className="relative flex justify-center">
            <Box {...s.guru} className="w-40 border-4" />
          </div>
        </div>

        <div className="mx-auto h-8 w-0 border-l-2 border-dashed border-emerald-700" />
        <div className="flex justify-center">
          <Box {...s.siswa} className="w-48" />
        </div>
      </div>

      <div className="md:hidden space-y-2">
        {[s.kepala, s.komite, s.tu, ...s.wakasek, ...s.unit, s.guru, s.siswa].map((b, i, arr) => (
          <div key={b.jabatan}>
            <Box {...b} />
            {i < arr.length - 1 && <div className="mx-auto h-4 border-l-2 border-emerald-700" />}
          </div>
        ))}
      </div>
    </>
  );
}
