import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { InstallPrompt } from '@/components/layout/InstallPrompt';
import { FormPage } from '@/pages/FormPage';
import { AdminLoginPage } from '@/pages/AdminLoginPage';
import { AdminDashboardPage } from '@/pages/AdminDashboardPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<FormPage />} />
            <Route path="/form" element={<Navigate to="/" replace />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <InstallPrompt />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              fontSize: '14px',
              borderRadius: '8px',
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
