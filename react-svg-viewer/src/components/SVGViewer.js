import React, { useEffect, useRef, useState, Component } from 'react';

class SVGViewer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            svgContent: null,
            scale: 1,
            offset: { x: 0, y: 0 },
            lastX: 0,
            lastY: 0,
        };
        this.myRef = React.createRef();
    }

    
    componentDidMount() {
        fetch('/h06.svg')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(svgText => {
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
                const svgElement = svgDoc.querySelector('svg');
                if (svgElement) {
                    this.setState({ svgContent: svgElement.outerHTML });
                } else {
                    console.error('Invalid SVG file.');
                }
            })
            .catch(error => console.error('Error loading SVG file:', error));

        if (this.myRef.current) {
            this.myRef.current.addEventListener('wheel', this.handleWheel, { passive: false });
            this.myRef.current.addEventListener('mousedown', this.handleMouseDown, { passive: false });
            this.myRef.current.addEventListener('mouseup', this.handleMouseUp, { passive: false });
            this.myRef.current.addEventListener('mousemove', this.handleMouseMove, { passive: false });
        }
    }

    componentWillUnmount() {
        if (this.myRef.current) {
            this.myRef.current.removeEventListener('wheel', this.handleWheel, { passive: false });
            this.myRef.current.removeEventListener('mousedown', this.handleMouseDown, { passive: false });
            this.myRef.current.removeEventListener('mouseup', this.handleMouseUp, { passive: false });
            this.myRef.current.removeEventListener('mousemove', this.handleMouseMove, { passive: false });
        }
    }

    handleWheel = (e) => {
        e.stopPropagation();
        const delta = Math.sign(e.deltaY) * -0.1;
        const newScale = Math.min(Math.max(this.state.scale + delta, 0.1), 5);
        const scaleChange = newScale / this.state.scale;
        this.setState(prevState => ({
            scale: newScale,
            offset: {
                x: prevState.offset.x - (e.clientX - this.myRef.current.getBoundingClientRect().left / 2) * (scaleChange - 1),
                y: prevState.offset.y - (e.clientY - this.myRef.current.getBoundingClientRect().top / 2) * (scaleChange - 1),
            }
        }));
    };

    handleMouseDown = (e) => {
        
        this.myRef.current.isDragging = true;
        this.myRef.current.lastX = e.clientX;
        this.myRef.current.lastY = e.clientY;
    };

    handleMouseMove = (e) => {
        
        if (!this.myRef.current.isDragging) 
            return;
        e.stopPropagation();
        const dx = e.clientX - this.myRef.current.lastX;
        const dy = e.clientY - this.myRef.current.lastY;
        this.setState(prevState => ({
            offset: {
                x: prevState.offset.x + dx,
                y: prevState.offset.y + dy,
            }
        }));
        this.myRef.current.lastX = e.clientX;
        this.myRef.current.lastY = e.clientY;
    };

    handleMouseUp = () => {
        this.myRef.current.isDragging = false;
    };

    render() {
        const { svgContent, scale, offset } = this.state;
        return (
            <div id="svgContainer" 
                ref={this.myRef}
                onWheel={this.handleWheel}
                onMouseDown={this.handleMouseDown}
                onMouseMove={this.handleMouseMove}
                onMouseUp={this.handleMouseUp}
                onMouseLeave={this.handleMouseUp}
                
                style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                    cursor: 'grab',
                    overflow: 'hidden',
                    width: '100%',
                    height: '100%',
                }}
                dangerouslySetInnerHTML={{ __html: svgContent }}
            />
                
        );
    }
    
}
// const SVGViewer = () => {
//     const [svgContent, setSvgContent] = useState(null);
//     const [scale, setScale] = useState(1);
//     const [offset, setOffset] = useState({ x: 0, y: 0 });
//     const svgRef = useRef(null);
    
//     useEffect(() => {
//         fetch('/h06.svg')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
                
//                 return response.text();
//             })
//             .then(svgText => {
                
//                 const parser = new DOMParser();
//                 const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
//                 const svgElement = svgDoc.querySelector('svg');
//                 if (svgElement) {
//                     setSvgContent(svgElement.outerHTML);
                    
//                 //     svgElement.querySelectorAll('text').forEach(textElement => {
//                 //         // Disable text selection
//                 //         textElement.style.userSelect = 'none';
//                 //         // Enable text wrapping => solve the issue of text overflow
//                 //         textElement.style.whiteSpace = 'pre';
//                 //       });
//                 // } else {
//                 //     console.error('Invalid SVG file.');
//                 }
//             })
//             .catch(error => console.error('Error loading SVG file:', error));
//     }, []);

//     //svgRef.current.isDragging = false;
//     // svgRef.current.lastX = 0;
//     // svgRef.current.lastY = 0;

//     const handleWheel = (e) => {
//         //event.preventDefault();
        
//         const delta = Math.sign(e.deltaY) * -0.1;
//         const newScale = Math.min(Math.max(scale + delta, 0.1), 5);
//         const scaleChange = newScale / scale;
//         setScale(newScale);
//         setOffset(prevOffset => ({
//             x: prevOffset.x - (e.clientX - svgRef.current.getBoundingClientRect().left / 2) * (scaleChange - 1),
//             y: prevOffset.y - (e.clientY - svgRef.current.getBoundingClientRect().top / 2) * (scaleChange - 1),
//         }));

//     };

//     const handleMouseDown = (e) => {
//         svgRef.current.isDragging = true;
//         svgRef.current.lastX = e.clientX;
//         svgRef.current.lastY = e.clientY;
//     };

//     const handleMouseMove = (e) => {
//         if (!svgRef.current.isDragging) 
//             return;
//         //e.preventDefault();
//         //element.removeEventListener('wheel', this.handleWheel, { passive: false });
//         const dx = e.clientX - svgRef.current.lastX;
//         const dy = e.clientY - svgRef.current.lastY;
//         setOffset(prevOffset => ({
//             x: prevOffset.x + dx,
//             y: prevOffset.y + dy,
//         }));
//         svgRef.current.lastX = e.clientX;
//         svgRef.current.lastY = e.clientY;
//     };

//     const handleMouseUp = () => {
//         svgRef.current.isDragging = false;
//     };

//     return (
//         <div 
//             ref={svgRef}
//             onWheel={handleWheel}
//             onMouseDown={handleMouseDown}
//             onMouseMove={handleMouseMove}
//             onMouseUp={handleMouseUp}
//             onMouseLeave={handleMouseUp}
//             style={{
//                 transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
//                 cursor: 'grab',
//                 overflow: 'hidden',
//                 width: '100%',
//                 height: '100%',
//             }}
//         >
//             <div dangerouslySetInnerHTML={{ __html: svgContent }} />
//         </div>
        
//     );
// };

export default SVGViewer;