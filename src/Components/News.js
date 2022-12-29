import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
export default class News extends Component {
	static defaultProps = {
		country: 'in',
		category: 'general',
	};

	static propTypes = {
		country: PropTypes.string,
		pageSize: PropTypes.number,
	};
	articles = [];
	constructor() {
		super();
		console.log('my name is Nipun Garg');
		this.state = {
			articles: this.articles,
			page: 1,
			loading: false,
		};
	}

	async componentDidMount() {
		console.log('cdm');
		let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=d776bfc72b2c4b8089a62138994236c6&pageSize=9`;
		this.setState({
			loading: true,
		});
		let data = await fetch(url);
		let parsedData = await data.json();
		this.setState({
			articles: parsedData.articles,
			totalResults: parsedData.totalResults,
			loading: false,
		});
		console.log('afterSetstate');
	}

	handlePrevClick = async () => {
		let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country
			}&apiKey=d776bfc72b2c4b8089a62138994236c6&page=${this.state.page - 1
			}&pageSize=9`;
		this.setState({
			loading: true,
		});
		let data = await fetch(url);
		let parsedData = await data.json();
		this.setState({
			page: this.state.page - 1,
			articles: parsedData.articles,
			loading: false,
		});
	};

	handleNextClick = async () => {
		if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 9))) {
			let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country
				}&apiKey=d776bfc72b2c4b8089a62138994236c6&page=${this.state.page + 1
				}&pageSize=9`;
			this.setState({
				loading: true,
			});
			let data = await fetch(url);
			let parsedData = await data.json();
			this.setState({
				page: this.state.page + 1,
				articles: parsedData.articles,
				loading: false,
			});
		}
	};

	render() {
		// let url =
		//     'https://newsapi.org/v2/top-headlines?category=${this.props.category}&${this.props.country}&apiKey=d776bfc72b2c4b8089a62138994236c6';
		// let data = fetch(url);
		// let parsedData = data.json();
		// console.log(parsedData);
		// this.setState({ articles: parsedData.articles });
		return (
			<>
				{/* {`${console.log('inside render')}`} */}
				<div className='container my-5'>
					<h2 className='text-center text-primary'>newsMonkey Top Headlines</h2>
					{this.state.loading && <Spinner />}
					<div className='row my-3'>
						{!this.state.loading &&
							this.state.articles.map((element) => {
								return (
									<div
										className='column col-md-4 my-3'
										key={element.url}
									>
										<NewsItem
											title={
												element.title
													? element.title.slice(0, 45)
													: ''
											}
											description={
												element.description
													? element.description.slice(
														0,
														88
													)
													: ''
											}
											imgUrl={element.urlToImage}
											newsUrl={element.url}
										/>
									</div>
								);
							})}
					</div>
				</div>

				<div className='container d-flex justify-content-between '>
					<button
						type='button'
						disabled={this.state.page <= 1}
						className='btn btn-info'
						onClick={this.handlePrevClick}
					>
						&larr; Previous
					</button>
					<button
						type='button'
						disabled={
							this.state.page + 1 >
							Math.ceil(this.state.totalResults / 9)
						}
						className='btn btn-info'
						onClick={this.handleNextClick}
					>
						Next &rarr;
					</button>
				</div>
			</>
		);
	}
}
