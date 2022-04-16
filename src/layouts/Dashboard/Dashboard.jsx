import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
let Dashboard = ()=>{
    const navigate = useNavigate();
    async function logOut(){
        await auth.signOut();
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/');    
    }

    return (
        <>
            <button onClick={logOut}>Log out</button>
        </>
    );
}

export default Dashboard;