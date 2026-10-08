import Header from "./Header";
import Dashboard from "./Dashboard";
import MainContent from "./MainContent";
import "./MainContent";
import "./PosMainPage.css"
export default function PosMainPage() {
    return (
        <div className="MainPageContainer">
            <Header />

            

            <div className="PageBody">
                <Dashboard />
                <MainContent />
            </div>

        </div>
    );
}