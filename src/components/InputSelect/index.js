import * as React from "react";
import PropTypes from 'prop-types';
import { MdArrowDropDown } from "react-icons/md";

export class InputSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.defaultValue,
            listMaxHeight: "0px",
            listPadding: "0px",
            listDisplay: "none",
            listShowed: false,
        };
    }

    toggleList() {
        this.state.listShowed ? this.hideList() : this.showList();
    }

    showList() {
        this.setState({
            listMaxHeight: "1000px",
            listPadding: "10px 20px",
            listDisplay: "block",
            listShowed: true,
        })
    }

    hideList() {
        this.setState({
            listMaxHeight: "0px",
            listPadding: "0px",
            listDisplay: "none",
            listShowed: false,
        })
    }

    render() {
        const data = this.props.options;

        return (
            <div className={"app-form-input-select"}
                 key={this.props.key}
                 onClick={() => this.toggleList()}
                 onBlur={() => this.hideList()}
                 tabIndex={0}
            >
                <div>
                    <label
                        className={"input-select-label"}
                    >{this.props.label}
                    </label>
                </div>

                <div className={"input-select-input"}>
                    <div>{this.state.value ? this.state.value : "Select option"}</div>
                    <div className={"input-select-icon"}><MdArrowDropDown/></div>
                </div>
                <div className={"input-select-list"}
                     style={{
                         maxHeight: this.state.listMaxHeight,
                         padding: this.state.listPadding,
                         display: this.state.listDisplay,
                     }}
                >
                    {data.map((e, k) => {
                        return (
                            <div key={k}
                                 className={"input-select-list-option"}
                                 onClick={() => {
                                     this.props.onChange(e.value, this.props.name);
                                     this.state.value = e.label;
                                     this.hideList();
                                 }}
                            >{e.label}</div>
                        )
                    })}
                </div>
            </div>
        );
    }
}


InputSelect.propTypes = {
    required: PropTypes.bool,
    name: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.array,
};