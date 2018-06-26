import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import Profile from './profile.jpeg';
import X from 'react-feather/dist/icons/x';
import Circle from 'react-feather/dist/icons/circle';
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
    }
    
    handleWheel(i,event){
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
            if(event.deltaY>3){
                let timerID=setInterval(()=>scroller(1,timerID),10);
            }
            if(event.deltaY<-3){
                let timerID=setInterval(()=>scroller(0,timerID),10);
            }
            
        
    }
    
    render(){
        return(
            <ul id="slider">
                <Menu name={this.menuList[0]} onWheel={
                    (function(event){
                        this.handleWheel(0,event);
                        if(event.deltaY>3){
                            this.props.update(0,1);
                        }else if(event.deltaY<-3){
                            this.props.update(0,0);
                        }
                        
                        return false;
                    }).bind(this) } />
                <Menu name={this.menuList[1]} onWheel={
                    (function(event){
                        this.handleWheel(1,event);
                        if(event.deltaY>3){
                            this.props.update(1,1);
                        }else if(event.deltaY<-3){
                            this.props.update(1,0);
                        }
                        return false;
                    }).bind(this) } />
                <Menu name={this.menuList[2]} onWheel={
                    (function(event){
                        this.handleWheel(2,event);
                        if(event.deltaY>3){
                            this.props.update(2,1);
                        }else if(event.deltaY<-3){
                            this.props.update(2,0);
                        }
                        return false;
                    }).bind(this) } />
                <Menu name={this.menuList[3]} onWheel={
                    (function(event){
                        this.handleWheel(3,event);
                        if(event.deltaY>3){
                            this.props.update(3,1);
                        }else if(event.deltaY<-3){
                            this.props.update(3,0);
                        }
                        return false;
                    }).bind(this) } />

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
        console.log(i);
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
                    <Box/>
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <App/>,document.getElementById('root')
);

