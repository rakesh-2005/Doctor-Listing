import React, { useEffect, useState } from 'react';
import './App.css';

// Components
import { Autocomplete } from './components/Autocomplete';
import { FilterPanel } from './components/FilterPanel';
import { DoctorCard } from './components/DoctorCard';

// Utilities
import { fetchDoctors } from './data/api';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    mode: '',
    specialties: [],
    sort: ''
  });

  useEffect(() => {
    fetchDoctors().then(data => {
      setDoctors(data);
    });
  }, []);

  const filteredDoctors = doctors
    .filter(doc =>
      !filters.name || doc.name?.toLowerCase().includes(filters.name.toLowerCase())
    )
    .filter(doc =>
      !filters.mode ||
      (filters.mode === 'video_consult' && doc.video_consult === true) ||
      (filters.mode === 'in_clinic' && doc.in_clinic === true)
    )
    .filter(doc =>
      filters.specialties.length === 0 ||
      filters.specialties.some(spec =>
        (doc.specialities || []).some(s => s.name === spec)
      )
    )
    .sort((a, b) => {
      // Parse the fees correctly by removing non-numeric characters
      const aFee = parseInt((a.fees || '').replace(/[^\d]/g, '')) || 0;
      const bFee = parseInt((b.fees || '').replace(/[^\d]/g, '')) || 0;

      // Parse the experience correctly by extracting the number of years
      const aExp = parseInt((a.experience || '').match(/\d+/)?.[0]) || 0;
      const bExp = parseInt((b.experience || '').match(/\d+/)?.[0]) || 0;

      if (filters.sort === 'fees') {
        return aFee - bFee;  // Price: Low to High (ascending)
      } else if (filters.sort === 'experience') {
        return aExp - bExp;  // Experience: Low to High (ascending)
      } else if (filters.sort === 'experience-desc') {
        return bExp - aExp;  // Experience: High to Low (descending)
      }
      return 0;
    });

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r p-4">
        <FilterPanel filters={filters} setFilters={setFilters} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <Autocomplete data={doctors} onSearch={(name) => setFilters(f => ({ ...f, name }))} />
          <div className="mt-6 space-y-6">
            {filteredDoctors.map(doc => (
              <DoctorCard key={doc.id} doc={doc} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
