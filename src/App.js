import './App.css';
import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
	BrowserRouter,
	Switch,
	Route,
	Routes,
	Link
} from "react-router-dom";
export default class App extends Component {
	c = 'nipun';
	render() {
		return (
			<>
				<BrowserRouter>
					<div className='bg-dark'>
						<Navbar />




						<Routes>
							<Route exact path="/Business" element={<News key="business" country='in' category='business' />} />
							<Route exact path="/Entertainment" element={<News key="entertainment" country='in' category='entertainment' />} />
							<Route exact path="/Health" element={<News key="health" country='in' category='health' />} />
							<Route exact path="/Science" element={<News key="science" country='in' category='science' />} />
							<Route exact path="/Sports" element={<News key="sports" country='in' category='sports' />} />
							<Route exact path="/Technology" element={<News key="technology" country='in' category='technology' />} />
							<Route exact path="/" element={<News key="home" country='in' category='general' />} />
						</Routes>
					</div>
				</BrowserRouter>
			</>
		);
	}
}
