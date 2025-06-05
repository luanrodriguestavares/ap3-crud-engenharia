import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from './components/Navbar';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="min-h-screen bg-gray-100">
                    <Navbar />
                    <main className="container mx-auto px-4 py-8">
                        <Routes>
                            <Route path="/" element={<UserList />} />
                            <Route path="/users/new" element={<UserForm />} />
                            <Route path="/users/:id/edit" element={<UserForm />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
