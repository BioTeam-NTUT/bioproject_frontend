import React from "react";
import ReactDOM from "react-dom";
import "jquery";
import "virtual:windi.css";
import "virtual:windi-devtools";
import "./index.css";
import "./shared.css";

import { RouterPage } from "./pages/RouterPage";

ReactDOM.render(
    <React.StrictMode>
        <div className="min-h-screen bg-gradient-root">
            <RouterPage />
        </div>
    </React.StrictMode>,
    document.getElementById("root")
);
