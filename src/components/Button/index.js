import React from "react"
import PropTypes from "prop-types"

export default class Button extends React.Component {
    static propTypes = {
        icon: PropTypes.element,
        label: PropTypes.string,
        onClick: PropTypes.func
    }

    render() {
        const {icon, label, onClick} = this.props

        return (
            <a onClick={() => onClick ? onClick() : true} className={"app-btn"}>{label}</a>
        )
    }
}