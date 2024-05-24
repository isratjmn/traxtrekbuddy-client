import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

type TDebounceProps = {
    searchQuery: string;
    delay: number;
};

export const useDebounced = ({ searchQuery, delay }: TDebounceProps) => {
    const [debouncedValue, setDebouncedValue] = useState<string>(searchQuery);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchQuery);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery, delay]);

    return debouncedValue;
};
