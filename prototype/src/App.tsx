import { RouterProvider } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { router } from './router';

const App = () => {
    return (
        <AppProvider>
            <div className="font-sans selection:bg-[#F2E8E3] selection:text-[#E86435]">
                <RouterProvider router={router} />
            </div>
        </AppProvider>
    );
};

export default App;