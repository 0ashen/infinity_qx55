import React from 'react';
import { Welcome } from './pages/Welcome/Welcome';
import { Cursor } from './components/Cursor/Cursor';
import { Logo } from './components/Logo/Logo';

function App() {
    return (
        <>
            <Cursor />
            <Logo />
            <Welcome />
        </>
    );
}

export default App;
