
import React from 'react';

interface Param {
    id: number;
    name: string;
    type: string;
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
}

interface Props {
    params: Param[];
    model: Model;

}

interface State {
    paramValues: ParamValue[];
}



class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            paramValues: props.model.paramValues,
        };
    }

    handleParamChange = (paramId: number, value: string) => {

        const updatedParamValues = this.state.paramValues.map((paramValue) => {
            if (paramValue.paramId === paramId) {
                return { ...paramValue, value };
            }
            return paramValue;
        });
        this.setState({ paramValues: updatedParamValues });
    };

    getModel = (): Model => {
        return {
            paramValues: this.state.paramValues,
        };
    };

    render() {
        return (
            <div>
                {this.props.params.map((param) => (
                    <div key={param.id}>

                        <label htmlFor={`param-${param.id}`}>{param.name}</label>
                        <input
                            id={`param-${param.id}`}
                            type="text"
                            value={
                                this.state.paramValues.find(
                                    (paramValue) => paramValue.paramId === param.id
                                )?.value || ''
                            }
                            onChange={(e) => {
                                this.handleParamChange(param.id, e.target.value)
                            }

                            }
                        />
                    </div>
                ))}

            </div>
        );
    }
}

export default ParamEditor;

