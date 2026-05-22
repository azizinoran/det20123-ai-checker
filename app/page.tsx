import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#eef3ff] flex flex-col items-center justify-center px-6">

      {/* LOGO */}
      <div className="text-center">

        <div className="mb-6 flex justify-center">
          <div className="w-28 h-28 rounded-full border border-blue-300 flex items-center justify-center shadow-lg bg-white/40 backdrop-blur-xl">
            <span className="text-5xl">📋</span>
          </div>
        </div>

        {/* TITLE */}
        <h1
          className="
            text-7xl
            font-black
            tracking-wide
            bg-gradient-to-r
            from-blue-900
            via-blue-600
            to-cyan-500
            bg-clip-text
            text-transparent
            drop-shadow-[0_0_20px_rgba(37,99,235,0.35)]
          "
        >
          RubricGuide AI
        </h1>

        {/* SUBTITLE */}
        <p
          className="
            mt-6
            text-3xl
            text-blue-700
            tracking-wide
          "
        >
          Helping Students Improve Before Final Submission
        </p>
      </div>

      {/* DESCRIPTION BOX */}
      <div
        className="
          mt-14
          max-w-4xl
          bg-white/70
          backdrop-blur-xl
          border border-white/60
          rounded-[32px]
          shadow-2xl
          p-10
        "
      >
        <div className="flex items-center gap-8">

          <div className="text-6xl text-blue-700">
            🧠
          </div>

          <div className="w-[2px] h-32 bg-blue-200"></div>

          <p
            className={`
    ${poppins.className}
    text-[20px]
    leading-relaxed
    text-slate-800
    font-medium
  `}
          >
            The system acts as an intelligent rubric-guided assessment assistant
            that helps students improve their work before final submission while
            supporting lecturers in preliminary assessment screening.
          </p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="mt-16 flex gap-10 flex-wrap justify-center">

        {/* PELAJAR */}
        <Link
          href="/student"
          className="
            px-16
            py-8
            rounded-[28px]
            text-4xl
            font-bold
            text-white
            bg-gradient-to-r
            from-blue-700
            to-blue-500
            shadow-[0_0_40px_rgba(37,99,235,0.45)]
            hover:scale-105
            hover:shadow-[0_0_60px_rgba(37,99,235,0.7)]
            transition-all
            duration-300
          "
        >
          🎓 Pelajar
        </Link>

        {/* PENSYARAH */}
        <Link
          href="/lecturer-login"
          className="
            px-16
            py-8
            rounded-[28px]
            text-4xl
            font-bold
            text-blue-700
            border-2
            border-blue-500
            bg-white/70
            backdrop-blur-xl
            shadow-xl
            hover:scale-105
            hover:bg-blue-50
            transition-all
            duration-300
          "
        >
          👨‍🏫 Pensyarah
        </Link>

        {/* ADMIN */}
        <Link
          href="/admin-login"
          className="
            px-16
            py-8
            rounded-[28px]
            text-4xl
            font-bold
            text-white
            bg-gradient-to-r
            from-indigo-950
            to-indigo-700
            shadow-[0_0_40px_rgba(67,56,202,0.45)]
            hover:scale-105
            hover:shadow-[0_0_60px_rgba(67,56,202,0.7)]
            transition-all
            duration-300
          "
        >
          🛡️ Admin
        </Link>

      </div>
    </main>
  );
}