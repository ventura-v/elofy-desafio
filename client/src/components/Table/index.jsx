import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BaseCheckbox from '../Input/BaseCheckbox'

import { ReactComponent as EditIcon } from '../../core/assets/icons/edit.svg'
import { ReactComponent as DeleteIcon } from '../../core/assets/icons/delete.svg'
import { ReactComponent as DropUpIcon } from '../../core/assets/icons/arrow_drop_up.svg'
import { ReactComponent as DropDownIcon } from '../../core/assets/icons/arrow_drop_down.svg'

import './table.scss'

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config)

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items]
        if(sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1
                }
                return 0
            })
        }
        return sortableItems
    }, [items, sortConfig])

    const ascRequestSort = key => {
        let direction = 'ascending'
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
        }
        setSortConfig({ key, direction })
    }

    const descRequestSort = key => {
        let direction = 'descending'
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'descending') {
        }
        setSortConfig({ key, direction })
    }

    return { items: sortedItems, ascRequestSort, descRequestSort, sortConfig }

}

const DataTable = (props) => {

    const { items, ascRequestSort, descRequestSort } = useSortableData(props.data)

    const deleteContributor = (id) => {
        props.getContributorId(id)
    }

    class ContributorsList extends React.Component {

        render() {
            return (
                <table className="table-wrapper" cellPadding={0} cellSpacing={0}>
                    <tbody className="table-content">
                        <tr className="table-header">
                            <td className="check-all-wrapper">
                                <input
                                    id="check-all"
                                    type="checkbox"
                                    name="all-checked"
                                    value="check-all"
                                />
                            </td>
                            <td className="table-name-wapper">
                                Nome
                                <div className="drop-wrapper">
                                    <DropUpIcon className="drop-up" onClick={() => ascRequestSort('nome_usuario')}/>
                                    <DropDownIcon className="drop-down" onClick={() => descRequestSort('nome_usuario')}/>
                                </div>
                            </td>
                            <td>Altura (m)</td>
                            <td>Peso (kg)</td>
                            <td>Atleta</td>
                            <td>Lactose</td>
                        </tr>
                        {items.map( (contributor, index) => (
                            <tr className="contributor-row" key={index}>
                                <td className="contributor-check">
                                    <BaseCheckbox
                                        key={index}
                                        id={contributor.id}
                                        name={contributor.nome_usuario}
                                        selected={contributor.selected}
                                    />
                                </td>
                                <td className="contributor-name">{contributor.nome_usuario}</td>
                                <td className="contributor-height">{parseFloat(contributor.altura).toFixed(2)}</td>
                                <td className="contributor-weight">{parseFloat(contributor.peso).toFixed(1)}</td>
                                <td className="contributor-athlete">{contributor.atleta === 1 ? "Sim" : "Não"}</td>
                                <td className="contributor-lactose">{contributor.lactose === 1 ? "Sim" : "Não"}</td>
                                <td className="contributor-edit">
                                    <Link to={ {pathname: '/edit', state: {contributor: contributor} }} >
                                        <EditIcon />
                                    </Link> 
                                </td>
                                <td className="contributor-delete">
                                    <button onClick={() => deleteContributor(contributor.id)}>
                                        <DeleteIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>           
                </table>
            )
        }
    }

    return (
        <>
            <ContributorsList />
        </>
    )
}

export default DataTable