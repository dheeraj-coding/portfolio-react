import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import Profile from './assets/images/profile.jpeg';
import X from 'react-feather/dist/icons/x';
import Circle from 'react-feather/dist/icons/circle';
import Particles from 'reactparticles.js';
function generateMenu(i){
    return(<Menu name={this.menuList[i]} 
        onWheel={(function(event){
                    this.handleWheel(i,event);
                    if(event.deltaY>3){
                        this.props.update(i,1);
                    }else if(event.deltaY<-3){
                        this.props.update(i,0);
                    }
                    return false;}).bind(this) } 
            />);
}
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
        );1
    }
}
class Indicator extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let xIcon=<X color='rgb(248, 238, 231)' size={12}/>
        let circleIcon=<Circle color='rgb(248, 238, 231)' size={12}/>
        return(
            <ul id="indicator">
                <li>{this.props.focus===0?xIcon:circleIcon}</li>
                <li>{this.props.focus===1?xIcon:circleIcon}</li>
                <li>{this.props.focus===2?xIcon:circleIcon}</li>
                <li>{this.props.focus===3?xIcon:circleIcon}</li>
            </ul>
        );
    }

}
class Slider extends React.Component{
    constructor(props){
        super(props);
        this.menuList=['Home','Works','About','Resume'];
        this.handleWheel=this.handleWheel.bind(this);
        generateMenu=generateMenu.bind(this);
    }
    
    handleWheel(i,event){
            event.preventDefault();
            event.stopPropagation();
            let rectObj=document.getElementById("slider").children[i].getBoundingClientRect();
            let scrollPoint=rectObj.height*i;
            function scroller(dir,timerID){
                if(dir){
                    if((scrollPoint+50)<rectObj.height*(i+1)){
                        scrollPoint+=50;
                        document.getElementById("slider").scrollTo(0,scrollPoint);
                            
                    }else{
                        document.getElementById("slider").scrollTo(0,rectObj.height*(i+1));
                        clearInterval(timerID);
                    }
                }else{
                    if((scrollPoint-50)>rectObj.height*(i-1)){
                        scrollPoint-=50;
                        document.getElementById("slider").scrollTo(0,scrollPoint);    
                    }else{
                        document.getElementById("slider").scrollTo(0,rectObj.height*(i-1));
                        clearInterval(timerID);
                    }
                }

            }
            if(event.deltaY>3){
                let timerID=setInterval(()=>scroller(1,timerID),10);
            }
            if(event.deltaY<-3){
                let timerID=setInterval(()=>scroller(0,timerID),10);
            }          
        
    }

    handleKeyPress(i,event){
        event.preventDefault();
        event.stopPropagation();
        let rectObj=document.getElementById("slider").children[i].getBoundingClientRect();
        let scrollPoint=rectObj.height*i;
        function scroller(dir,timerID){
            if(dir){
                if((scrollPoint+50)<rectObj.height*(i+1)){
                    scrollPoint+=50;
                    document.getElementById("slider").scrollTo(0,scrollPoint);
                        
                }else{
                    document.getElementById("slider").scrollTo(0,rectObj.height*(i+1));
                    clearInterval(timerID);
                }
            }else{
                if((scrollPoint-50)>rectObj.height*(i-1)){
                    scrollPoint-=50;
                    document.getElementById("slider").scrollTo(0,scrollPoint);    
                }else{
                    document.getElementById("slider").scrollTo(0,rectObj.height*(i-1));
                    clearInterval(timerID);
                }
            }

        }
        if(event.keyCode===40){
            let timerID=setInterval(()=>scroller(1,timerID),10);
        }
        if(event.keyCode===38){
            let timerID=setInterval(()=>scroller(0,timerID),10);
        }          
    
    }

    componentDidMount(){
        document.addEventListener("keypress",
            (function(event){
                this.handleKeyPress(this.props.focus,event);
                if(event.keyCode==40){
                    this.props.update(this.props.focus,1);
                }else if(event.keyCode===38){
                    this.props.update(this.props.focus,0);
                }
            }).bind(this)
        );
    }

    render(){
        return(
            <ul id="slider">
                {generateMenu(0)}
                {generateMenu(1)}
                {generateMenu(2)}
                {generateMenu(3)}
                <Indicator focus={this.props.focus}/>
            </ul>
        );
    }
}
class Box extends React.Component{
    constructor(props){
        super(props);
        this.state={active:0};
        this.updateState=this.updateState.bind(this);
    }
    updateState(i,dir){
        this.setState({active:(dir?(i===3?i:i+1):(i===0?i:i-1))});
    }
    render(){
        return(
            <div className="box">
                <Slider update={this.updateState} focus={this.state.active}/>
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
                <div className="container" id="particles-js">
                    <Particles id="particles" config="particlesjs-config.json"/>
                    <Box/>                    
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <App/>,document.getElementById('root')
);

