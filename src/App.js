import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Header from './components/Header'
import Home from './components/Home'
import Detail from './components/Detail'
import { addLocDataToDb } from './firebase'
import movies from './disneyPlusMoviesData.json'
import { useEffect } from 'react'

const App = () => {
	useEffect(() => {
		addLocDataToDb('movies', movies)
	}, [])
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path="/">
					<Login />
				</Route>
				<Route path="/home" component={Home} />
				<Route exact path="/detail/:id" component={Detail} />
			</Switch>
		</Router>
	)
}

export default App
