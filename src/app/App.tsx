import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import FiltersPage from '@/pages/filtersPage/FiltersPage.js';
import MainPage from '@/pages/mainPage/MainPage.js';
import ResultPage from '@/pages/resultPage/ResultPage';
import Header from '@/widgets/Header/ui/Header.js';

const queryClient = new QueryClient();

function App() {
    const [isDarkTheme, setDarkTheme] = useState(true);

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Header
                        isDarkTheme={isDarkTheme}
                        onThemeToggle={() => setDarkTheme((prev) => !prev)}
                    />

                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/filters" element={<FiltersPage />} />
                        <Route path="/dishlist" element={<ResultPage />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </>
    );
}

export default App;
