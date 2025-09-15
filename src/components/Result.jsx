import React from 'react';
import { UploadCloud } from 'lucide-react';

const Result = ({ resultImage, scanCompleted, scanning, scanResults }) => {
  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6">
      <h2 className="font-semibold text-lg text-gray-800 mb-4">The Result</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Preview */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center text-gray-400 min-h-[200px]">
          {resultImage ? (
            <img
              src={resultImage}
              alt="Scan Result"
              className="rounded-xl max-h-64 object-contain"
            />
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                <UploadCloud size={24} className="text-gray-400" />
              </div>
              <p>Ready for your result</p>
            </div>
          )}
        </div>

        {/* Table Result */}
        <div>
          {scanCompleted ? (
            <div>
              {/* Header with diagnosis and badge */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg text-gray-800">{scanResults.diagnosis}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    scanResults.severity === 'Parah'
                      ? 'bg-red-100 text-red-600'
                      : scanResults.severity === 'Sedang'
                        ? 'bg-yellow-100 text-yellow-600'
                        : scanResults.severity === 'Ringan'
                          ? 'bg-green-100 text-green-600'
                          : scanResults.severity === 'Tidak Terdeteksi'
                            ? 'bg-gray-100 text-gray-600'
                            : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {scanResults.severity}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-4">{scanResults.date}</p>

              {/* Results table */}
              {scanResults.effects && scanResults.effects.length > 0 ? (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-left text-gray-500 text-sm border-b">
                      <th className="py-2 font-medium">Effect</th>
                      <th className="py-2 font-medium text-primary">Presentase</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {scanResults.effects.map((effect, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3">{effect.name}</td>
                        <td className="py-3 text-primary font-medium">{effect.percentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">
                    {scanResults.severity === 'Tidak Terdeteksi'
                      ? 'Tidak ada kondisi kulit yang terdeteksi pada gambar ini.'
                      : 'Data efek tidak tersedia.'}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-3">
                {scanning ? 'Analyzing your image...' : 'Waiting for your scanning . . .'}
              </p>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left text-gray-500 text-sm border-b">
                    <th className="py-2 font-medium">Effect</th>
                    <th className="py-2 font-medium">Presentase</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-3">Kemerahan</td>
                    <td className="py-3 text-gray-400">-</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3">Pruritus</td>
                    <td className="py-3 text-gray-400">-</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3">Ketebalan</td>
                    <td className="py-3 text-gray-400">-</td>
                  </tr>
                  <tr>
                    <td className="py-3">Likenifikasi</td>
                    <td className="py-3 text-gray-400">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
