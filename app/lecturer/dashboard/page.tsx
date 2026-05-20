"use client";

export default function LecturerDashboard() {

  const handleSave = () => {
    alert("Skema berjaya disimpan!");
  };

  return (
    <main className="min-h-screen bg-blue-50 p-10">

      <h1 className="text-4xl font-bold text-blue-900 mb-2">
        Dashboard Pensyarah
      </h1>

      <p className="text-gray-700 mb-10">
        Upload Skema Jawapan Tugasan
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* EOC */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
            EOC
          </h2>

          <input
            type="file"
            accept=".pdf"
            className="w-full border border-gray-300 rounded-lg p-3 mb-4"
          />

          <button
            onClick={handleSave}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl"
          >
            Simpan Skema
          </button>

        </div>

        {/* PW */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
            PW
          </h2>

          <input
            type="file"
            accept=".pdf"
            className="w-full border border-gray-300 rounded-lg p-3 mb-4"
          />

          <button
            onClick={handleSave}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl"
          >
            Simpan Skema
          </button>

        </div>

        {/* TEST */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
            TEST
          </h2>

          <input
            type="file"
            accept=".pdf"
            className="w-full border border-gray-300 rounded-lg p-3 mb-4"
          />

          <button
            onClick={handleSave}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl"
          >
            Simpan Skema
          </button>

        </div>

      </div>

    </main>
  );
}