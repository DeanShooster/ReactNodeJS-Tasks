
import './pagination.scss';
import {MdOutlineArrowBackIosNew,MdOutlineArrowForwardIos} from 'react-icons/md';
import { useNavigate, useParams } from 'react-router';

const Pagination = ( {taskAmount} ) => {

    const params = useParams();
    const navigate = useNavigate();

    const prevPage = () => navigate(`/tasks/${parseInt(params.page)-1}`);
    const nextPage = () => navigate(`/tasks/${parseInt(params.page)+1}`);

    return (
        <div className='pagination-container'>
            { params.page > 1 && <MdOutlineArrowBackIosNew className='arrow' onClick={prevPage}/> }
            { taskAmount === 4 && <MdOutlineArrowForwardIos className='arrow' onClick={nextPage}/>}
        </div>
    );
};

export default Pagination;