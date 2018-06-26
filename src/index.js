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
class Menu extends React.Component{
    render(){
        return(
            <li onWheel={this.props.onWheel}><div>{this.props.name}</div></li>
        );
    }
}

class Slider extends React.Component{
    constructor(props){
        super(props);
        this.menuList=['Home','Works','About','Resume'];
        this.handleWheel=this.handleWheel.bind(this);
        this.handleKeyPress=this.handleKeyPress.bind(this);
    }
    
    handleWheel(i){
        return function (event){
            let rect=document.getElementById("slider").children[i].getBoundingClientRect();
            if(event.deltaY>0){
                document.getElementById("slider").scrollTo(0,rect.height*(i+1));
            }
            if(event.deltaY<0){
                document.getElementById("slider").scrollTo(0,rect.height*(i-1));
            }
            
        }
    }

    handleKeyPress(i){
        return function (event){
            console.log(event.key);
            let rect=document.getElementById("slider").children[i].getBoundingClientRect();
            if(event.keyCode===38){
                document.getElementById("slider").scrollTo(0,rect.height*(i+1));
            }
            if(event.keyCode===40){
                document.getElementById("slider").scrollTo(0,rect.height*(i-1));
            }
            
        }
    }
    
    render(){
        return(
            <ul id="slider">
                <Menu name={this.menuList[0]} onWheel={this.handleWheel(0)} />
                <Menu name={this.menuList[1]} onWheel={this.handleWheel(1)} />
                <Menu name={this.menuList[2]} onWheel={this.handleWheel(2)} />
                <Menu name={this.menuList[3]} onWheel={this.handleWheel(3)} />
            </ul>
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
                <div className="container">
                    <div className="box">
                        <Slider />
                    </div>
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <App/>,document.getElementById('root')
);