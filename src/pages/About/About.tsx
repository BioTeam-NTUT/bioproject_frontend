import React from "react";
import "./About.css";

const $3Dmol = window.$3Dmol;

class About extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    componentDidMount() {
        let element = $("#about");
        let config = { backgroundColor: "orange" };
        let glviewer = $3Dmol.createViewer(element, config);
        glviewer.addSphere({
            center: { x: 0, y: 0, z: 0 },
            radius: 10.0,
            color: "green",
        });
        glviewer.zoomTo();
        glviewer.render();
        glviewer.zoom(0.8, 2000);
    }

    render() {
        return <div className="about" id="about"></div>;
    }
}

export default About;
