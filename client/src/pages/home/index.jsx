import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import DataTable from '../../components/Table'

import { ReactComponent as AddIcon } from '../../core/assets/icons/add_circle_outline.svg'
import { ReactComponent as CloseIcon } from '../../core/assets/icons/close.svg'
import { ReactComponent as FilterIcon } from '../../core/assets/icons/filter_list.svg'
import { ReactComponent as SearchIcon } from '../../core/assets/icons/search.svg'

import './home.scss'

const Home = (props) => {

    const [q, setQ] = useState("")
    const [filtered, setFiltered] = useState({
        peso: null,
        altura: null,
        atleta: null,
        lactose: null
    })
    const [showFilter, setShowFilter] = useState(false)
    const toggleFilter = () => setShowFilter(!showFilter)

    const search = (rows) => {
        if (filtered){
            if(filtered.peso){
                let weight = filtered.peso
                if(weight >= 90){
                    return rows.filter(row => row.peso >= weight)
                } else if (weight <= 69){
                    return rows.filter(row => row.peso <= weight)
                } else {
                    return rows.filter(row => row.peso > 69 && row.peso < 90)
                }
            }
            if(filtered.altura){
                let height = filtered.altura
                if(height >= 1.8){
                    return rows.filter(row => row.altura >= height)
                } else if (height <= 1.59){
                    return rows.filter(row => row.altura <= height)
                } else {
                    return rows.filter(row => row.altura > 1.59 && row.altura < 1.8)
                }
            }
            if(filtered.atleta){
                let athlete = filtered.atleta
                if(athlete === "athlete"){
                    return rows.filter(row => row.atleta === 1)
                } else {
                    return rows.filter(row => row.atleta === 0)
                }
            }
            if(filtered.lactose){
                let lactose = filtered.lactose
                if(lactose === "lactose"){
                    return rows.filter(row => row.lactose === 1)
                } else {
                    return rows.filter(row => row.lactose === 0)
                }
            }
        }
        return rows.filter(row => row.nome_usuario.toLowerCase().indexOf(q) > -1)
    }
    
    const Filter = () => {
            return (
                <div className="filter-wrapper">
                    <button className="close-wrapper" onClick={() => setShowFilter(!showFilter)}>
                        <CloseIcon />
                    </button>
                    <form className="filter-form">
                        <div className="filter weight">
                            <p>Peso</p>
    
                            <div className="radio-wrapper">
                                <input type="radio" id="weight-over" name="weight" value={90} onChange={e => setFiltered({peso: e.target.value})}/>
                                <label htmlFor="weight-over">90kg ou mais</label>
                            </div>
    
                            <div className="radio-wrapper">
                                <input type="radio" id="weight-ideal" name="weight" value={70} onChange={e => setFiltered({peso: e.target.value})}/>
                                <label htmlFor="weight-ideal">entre 70 e 89kg</label>
                            </div>
    
                            <div className="radio-wrapper">
                                <input type="radio" id="weight-under" name="weight" value={69} onChange={e => setFiltered({peso: e.target.value})}/>
                                <label htmlFor="weight-under">abaixo de 69kg</label>
                            </div>
    
                        </div>
                        <div className="filter height">
                            <p>Altura</p>
    
                            <div className="radio-wrapper">
                                <input type="radio" id="height-over" name="height" value={1.8} onChange={e => setFiltered({altura: e.target.value})}/>
                                <label htmlFor="height-over">acima de 1,80m - Altos</label>
                            </div>
    
                            <div className="radio-wrapper">
                                <input type="radio" id="height-ideal" name="height" value={1.6} onChange={e => setFiltered({altura: e.target.value})}/>
                                <label htmlFor="height-ideal">entre 1,60m e 1,79m - Médios</label>
                            </div>
    
                            <div className="radio-wrapper">
                                <input type="radio" id="height-under" name="height" value={1.59} onChange={e => setFiltered({altura: e.target.value})}/>
                                <label htmlFor="height-under">abaixo de 1,59m - Baixos</label>
                            </div>
                        </div>
    
                        <div className="filter athlete">
                            <p>Atleta</p>
    
                            <div className="radio-wrapper">
                                <input type="radio" id="athlete" name="athlete" value="athlete" onChange={e => setFiltered({atleta: e.target.value})}/>
                                <label htmlFor="athlete">Sim</label>
                            </div>
    
                            <div className="radio-wrapper">
                                <input type="radio" id="no-athlete" name="athlete" value="no-athlete" onChange={e => setFiltered({atleta: e.target.value})}/>
                                <label htmlFor="athlete">Não</label>
                            </div>
                        </div>
    
                        <div className="filter lactose">
                            <p>Intolerante à lactose</p>
    
                            <div className="radio-wrapper">
                                <input type="radio" id="lactose" name="lactose" value="lactose" onChange={e => setFiltered({lactose: e.target.value})}/>
                                <label htmlFor="lactose">Sim</label>
                            </div>
    
                            <div className="radio-wrapper">
                                <input type="radio" id="no-lactose" name="lactose" value="no-lactose" onChange={e => setFiltered({lactose: e.target.value})}/>
                                <label htmlFor="lactose">Não</label>
                            </div>
                        </div>
                    </form>
                </div>
            )
    }

    const [data, setData] = useState(props.contributors)
    const [filter, setFilter] = useState('')

    const handleFilter = (value) => {
        setFilter(value)
        let filteredByValue = props.contributors.filter(item => {
            return item.filter === value
        })
        setData(filteredByValue)
        console.log(filteredByValue, value)
    }

    return (
        <div className="home-container">
            <div className="header-wrapper">
                <div className="search-wrapper">
                    <button onClick={toggleFilter}>
                        <FilterIcon className="header-list" />
                    </button>
                    { showFilter ? <Filter data={data} changeOptions={handleFilter}/> : null }
                    <div className="search-text-wrapper">
                        <SearchIcon />
                        <input 
                            type="text" 
                            name="search" 
                            id="search" 
                            placeholder="Buscar" 
                            value={q} 
                            onChange={(e) => setQ(e.target.value)}
                        />
                    </div>
                </div>
                <Link to="/new-contributor">
                    <button className="add-contributor">
                        <AddIcon />
                        Add Contribuidor
                    </button>
                </Link>
            </div>

            <DataTable
                data={search(props.contributors)}
                getContributorId={props.getContributorId}
            />

        </div>
    )
}

export default Home