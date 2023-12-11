import React, { useState } from 'react';
import './App.css';
import { findByLabelText } from '@testing-library/react';
import SketchArea from './SketchArea';


// Header component with title and menu
function Header() {
    return (
        <div className="header">
            <span className="menu-icon">☰</span>
            <h1>Collaborative Ideation Partner</h1>
        </div>
    );
}

// DesignSpace component for sketching and task description
function DesignSpace() {
    return (
        <div className="design-space">
            <h2 style={{color: 'purple'}}>Design a SINK for a disabled bathroom.</h2>
            <SketchArea />  

        </div>
    );
}

// InspiringImageSpace component for inspirational images
function InspiringImageSpace() {
    const [inspiration, setInspiration] = useState(null);

    // Function to handle the inspire action
    const handleInspire = () => {
        // Here you would integrate the backend service to fetch an inspirational image
        // For demonstration, we're setting a static image
        setInspiration('./imgs/demo.png');
    };

    return (
        <div className="inspiring-image-space">
            <h2 style={{color: 'pink'}}>The inspiring object is: bubble tent !</h2>
            <button  onClick={handleInspire}>Inspire me</button>
            {inspiration && <img src={inspiration} alt="Inspirational" />}
        </div>
    );
}

// Main App Component
function App() {
    return (
        <div className="app">
            <Header />
            <main>
                <DesignSpace />
                <InspiringImageSpace />
            </main>
        </div>
    );
}

export default App;
