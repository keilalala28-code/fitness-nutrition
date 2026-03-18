import BodyMeasurements from '@/components/BodyMeasurements';

export default function MeasurementsPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto px-4 pt-4">
        <div className="text-xl font-bold text-gray-800 mb-4">身体维度</div>
        <BodyMeasurements />
      </div>
    </main>
  );
}
