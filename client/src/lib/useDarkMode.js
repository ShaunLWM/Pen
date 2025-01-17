import { useContext, useState } from 'react';
import { theme } from "../helpers/Theme";
import { store } from "../store";

function useDarkMode() {
    const globalState = useContext(store);
    const [currentTheme, setTheme] = useState(theme);
    const { dispatch } = globalState;

    const currentType = globalState["state"]["currentTheme"];
    const toggled = currentType === "light" ? "dark" : "light";

    const toggleDarkMode = () => {
        const updatedTheme = {
            ...currentTheme,
            palette: {
                ...currentTheme.palette,
                type: toggled,
            },
        };

        setTheme(updatedTheme);
        dispatch({ type: "setTheme", data: toggled });
    };

    return [currentTheme, toggleDarkMode];
}

export default useDarkMode;
