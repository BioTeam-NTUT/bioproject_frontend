import React from 'react';
import './Result.css';
import DataTable from "react-data-table-component";
import DataGrid from 'react-data-grid';
const $3Dmol = window.$3Dmol;
class Result extends React.Component<{}, {}> {
    constructor(props: {}) {
      super(props);
    }
    /* componentDidMount() {
      let element = $("#about");
      let config = { backgroundColor: 'orange' };
      let glviewer = $3Dmol.createViewer( element, config );
      glviewer.addSphere({ center: {x:0, y:0, z:0}, radius: 10.0, color: 'green' });
      glviewer.zoomTo();
      glviewer.render();
      glviewer.zoom(0.8, 2000);
    } */
    render() {
      return (
        <DataGrid columns={columns} rows={viruses} />
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
    { key: "knownStructure", name: "Known Structure", editable: true }
  ];
  /**
   * test data
   */
  let viruses = [
    {
    name: "Test1",
    accessionNumber: "testaccess1",
    organism: "testorganism",
    taxonomyID: "testTaxonomy",
    taxonomyPath: "testTaxPath",
    knownStructure: "testStructure"
    },
    {
      name: "Test2",
      accessionNumber: "testaccess2",
      organism: "testorganism2",
      taxonomyID: "testTaxonomy2",
      taxonomyPath: "testTaxPath2",
      knownStructure: "testStructure2"
    }
];
export default Result;