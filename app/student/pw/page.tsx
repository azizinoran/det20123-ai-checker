export default function PWPage() {
  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-[500px]">

        <h1 className="text-3xl font-bold text-blue-800 mb-4 text-center">
          Upload Tugasan PW
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Sila upload tugasan dalam format PDF
        </p>

        <input
          type="file"
          accept=".pdf"
          className="w-full border border-gray-300 rounded-lg p-3 mb-6"
        />

        <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold">
          Semak Tugasan AI
        </button>

      </div>

    </main>
  );
}