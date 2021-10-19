import React from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './Result.css';
import VirusData from './components/VirusData/FileInput/VirusData';
import DataGrid from 'react-data-grid';
import { Calendar } from '@progress/kendo-react-dateinputs'
import { Grid, GridCellProps, GridColumn as Column } from '@progress/kendo-react-grid';
import Tree from 'react-d3-tree';
const $3Dmol = window.$3Dmol;
class Result extends React.Component<{}, {}> {
    constructor(props: {}) {
      super(props);
    }
    /**
     * 3D MOL https://3dmol.csb.pitt.edu/doc/tutorial-code.html
     */
    componentDidMount() {
      let element = $("#result_mol");
      let config = { backgroundColor: 'white' };
      let glviewer = $3Dmol.createViewer( element, config );
      let pdbUri = 'https://files.rcsb.org/view/6OJN.pdb';
      jQuery.ajax( pdbUri, { 
        success: function(data) {
          let v = glviewer;
          v.addModel( data, "pdb" );                      
          v.setStyle({}, {cartoon: {color: 'spectrum'}});  
          v.zoomTo();                                      
          v.render();                                     
          v.zoom(1.2, 1000);                              
          v.setStyle({chain:'B'},{cartoon:{color:'spectrum'}});
          v.setStyle({chain:'B',invert:true},{cartoon:{}});
          v.setStyle({bonds: 0},{sphere:{radius:0.5}}); //water molecules
          v.setStyle({resn:'PMP',byres:true,expand:5},{stick:{colorscheme:"greenCarbon"}});
          v.setStyle({resi:["91-95","42-50"]},{cartoon:{color:"green",thickness:1.0}});
          v.render();
        },
        error: function(hdr, status, err) {
          console.error( "Failed to load PDB " + pdbUri + ": " + err );
        },
      });
    }
    render() {
      return (
        <div className="bg-gradient-root" id="result">
          <div className="targetGrid">
            <h1 className="header-text">Target Virus</h1>
            <VirusData VirusDataInfo={testVirus}></VirusData>
            {/* <Grid
              style={{ width:'100%' }}
              data={representativeVirus}
            >
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
            <Grid
              style={{ width:'100%' }}
              data={representativeVirus}
            >
              <Column field='name' title='Protein Name' />
              <Column field='accessionNumber' title='Accession No.'/>
              <Column field='organism' title='Organism'/>
              <Column field='taxonomyID' title='Taxonomy ID'/>
              <Column field='taxonomyPath' title='Taxonomy Path'/>
              <Column field='knownStructure' title='Known Structure'/>
            </Grid>
          </div>
          <div className="treeWrapper">
            <h1 className="header-text">Hierarchical Tree</h1>
            <div className="taxanomy_tree">
              <Tree data={orgChart} orientation="vertical" pathFunc="elbow" nodeSize={{ x: 100, y: 100 }} />
            </div>
          </div>
          <div className="epitope">
            <div className="epitope_seq">
              <div className="epitope_seq_filtered">
                <h1 className="header-text">Filtered Epitope</h1>
                <Grid
                  style={{ width:'100%' }}
                  data={testData}
                >
                  <Column field='select' title='Select' 
                    cell={(props: GridCellProps) => (
                    <td>
                      <input
                        disabled={false}
                        type="checkbox"
                        checked={props.dataItem[props.field || ""]}
                      />
                      </td>
                    )}/>
                  <Column field='range' title='Range'/>
                  <Column field='aminoAcids' title='Amino Acids'/>
                </Grid>
              </div>
              <div className="epitope_seq_non_filtered">
                <h1 className="header-text">Non-filtered Epitope</h1>
                <Grid
                  style={{ width:'100%' }}
                  data={testData}
                >
                  <Column field='select' title='Select' 
                    cell={(props: GridCellProps) => (
                    <td>
                      <input
                        disabled={false}
                        type="checkbox"
                        checked={props.dataItem[props.field || ""]}
                      />
                      </td>
                    )}/>
                  <Column field='range' title='Range'/>
                  <Column field='aminoAcids' title='Amino Acids'/>
                </Grid>
              </div>
            </div>
            <div className="epitope_mol_graph">
              <h1 className="header-text">Secondary structure</h1>
              <div className="epitope_mol" id="result_mol">
              </div>
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
    { key: "knownStructure", name: "Known Structure", editable: true }
  ];
  /**
   * test data
   */
  let representativeVirus=[
    {
      name: "rep",
      accessionNumber: "testaccessrep",
      organism: "testorganismrep",
      taxonomyID: "testTaxonomyrep",
      taxonomyPath: "testTaxPathrep",
      knownStructure: "testStructurerep"
    }
  ];
  let testVirus=
    {
      virusName: "rep",
      accessionNumber: "testaccessrep",
      organism: "testorganismrep",
      taxonomyID: "testTaxonomyrep",
      taxonomyPath: "testTaxPathrep",
      knownStructure: "testStructurerep",
      accessionNumberHyperLink: "https://blast.ncbi.nlm.nih.gov/Blast.cgi#alnHdr_YP_009552282"
    }
  ;
  let testData=[
    {
      range: "115-120",
      aminoAcids: "asdasda"
    }
  ]
  /**
   * d3 tree: https://www.npmjs.com/package/@dkile/react-d3-tree#customizing-the-tree
   */
  const orgChart = {
    name: 'CEO',
    children: [
      {
        name: 'Manager',
        attributes: {
          department: 'Production',
        },
        children: [
          {
            name: 'Foreman',
            attributes: {
              department: 'Fabrication',
            },
            children: [
              {
                name: 'Worker',
              },
            ],
          },
          {
            name: 'Foreman',
            attributes: {
              department: 'Assembly',
            },
            children: [
              {
                name: 'Worker',
              },
            ],
          },
        ],
      },
    ],
  };
  
export default Result;