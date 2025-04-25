import { MapPin, Building2 } from 'lucide-react';

export const DoctorCard = ({ doc }) => (
  <div
    data-testid="doctor-card"
    className="flex justify-between items-start bg-white p-5 rounded shadow border"
  >
    <div className="flex gap-4">
      <img
        src={doc.photo}
        alt={doc.name}
        className="w-16 h-16 rounded-full object-cover border"
      />
      <div>
        <h2 data-testid="doctor-name" className="text-lg font-semibold text-gray-900">
          {doc.name}
        </h2>
        <p data-testid="doctor-specialty" className="text-sm text-gray-600">
          {Array.isArray(doc.specialities) ? doc.specialities.map(s => s.name).join(', ') : 'N/A'}
        </p>
        {doc.qualification && (
          <p className="text-sm text-gray-800">
            {doc.qualification}
          </p>
        )}
        <p data-testid="doctor-experience" className="text-sm text-gray-600">
          {doc.experience} yrs exp.
        </p>
        {doc.clinic?.name && (
          <p className="text-sm text-gray-700 flex items-center gap-1">
            <Building2 size={14} className="text-gray-500" />
            {doc.clinic.name}
          </p>
        )}
        {doc.clinic?.address?.locality && (
          <p className="text-sm text-gray-700 flex items-center gap-1">
            <MapPin size={14} className="text-gray-500" />
            {doc.clinic.address.locality}
          </p>
        )}
      </div>
    </div>
    <div className="text-right">
      <p data-testid="doctor-fee" className="text-lg font-bold text-gray-800">₹{doc.fees}</p>
      <button className="mt-2 px-4 py-1 text-sm border border-blue-500 text-blue-600 rounded hover:bg-blue-50">
        Book Appointment
      </button>
    </div>
  </div>
);