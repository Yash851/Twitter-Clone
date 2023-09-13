import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const Topbar = ({title}) => {
    const navigate = useNavigate()
    return (<div className="feed-header">
        {(title === "Tweet") && (
            <BsArrowLeft className="arrow-icon"  onClick={() => navigate(-1)} />
        )}
        <div>
        <span className="heading">{title}</span>
        </div>
    </div>);
}

export default Topbar;