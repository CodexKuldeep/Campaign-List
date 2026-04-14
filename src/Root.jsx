import { BrowserRouter ,Routes,Route} from "react-router-dom";
import AddCampaign from "./components/AddCampaign";
import App from "./App";
// import AddCampaign from "./components/AddCampaign";

export default function Root() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/add" element={<AddCampaign/>} />
            </Routes>
        </BrowserRouter>
    )
}