import React from 'react'

import './edit-contributor.scss'

class EditContributor extends React.Component {

    constructor(props) {
        super(props);
        const { id, nome_usuario, peso, altura, atleta, lactose } = props.location.state.contributor;
        this.state = {
            id,
            nome_usuario,
            peso,
            altura,
            atleta,
            lactose
        };
    }

    update = (e) => {
        e.preventDefault()

        if(!this.state.nome_usuario || !this.state.peso || !this.state.altura) {
            alert('Por favor, preencha todos os campos!');
            return
        }

        // this.setState({peso: parseFloat(this.state.peso)})
        // console.log(typeof(this.state.peso))
        // this.setState.altura = parseFloat(this.state.altura)

        this.props.updateContributor(this.state)
        this.setState({
            nome_usuario: '',
            peso: 0,
            altura: 0,
            atleta: 0,
            lactose: 0
        })
        this.props.history.push('/')
    }


    render() {
        return (
            <div className="edit-contributor-wrapper">
                <form id="new-contributor" onSubmit={this.update}>
    
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name" name="name" value={this.state.nome_usuario} onChange={e => this.setState({nome_usuario: e.target.value})}/>
    
                    <label htmlFor="weight">Peso</label>
                    <input type="number"id="weight" name="weight" value={this.state.peso} onChange={e => this.setState({peso: parseFloat(e.target.value)})}/>
    
                    <label htmlFor="height">Altura</label>
                    <input type="number" id="height" name="height" value={this.state.altura} onChange={e => this.setState({altura: parseFloat(e.target.value)})}/>
    
                    <label htmlFor="athlete">Atleta</label>
                    <select form="new-contributor" name="athlete" id="athlete" value={this.state.atleta} onChange={e => this.setState({atleta: parseInt(e.target.value)})}>
                        <option value="0">Não</option>
                        <option value="1">Sim</option>
                    </select>
                
                    <label htmlFor="lactose">Lactose</label>
                    <select form="new-contributor" name="lactose" id="lactose" value={this.state.lactose} onChange={e => this.setState({lactose: parseInt(e.target.value)})}>
                        <option value="0">Não</option>
                        <option value="1">Sim</option>
                    </select>
                    
                    <button className="save-contributor">Salvar</button>
                </form>
            </div>
        )
    }
}

export default EditContributor