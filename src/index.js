import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import Profile from './profile.jpeg';
class Header extends React.Component{
    render(){
        return(
            <header id="header-bar">
                <img src={Profile} />
                <h1>McDhee</h1>
            </header>
        );
    }
}
class Container extends React.Component{
    render(){
        return(
            <div class="container">
                <div class="box">

                </div>

            </div>
        );
    }
}
class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <Header/>
                <Container/>
            </div>
        );
    }
}


ReactDOM.render(
    <App/>,document.getElementById('root')
);