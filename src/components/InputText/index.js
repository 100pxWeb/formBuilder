import * as React from "react";
import PropTypes from 'prop-types';

export class InputText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labelPosition: this.props.defValue ? 8 : 20,
            fontSize: this.props.defValue ? "0.7em" : "1em",
            value: this.props.defValue ? this.props.defValue : "",
        };

        this.input = null;
    }

    componentDidMount() {
        if (this.props.defValue) {
            this.props.onChange(this.props.defValue, this.props.name)
        }
        if (this.props.value) {
            this.props.onChange(this.props.value, this.props.name)
        }
    }

    changeLabelPosition = (element) => {
        if (element.target.value.length > 0) {
            this.setState({
                labelPosition: 8,
                fontSize: "0.7em",
            })
        } else {
            this.setState({
                labelPosition: 20,
                fontSize: "1em",
            })
        }
    };

    render() {
        const {labelPosition, fontSize} = this.state;
        
        return (
            <div className={"app-form-input-text app-form-input"} style={{display: this.props.type === "hidden" ? "none" : "block"}} key={this.props.key}>
                <div>
                    <label
                        style={{top: labelPosition, fontSize}}
                        className={"app-form-input-label"}
                        htmlFor={this.props.name}
                        onClick={() => this.input.focus()}
                    >{this.props.label}
                        </label>
                </div>

                {/* {this.props.error === this.props.name &&
                <div className={"app-form-input-error"}>Pole wymagane!</div>
                } */}

                <input name={this.props.name}
                       type="text"
                       ref={(e) => this.input = e}
                       placeholder={this.props.placeholder}
                       value={this.state.value}
                       onChange={(e) => {
                            this.setState({
                                value: e.target.value,
                            });
                           this.changeLabelPosition(e);
                           this.props.onChange(e.target.value, this.props.name)
                       }}
                       onBlur={() => this.props.onBlur ? this.props.onBlur() : true}
                       disabled={this.props.disabled}
                />
            </div>
        );
    }
}


InputText.propTypes = {
    required: PropTypes.bool,
    name: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
};