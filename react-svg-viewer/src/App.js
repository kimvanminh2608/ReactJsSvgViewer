import React, { useState } from 'react';
import SVGViewer from './components/SVGViewer';
//import PropertyList from './components/propertyList.js';
//import Modal from './components/Modal';

const App = () => {
    return (
        <div id="container" className="App">
            <SVGViewer/>
        </div>
    );
}



// function App() {
//     const [selectedProperties, setSelectedProperties] = useState(null);
//     const [modalContent, setModalContent] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const handleElementClick = (mID, properties) => {
//         setSelectedProperties({ mID, properties });
//     };

//     const openModal = (content) => {
//         setModalContent(content);
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setModalContent(null);
//     };

//     return (
//         <div className="App">
//             <div className="flex">
//                 <SVGViewer onElementClick={handleElementClick} openModal={openModal} />
//                 {/* <PropertyList properties={selectedProperties} /> */}
//             </div>
//             {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
//                 {modalContent}
//             </Modal> */}
//         </div>
//     );
// }

export default App;