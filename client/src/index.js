import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const App = () => {
    return (
        <div>
            <h1>Welcome to my Sophisticated Webpage!</h1>
            <p>This webpage includes an image, a link, and some basic styling.</p>
            <a href="https://www.example.com">Visit Example.com</a>
            <img src="image1.jpeg" alt="Image"/>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);