import React, { Component } from 'react';
import Button from '../../components/Button';
import FormInput, { traverse } from '../../services/engine/builder';
import { InputText } from '../../components/InputText';
import { InputSelect } from '../../components/InputSelect';
import { getStorage, setStorage } from '../../services/storage/storage';

export default class Builder extends React.Component {
    constructor(props) {
        super(props)

        const cachedData = getStorage("formData")

        this.formInput = new FormInput("Tree")

        if (cachedData) {
            this.formInput.childs = cachedData.childs
        }

        this.state = {
            tree: []
        }

        this.conf = {}

    }

    componentDidMount() {
        traverse(1, this.formInput, this.inputElement);
    }

    inputElement = (parent, indent) => {
        if (!parent.getConf) {
            parent.__proto__ = new FormInput()
        }

        const parentConf = parent.getConf()

        const input = new FormInput({
            question: this.state.questionValue,
            type: this.state.typeValue
        })

        const el = 
            <div 
                style={{marginLeft: indent * 20, marginRight: indent * 20}}
                className={"form-input-container"}
            >
                    {indent > 1 &&
                    <div>
                        <InputText
                            label={"Question"}
                            onChange={(e) => {
                                this.conf.questionValue = e
                            }} 
                            defValue={false}
                            onBlur={() => {
                                input.setConf(this.conf)
                            }}
                        />

                        {parentConf.type &&
                        <InputSelect 
                            label={"Condition"}
                            options={
                                parentConf.type == "text"
                                ? [
                                    {label: "Equals", value: "="},
                                ]
                                : parentConf.type == "radio"
                                ? [
                                    {label: "Equals", value: "="},
                                ]
                                : [
                                    {label: "Equals", value: "="},
                                    {label: "Greater then", value: ">"},
                                    {label: "Less then", value: "<"},
                                ]
                            }
                            onChange={(e) => this.conf.condition = e }
                        />
                        }
                        
                        {parentConf.type &&
                        <InputText
                            label={"Condition value"}
                            onChange={(e) => {
                                this.conf.conditionValue = e
                            }} 
                            onBlur={() => input.setConf(this.conf) }
                        />
                        }

                        <InputSelect 
                            label={"Type"}
                            options={[
                                {label: "Text", value: "text"},
                                {label: "Yes/No", value: "radio"},
                                {label: "Number", value: "number"}
                            ]}
                            onChange={(e) => {this.conf.type = e; this.setState({confType: e})} }
                        />
                    </div>
                    }
                    
                

                <Button label={indent === 1 ? "Add input" : "Add sub-input"} onClick={() => {
                    console.clear()

                    this.state.tree = []

                    parent.add(input)

                    setStorage("formData", this.formInput)


                    traverse(1, this.formInput, this.inputElement);
                }}/>

                <Button label={indent === 1 ? "Reset" : "Remove subs"} onClick={() => {
                    this.state.tree = []

                    parent.remove(input)

                    setStorage("formData", this.formInput)

                    traverse(1, this.formInput, this.inputElement, null);

                }}/>

            </div>
        this.state.tree.push(el)

        return this.setState( {refresh: true} )
    }


    render() {
        return (
            <div className={"app-container"}>
                <div className={"app-builder-container"}>
                    {this.state.tree.map( (e, k) => <div key={k}>{e}</div> )}
                </div>
            </div>
        )
    }
}