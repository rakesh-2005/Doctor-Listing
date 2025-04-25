export const applyFilters = (data, filters) => {
    let result = [...data];

    // Name filter
    if (filters.name) {
        result = result.filter(doc =>
            doc.name?.toLowerCase().includes(filters.name.toLowerCase())
        );
    }

    // Consultation mode filter
    if (filters.mode) {
        result = result.filter(doc =>
            doc.consultation_type?.toLowerCase() === filters.mode.toLowerCase()
        );
    }

    // Specialties filter
    if (filters.specialties.length > 0) {
        result = result.filter(doc =>
            filters.specialties.some(spec =>
                (doc.specialties || []).includes(spec)
            )
        );
    }

    // Sorting
    if (filters.sort === 'fees') {
        result.sort((a, b) => a.fees - b.fees);
    } else if (filters.sort === 'experience') {
        result.sort((a, b) => b.experience - a.experience);
    }

    return result;
};