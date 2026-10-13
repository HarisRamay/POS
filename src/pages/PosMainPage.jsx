import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MainContent from "../features/MainContent";

import "./PosMainPage.css"
export default function PosMainPage() {
    return (
        <div className="MainPageContainer">
            <Header />

            

            <div className="PageBody">
                <Sidebar />
                <MainContent />
            </div>

        </div>
    );
}