import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'
import api from './core/api'
import Home from './pages/home'
import EditContributor from './pages/EditContributor'
import NewContributor from './pages/NewContributor'

function App() {

    const [contributors, setContributors] = useState([])

    const getAllContributors = async (filter) => {
        const response = await api.get('/contributors')
        if(filter){
            console.log(filter)
            const data = response.data
            return data.filter(contributor => console.log(contributor.peso >= filter))
        }
        return response.data
    }

    useEffect( () => {
        const allContributors = async () => {
            const contributors = await getAllContributors()
            if (contributors) { setContributors(contributors) }
        }

        allContributors()
    }, [])

    const addNewContributor = async (contributor) => {        
        const request = {
            ...contributor
        }

        const response = await api.post('/contributors', request)
        setContributors([...contributors, response.data])
    }

    const updateContributor = async (contributor) => {
        const response = await api.put(`/contributors/${contributor.id}`, contributor);
        const { id, nome_usuario, peso, altura, atleta, lactose } = response.data;
        setContributors(
            contributors.map((contributor) => {
                return contributor.id === id ? { ...response.data } : contributor;
            })
        );
    };

    const removeContributor = async (id) => {
        await api.delete(`/contributors/${id}`)
        const newContributor = contributors.filter((contributor) => {
            return contributor.id !== id
        })

        setContributors(newContributor)
    }

    return (
        <Router>
            <Switch>
                <Route 
                    path="/"
                    exact 
                    render={(props) => (
                        <Home
                            {...props}
                            getContributorId={removeContributor}
                            contributors={contributors}
                            getAllContributors={getAllContributors}
                        />
                    )}
                />
                <Route
                    path="/new-contributor"
                    // exact
                    render={(props) => (
                        <NewContributor
                            {...props}
                            addNewContributor={addNewContributor}
                        />
                    )} 
                />
                <Route 
                    path='/edit'
                    render={(props) => (
                        <EditContributor 
                            {...props}
                            updateContributor={updateContributor}
                        />
                    )}
                />
                <Redirect from="*" to='/' />
            </Switch>
        </Router>
    )
}

export default App