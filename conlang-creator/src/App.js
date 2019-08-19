// https://scotch.io/tutorials/build-a-to-do-application-using-django-and-react
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'reactstrap';
import Modal from "./components/Modal";
const conlangItems = [
 {
	 id: 1,
	 name: "Shaldean",
	 completed: false
 },
	{
		id: 2,
		name: "Borokanth",
		completed: false
	}
]

class App extends Component {
    constructor(props) {
        super(props);
	this.state = {
	    modal: false,
	    viewCompleted: false,
	    conlangList: conlangItems
	};
    }
    displayCompleted = status => {
	if (status) {
		return this.setState({ viewCompleted: true});
	}
	    return this.setState({ viewCompleted: false });
	};
    renderTabList = () => {
	return (
	    <div className="my-5 tab-list">
	        <span
	          onClick={() => this.displayCompleted(true)}
	          className={this.state.viewCompleted ? "active" : ""}
	        >
	        complete
	        </span>
	        <span
	          onClick={() => this.displayCompleted(false)}
	          className={this.state.viewCompleted? "" : "active"}
	        >
	        incomplete
	        </span>
	    </div>
		);
	};
	renderItems = () => {
	    const {viewCompleted} = this.state;
	    const newItems = this.state.conlangList.filter(
	    item => item.completed == viewCompleted
	    );
	    return newItems.map(item => (
	        <li
	          key={item.id}
		  className="list-group-item d-flex justify-content-between align-items-center"
		>
		    <span
		      className={`conlang-title mr-2 ${
		      this.state.viewCompleted ? "completed-conlang" : ""
		      }`}
		      title={item.description}
		     >
		     </span>
		     <span>
			<button className="btn btn-secondary mr-2">Edit</button>
			<button className="btn btn-danger">Delete</button>
		     </span>
		</li>
		));
	};
	render() {
	    return (
	        <main className="content">
		    <h1 className="text-white text-uppercase text-center my-4"> Conlang app</h1>
		    <div className="row">
		        <div className="col-md-6 col-sm-10 mx-auto p-0">
		            <div className="card p-3">
			        <div className="">
			            <button className="btn btn-primary">Add Conlang</button>
			        </div>
			        {this.renderTabList()}
			        <ul className="list-group list-group-flush">
			            {this.renderItems()}
			        </ul>
			    </div>
		        </div>
		    </div>
		</main>
	    );
        }
}
export default App;
