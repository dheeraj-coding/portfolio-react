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
            <li onWheel={this.props.onWheel} ><div>{this.props.name}</div></li>
        );
    }
}

class Slider extends React.Component{
    constructor(props){
        super(props);
        this.menuList=['Home','Works','About','Resume'];
        this.handleWheel=this.handleWheel.bind(this);
    }
    
    handleWheel(i){
        return function (event){
            event.preventDefault();
            event.stopPropagation();
            let rectObj=document.getElementById("slider").children[i].getBoundingClientRect();
            let scrollPoint=rectObj.height*i;
            function scroller(dir,timerID){
                if(dir){
                    if(scrollPoint<rectObj.height*(i+1)){
                        scrollPoint+=50;
                        document.getElementById("slider").scrollTo(0,scrollPoint);    
                    }else{
                        document.getElementById("slider").scrollTo(0,rectObj.height*(i+1));
                        clearInterval(timerID);
                    }
                }else{
                    if(scrollPoint>rectObj.height*(i-1)){
                        scrollPoint-=50;
                        document.getElementById("slider").scrollTo(0,scrollPoint);    
                    }else{
                        document.getElementById("slider").scrollTo(0,rectObj.height*(i-1));
                        clearInterval(timerID);
                    }
                }

            }
            if(event.deltaY>0){
                let timerID=setInterval(()=>scroller(1,timerID),10);
            }
            if(event.deltaY<0){
                let timerID=setInterval(()=>scroller(0,timerID),10);
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