import React, { useEffect, ReactNode } from "react";
import PocketBase from "pocketbase";

// TODO: Config
const BASE_URL = 'http://127.0.0.1:8090'

const PocketContext = React.createContext({});

export const PocketProvider = ({ children }: { children: ReactNode }) => {
    const pb = React.useMemo(() => new PocketBase(BASE_URL), []);
    pb.autoCancellation(false);

    return (
        <PocketContext.Provider
            value={{ pb }}
        >
            {children}
        </PocketContext.Provider>
    );
};

export const usePocket = () => React.useContext(PocketContext);