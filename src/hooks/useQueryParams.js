import { useLocation, useNavigate } from "react-router-dom";

export const useQueryParams = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const setQuery = (params) => {
        const query = new URLSearchParams(params).toString();
        navigate(`?${query}`);
    };

    const getQuery = () => {
        return new URLSearchParams(location.search);
    };

    return { setQuery, getQuery };
};