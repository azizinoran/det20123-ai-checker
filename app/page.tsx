import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-50 flex flex-col items-center justify-center">

      <h1 className="text-5xl font-bold text-blue-900 mb-4">
        DET20123
      </h1>

      <p className="text-xl text-gray-700 mb-10">
        Sistem Semakan Tugasan Pelajar
      </p>

      <div className="flex gap-6">

        <Link
          href="/login"
          className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg"
        >
          Login Pelajar
        </Link>

        <Link
  href="/lecturer-login"
  className="bg-white border-2 border-blue-700 text-blue-700 hover:bg-blue-100 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg"
>
          Login Pensyarah
        </Link>

      </div>

    </main>
  );
}