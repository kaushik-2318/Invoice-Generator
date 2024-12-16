
import { createContext, Dispatch, SetStateAction } from "react";

interface ContextProps {
    isAlive: boolean;
    setIsAlive: Dispatch<SetStateAction<boolean>>;

}

export const Context = createContext<ContextProps>({
    isAlive: false,
    setIsAlive: () => { },
});
