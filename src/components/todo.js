import { Component } from "react";
import { render } from "@testing-library/react";


class TodoList extends Component{
    constructor(props){
        super(props);
        this.state = {
            notas: []
        }
    }
}
getValor(e){
    if(e.keyCode === 13 && e.target.value !== ''){
        this.setState({
            notas: this.state.notas.concact(e.target.value)
        })

    }
}

render(){
    <div className="container">
        <div className="row">
            <div className="col">
                <input type="text" onKeyDown={e => this.getValor(e)}/>
            </div>
        </div>
    </div>
}
