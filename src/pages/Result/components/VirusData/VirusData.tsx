import React from 'react';
import './VirusData.css';
interface VirusBasicDataProperty {
	virusName: string;
	accessionNumber: string;
	organism: string;
	taxonomyID: string;
	taxonomyPath: string;
	knownStructure: string;
	accessionNumberHyperLink:string;
}

interface Virus{
	VirusDataInfo: VirusBasicDataProperty;
}
const VirusData = (props: Virus) => {
	return (
		<div>
			<h1 className="virusName">{props.VirusDataInfo.virusName}</h1>
			<div className="virusProperty">
				<label>Accession Number: </label>
				<a href={props.VirusDataInfo.accessionNumberHyperLink}>{props.VirusDataInfo.accessionNumber} &nbsp;</a>
				<label>Organism: {props.VirusDataInfo.organism}</label><br></br>
				<label>Taxonomy ID: {props.VirusDataInfo.taxonomyID} &nbsp;</label>
				<label>Taxonomy Path: {props.VirusDataInfo.taxonomyPath}</label><br></br>
				<label>Known Structure: {props.VirusDataInfo.knownStructure}</label>
			</div>
		</div>
		
	);
}

export default VirusData;