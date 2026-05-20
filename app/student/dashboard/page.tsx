import Link from "next/link";

export default function StudentDashboard() {
  return (
    <main className="min-h-screen bg-blue-50 p-10">

      <h1 className="text-4xl font-bold text-blue-900 mb-2">
        Dashboard Pelajar
      </h1>

      <p className="text-gray-700 mb-10">
        Sistem Semakan Tugasan AI
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            EOC
          </h2>

          <Link
            href="/student/eoc"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl inline-block"
          >
            Upload Tugasan
          </Link>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            PW
          </h2>

          <Link
            href="/student/pw"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl inline-block"
          >
            Upload Tugasan
          </Link>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            TEST
          </h2>

          <Link
            href="/student/test"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl inline-block"
          >
            Upload Tugasan
          </Link>
        </div>

      </div>

    </main>
  );
}