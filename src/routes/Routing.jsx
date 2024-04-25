import { Route, Routes } from 'react-router-dom';
import EstimatePage from '../views/EstimatePage';


const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<EstimatePage />} />
        </Routes>
    );
};


export default Routing;