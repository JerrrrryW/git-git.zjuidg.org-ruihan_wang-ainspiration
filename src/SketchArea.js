import React, { useRef, useEffect, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import './App.css';

function SketchArea() {
    const [canvasData, setCanvasData] = useState(null);
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });
    const canvasRef = useRef();

    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleUndo = () => {
        const savedData = JSON.parse(canvasData);
        if (savedData.lines.length > 0) {
            // Remove the last line drawn from the canvas data
            savedData.lines.pop();
            // Update the canvas with the new data
            canvasRef.current.loadSaveData(JSON.stringify(savedData), true);
            // Save the updated data in the state
            setCanvasData(JSON.stringify(savedData));
        }
    };

    const handleClear = () => {
        canvasRef.current.clear();
        // Clear the saved canvas data
        setCanvasData(null);
    };

    return (
        <div>
            <div className='button-bar'>
                <button onClick={handleUndo}>Undo previous sketch</button>
                <button onClick={handleClear}>Clear the canvas</button>
            </div>
            <div className="canvas-area">
                <CanvasDraw
                    ref={canvasRef}
                    brushColor="#000000"
                    brushRadius={2}
                    lazyRadius={0}
                    canvasWidth={dimensions.width*0.46}
                    canvasHeight={dimensions.height*0.73}
                    onChange={() => setCanvasData(canvasRef.current.getSaveData())}
                />
            </div>
        </div>
    );
}

export default SketchArea;
