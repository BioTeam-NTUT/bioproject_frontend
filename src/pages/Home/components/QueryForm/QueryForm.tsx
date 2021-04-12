import React from 'react';
import { HostList } from '../HostList';

type Inputs = {
    type: string,
    text: string,
    requiredRecords?: number,
    useEmail: boolean,
    email?: string,
    genTaxonomy: boolean,
    LE: {
        threshold: number,
        minLength: number,
    }
};

class QueryForm extends React.Component<{}, Inputs> {
    componentWillMount() {
        this.setState({
            type: "Sequence",
            text: "",
            useEmail: false,
            genTaxonomy: false,
            LE: {
                threshold: 3,
                minLength: 5
            }
        });
    }

    render() {
        return (
            <div className="grid grid-cols-2 gap-2 bg-yellow-50 p-3 rounded">
                <div>
                    <label>Select a method to analyze</label>
                    <form id="query" action="">
                        
                    </form>
                </div>
                <div>
                    <label htmlFor="hosts">Hosts</label>
                    <HostList />
                </div>
            </div>
        );
    }
}

export default QueryForm;