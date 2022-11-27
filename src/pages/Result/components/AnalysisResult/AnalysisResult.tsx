import React from "react";
import "@progress/kendo-theme-default/scss/grid/_index.scss";
import "./AnalysisResult.css";
import { VirusData } from "../VirusData";
import {
    Grid,
    GridColumn as Column,
    getSelectedState,
    GridSelectionChangeEvent,
} from "@progress/kendo-react-grid";

import { getter } from "@progress/kendo-react-common";
import $ from "jquery";
import Tree from "react-d3-tree";
const $3Dmol = window.$3Dmol;

interface AnalysisResultStates {
    selectedFilteredEpitopeState: { [string: string]: boolean | number[] };
    selectedNonFiltedEpitopeState: { [string: string]: boolean | number[] };
    molglviewer: any;
    selectedFilteredEpitopeRange: { [range: string]: boolean | number[] };
}

class AnalysisResult extends React.Component<{}, AnalysisResultStates> {
    constructor(props: {}) {
        super(props);

        this.state = {
            selectedFilteredEpitopeState: {},
            selectedNonFiltedEpitopeState: {},
            selectedFilteredEpitopeRange: {},
            molglviewer: {},
        };

        this.handleFiltedEpitopeSelectionChanged =
            this.handleFiltedEpitopeSelectionChanged.bind(this);
        this.handleNonFiltedEpitopeSelectionChanged =
            this.handleNonFiltedEpitopeSelectionChanged.bind(this);
    }
    /**
     * 3D MOL https://3dmol.csb.pitt.edu/doc/tutorial-code.html
     */
    componentDidMount() {
        let element = $("#result_mol");
        let config = {
            backgroundColor: "white",
            position: "none",
        };
        let glviewer = $3Dmol.createViewer(element, config);
        let pdbUri = "https://files.rcsb.org/view/6OJN.pdb";
        jQuery.ajax(pdbUri, {
            success: function (data) {
                let v = glviewer;
                v.addModel(data, "pdb");
                v.setStyle({}, { cartoon: { color: "red" } });
                v.zoomTo();
                v.render();
                v.zoom(1.2, 1000);
                v.setStyle({}, { cartoon: { color: "#d3d3d3" } });
                //v.setStyle({ bonds: 0 }, { sphere: { radius: 0.5 } }); //water molecules
                /* v.setStyle(
                    { resn: "PMP", byres: true, expand: 5 },
                    { stick: { colorscheme: "greenCarbon" } }
                ); */
                /* v.setStyle(
                    { resi: [["91-95", "42-50"]] },
                    { stick: { color: "black", thickness: 1.0 } }
                ); */
                v.render();
            },
            error: function (hdr, status, err) {
                console.error("Failed to load PDB " + pdbUri + ": " + err);
            },
        });
        this.setState({ molglviewer: glviewer });
    }
    getNewSelectedState(
        event: GridSelectionChangeEvent,
        selectedState: { [id: string]: boolean | number[] }
    ) {
        return getSelectedState({
            event,
            selectedState: selectedState,
            dataItemKey: "range",
        });
    }
    parseRange(range: string) {
        let arr = range.split("-");
        let startPosition = parseInt(arr[0]);
        let endPosition = parseInt(arr[1]);
        return [startPosition, endPosition];
    }
    setMolViewerStyle(objectState: Object) {
        let v = this.state.molglviewer;
        for (const [key, value] of Object.entries(objectState)) {
            let range = this.parseRange(key);
            if (value) {
                for (let i = range[0]; i <= range[1]; i++) {
                    v.setStyle({ resi: i }, { cartoon: { color: "red" } });
                }
                /* v.setStyle({ chain: "B", invert: false }, { sphere: {} }); */
            } else {
                for (let i = range[0]; i <= range[1]; i++) {
                    v.setStyle({ resi: i }, { cartoon: { color: "#d3d3d3" } });
                }
                //v.setStyle({ chain: "B", invert: false }, { cartoon: {} });
            }
        }
        v.render();
    }
    setVirusStructureStyle(object: Object, otherFilteredObject: Object) {
        let v = this.state.molglviewer;
        v.setStyle({}, { cartoon: { color: "#d3d3d3" } });
        this.setMolViewerStyle(object);
        this.setMolViewerStyle(otherFilteredObject);
    }
    handleFiltedEpitopeSelectionChanged(event: GridSelectionChangeEvent) {
        const newState = this.getNewSelectedState(
            event,
            this.state.selectedFilteredEpitopeState
        );
        this.setVirusStructureStyle(
            newState,
            this.state.selectedNonFiltedEpitopeState
        );
        this.setState({
            selectedFilteredEpitopeState: newState,
        });
    }

    handleNonFiltedEpitopeSelectionChanged(event: GridSelectionChangeEvent) {
        const newState = this.getNewSelectedState(
            event,
            this.state.selectedNonFiltedEpitopeState
        );
        this.setVirusStructureStyle(
            newState,
            this.state.selectedFilteredEpitopeState
        );
        this.setState({
            selectedNonFiltedEpitopeState: newState,
        });
    }

    render() {
        return (
            <div id="result">
                <div className="targetGrid">
                    <h1 className="header-text">Target Virus</h1>
                    <VirusData VirusDataInfo={testVirus}></VirusData>
                    {/* <Grid
                            style={{ width:'100%' }}
                            data={representativeVirus}>
                            <Column field='name' title='Protein Name' />
                            <Column field='accessionNumber' title='Accession No.'/>
                            <Column field='organism' title='Organism'/>
                            <Column field='taxonomyID' title='Taxonomy ID'/>
                            <Column field='taxonomyPath' title='Taxonomy Path'/>
                            <Column field='knownStructure' title='Known Structure'/>
                        </Grid> */}
                </div>
                <div className="representativeGrid">
                    <h1 className="header-text">Representative Virus</h1>
                    <Grid style={{ width: "100%" }} data={representativeVirus}>
                        <Column field="name" title="Protein Name" />
                        <Column field="accessionNumber" title="Accession No." />
                        <Column field="organism" title="Organism" />
                        <Column field="taxonomyID" title="Taxonomy ID" />
                        <Column field="taxonomyPath" title="Taxonomy Path" />
                        <Column
                            field="knownStructure"
                            title="Known Structure"
                        />
                    </Grid>
                </div>
                <div className="treeWrapper">
                    <h1 className="header-text">Taxanomy Tree</h1>
                    <div className="taxanomy_tree">
                        <Tree
                            data={orgChart}
                            orientation="vertical"
                            pathFunc="elbow"
                            nodeSize={{ x: 200, y: 100 }}
                            translate={{
                                x: 600,
                                y: 100,
                            }}
                        />
                    </div>
                </div>
                <div className="epitope">
                    <div className="epitope_seq">
                        <div className="epitope_seq_filtered">
                            <h1 className="header-text">Epitope Candidates</h1>
                            <Grid
                                style={{ height: "300px" }}
                                data={testDataForFiltered.map((item) => ({
                                    ...item,
                                    ["selected"]:
                                        this.state.selectedFilteredEpitopeState[
                                            getter("range")(item)
                                        ],
                                }))}
                                dataItemKey={"range"}
                                selectable={{
                                    enabled: true,
                                    cell: false,
                                    drag: true,
                                    mode: "multiple",
                                }}
                                selectedField={"selected"}
                                onSelectionChange={
                                    this.handleFiltedEpitopeSelectionChanged
                                }
                            >
                                <Column
                                    field="selected"
                                    title="Select"
                                    headerSelectionValue={false}
                                />
                                <Column field="range" title="Range" />
                                <Column
                                    field="aminoAcids"
                                    title="Amino Acids"
                                />
                            </Grid>
                        </div>
                        <div className="epitope_seq_non_filtered">
                            <h1 className="header-text">Rest of epitopes</h1>
                            <Grid
                                style={{ height: "300px" }}
                                data={testDataForNonFiltered.map((item) => ({
                                    ...item,
                                    ["selected"]:
                                        this.state
                                            .selectedNonFiltedEpitopeState[
                                            getter("range")(item)
                                        ],
                                }))}
                                dataItemKey={"range"}
                                selectable={{
                                    enabled: true,
                                    cell: false,
                                    drag: true,
                                    mode: "multiple",
                                }}
                                selectedField={"selected"}
                                onSelectionChange={
                                    this.handleNonFiltedEpitopeSelectionChanged
                                }
                            >
                                <Column
                                    field="selected"
                                    title="Select"
                                    headerSelectionValue={false}
                                />
                                <Column field="range" title="Range" />
                                <Column
                                    field="aminoAcids"
                                    title="Amino Acids"
                                />
                            </Grid>
                        </div>
                    </div>
                    <div className="epitope_mol_graph">
                        <h1 className="header-text">
                            Protein Structure Viewer
                        </h1>
                        <div className="epitope_mol" id="result_mol"></div>
                    </div>
                </div>
            </div>
        );
    }
}
/**
 * dataGrid doc :https://github.com/adazzle/react-data-grid/blob/main/README.md
 */
/**
 * Define grid columns
 */
const columns = [
    { key: "name", name: "Protein Name", editable: true },
    { key: "accessionNumber", name: "Accession No.", editable: true },
    { key: "organism", name: "Organism", editable: true },
    { key: "taxonomyID", name: "Taxonomy ID", editable: true },
    { key: "taxonomyPath", name: "Taxonomy Path", editable: true },
    { key: "knownStructure", name: "Known Structure", editable: true },
];
/**
 * test data
 */
let representativeVirus = [
    {
        name: "Lymphocystis disease virus 1",
        accessionNumber: "P22176",
        organism: "Lymphocystis disease virus 1 (isolate Darai) (LCDV-1)",
        taxonomyID: "654922",
        taxonomyPath:
            "Viruses › Varidnaviria › Bamfordvirae › Nucleocytoviricota › Megaviricetes › Pimascovirales › Iridoviridae › Alphairidovirinae › Lymphocystivirus › ",
        knownStructure: "",
    },
    {
        name: "Infectious spleen and kidney necrosis virus (ISKNV)",
        accessionNumber: "testaccessrep",
        organism: "Infectious spleen and kidney necrosis virus (ISKNV)",
        taxonomyID: "180170",
        taxonomyPath:
            "tesViruses › Varidnaviria › Bamfordvirae › Nucleocytoviricota › Megaviricetes › Pimascovirales › Iridoviridae › Alphairidovirinae › MegalocytivirustTaxPathrep",
        knownStructure: "",
    },
];

let testVirus = {
    virusName: "Singapore grouper iridovirus(SGIV) - Major capsid protein",
    accessionNumber: "Q5YFJ3",
    organism: "Singapore grouper iridovirus",
    taxonomyID: "262968",
    taxonomyPath:
        "Viruses › Varidnaviria › Bamfordvirae › Nucleocytoviricota › Megaviricetes › Pimascovirales › Iridoviridae › Alphairidovirinae › Ranavirus",
    knownStructure: "6OJN",
    accessionNumberHyperLink: "https://www.uniprot.org/uniprot/Q5YFJ3",
};

let testDataForFiltered = [
    {
        range: "50-80",
        aminoAcids: "qikdllvsss",
    },
    {
        range: "42-60",
        aminoAcids: "tdldttlvlv",
    },
    {
        range: "80-100",
        aminoAcids: "sgdlsmlvll",
    },
    {
        range: "200-250",
        aminoAcids: "gviedikhsp",
    },
];

let testDataForNonFiltered = [
    {
        range: "115-120",
        aminoAcids: "asdasda",
    },
    {
        range: "130-144",
        aminoAcids: "asdasdawgfvbold",
    },
    {
        range: "95-102",
        aminoAcids: "asdasda",
    },
    {
        range: "115-125",
        aminoAcids: "asdasda",
    },
];

/**
 * d3 tree: https://www.npmjs.com/package/@dkile/react-d3-tree#customizing-the-tree
 */
const orgChart = {
    name: "Iridoviridae",
    children: [
        {
            name: "Alphairidovirinae",
            children: [
                {
                    name: "Lymphocystivirus",
                },
                {
                    name: "Megalocytivirus",
                },
                {
                    name: "Ranavirus",
                    children: [
                        {
                            name: "Singapore grouper iridovirus",
                        },
                    ],
                },
            ],
        },
        {
            name: "Betairidovirinae",
            children: [
                {
                    name: "Chloriridovirus",
                },
                {
                    name: "Decapodiridovirus",
                },
                {
                    name: "Iridovirus",
                },
            ],
        },
    ],
};

export default AnalysisResult;
