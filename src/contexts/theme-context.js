import React, { createContext, useState } from 'react';

import { theDarkTheme } from '../theme/theme';

export const ThemeContext = createContext()

function ThemeContextProvider(props) {
    // Locked to dark theme - theme switching removed
    const theme = theDarkTheme;
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Accepts an explicit boolean, or toggles when called with none.
    const setHandleDrawer = (open) => {
        setDrawerOpen((prev) => (typeof open === 'boolean' ? open : !prev));
    }

    const value = { theme, drawerOpen, setHandleDrawer }
    return (
        <ThemeContext.Provider value={value}>
            {props.children}
        </ThemeContext.Provider>
    )
}


export default ThemeContextProvider;