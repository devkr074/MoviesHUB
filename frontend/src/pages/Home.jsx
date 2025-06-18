import Header from "../components/Header";
import loginBackground from "../assets/logo.png"

function Home() {
    return (
        <>
            <Header />
            <div style={{backgroundImage:`url(${loginBackground})`,minHeight:"110vh",backgroundPosition:"center",backgroundSize:"cover"}}></div>
        </>
    );
}
export default Home;