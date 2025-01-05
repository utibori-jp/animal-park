import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme";
import {RecoilRoot} from "recoil";

// ページコンポーネントのインポート
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

// Headerコンポーネントのインポート
import Header from "./components/common/Header.tsx";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <RecoilRoot>
                <Router>
                    <Header/>
                    <Container>
                        <Routes>
                            {/* ルートページ */}
                            <Route path="/" element={<Home/>}/>
                            {/* WeatherReportページ */}
                            <Route path="/product/:id" element={<ProductDetail/>}/>
                        </Routes>
                    </Container>
                </Router>
            </RecoilRoot>
        </ThemeProvider>
    );
};

export default App;
