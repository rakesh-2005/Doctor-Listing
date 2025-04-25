import { useState } from 'react';

export const FilterPanel = ({ filters, setFilters }) => {
  const [specialtySearch, setSpecialtySearch] = useState('');

  // Get all unique specialties from the data
  const specialties = [
    ...new Set(
      (filters.all || []).flatMap(doc => (doc.specialities || []).map(s => s.name))
    ),
  ].filter(Boolean);  // Remove any empty or undefined values

  // Filter specialties based on the search input
  const filteredSpecialties = specialties.filter(s =>
    s.toLowerCase().includes(specialtySearch.toLowerCase())
  );

  const handleCheckbox = (specialty) => {
    const current = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty];
    setFilters(prev => ({ ...prev, specialties: current }));
  };

  return (
    <div className="text-sm text-gray-800">
      <h2 className="font-bold text-lg mb-3">Filters</h2>

      {/* Specialities Section */}
      <div className="border border-gray-200 rounded mb-4 overflow-hidden">
        <h3 data-testid="filter-header-speciality" className="bg-gray-100 px-4 py-2 font-semibold text-gray-700 border-b">Specialities</h3>
        <div className="px-4 py-3">
          <div className="flex items-center border rounded px-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 5.65a7.5 7.5 0 010 10.6z" />
            </svg>
            <input
              type="text"
              placeholder="Search specialities"
              value={specialtySearch}
              onChange={(e) => setSpecialtySearch(e.target.value)}
              className="w-full px-2 py-1 text-sm outline-none"
            />
          </div>
          <div className="h-40 overflow-y-auto pr-1 space-y-2">
            {filteredSpecialties.map(s => (
              <label key={s} className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={filters.specialties.includes(s)}
                  onChange={() => handleCheckbox(s)}
                  data-testid={`filter-specialty-${s?.replace(/\s+/g, '-').replace('/', '-')}`}
                />
                <span className="ml-2">{s}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Mode of consultation Section */}
      <div className="border border-gray-200 rounded mb-4 overflow-hidden">
        <h3 data-testid="filter-header-moc" className="bg-gray-100 px-4 py-2 font-semibold text-gray-700 border-b">Mode of consultation</h3>
        <div className="px-4 py-3">
          {[
            { key: 'video_consult', label: 'Video Consultation' },
            { key: 'in_clinic', label: 'In-clinic Consultation' },
            { key: '', label: 'All' }
          ].map(({ key, label }) => (
            <label key={key} className="block mb-2 text-sm text-gray-700">
              <input
                type="radio"
                name="mode"
                value={key}
                checked={filters.mode === key}
                onChange={() => setFilters(prev => ({ ...prev, mode: key }))}
                data-testid={`filter-${label.toLowerCase().replace(/\s+/g, '-')}`}
              />
              <span className="ml-2">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort Section */}
      <div className="border border-gray-200 rounded mb-4 overflow-hidden">
        <h3 data-testid="filter-header-sort" className="bg-gray-100 px-4 py-2 font-semibold text-gray-700 border-b">Sort</h3>
        <div className="px-4 py-3">
          {[
            { key: 'fees-asc', label: 'Price: Low to High' },
            { key: 'experience-desc', label: 'Experience: High to Low' }
          ].map(({ key, label }) => (
            <label key={key} className="block mb-2 text-sm text-gray-700">
              <input
                type="radio"
                name="sort"
                value={key}
                checked={filters.sort === key}
                onChange={() => setFilters(prev => ({ ...prev, sort: key }))}
                data-testid={`sort-${key}`}
              />
              <span className="ml-2">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};