import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import Profile from './assets/images/profile.jpeg';
import X from 'react-feather/dist/icons/x';
import Circle from 'react-feather/dist/icons/circle';
import Particles from 'reactparticles.js';
import HomeProfile from './assets/images/home_profile.jpg'
import Up from 'react-feather/dist/icons/chevron-up';
import Down from 'react-feather/dist/icons/chevron-down';
function traverser(opacity,root){
    if(root.children.length===0){
        return;
    }else{
        root.style.opacity=opacity;
        for(let i=0;i<root.children.length;i++){
            traverser(opacity,root.children[i]);
        }
    }
}
function fader(rootId){
    let root=document.getElementById(rootId);
    let opacity=0;
    function callback(ID){
        if(opacity<=1.0){
            opacity=opacity+0.1;
            traverser(opacity,root);
        }else{
            clearInterval(ID);
        }                
    }
    let timerID=setInterval(()=>callback(timerID),50);       
}
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
    constructor(props){
        super(props);
    }
    
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
                    if((scrollPoint+30)<rectObj.height*(i+1)){
                        scrollPoint+=30;
                        document.getElementById("slider").scrollTo({top:scrollPoint,behaviour:'smooth'});
                            
                    }else{
                        document.getElementById("slider").scrollTo({top:rectObj.height*(i+1),behaviour:'smooth'});
                        clearInterval(timerID);
                    }
                }else{
                    if((scrollPoint-30)>rectObj.height*(i-1)){
                        scrollPoint-=30;
                        document.getElementById("slider").scrollTo({top:scrollPoint,behaviour:'smooth'});    
                    }else{
                        document.getElementById("slider").scrollTo({top:rectObj.height*(i-1),behaviour:'smooth'});
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
                if((scrollPoint+30)<rectObj.height*(i+1)){
                    scrollPoint+=30;
                    document.getElementById("slider").scrollTo({top:scrollPoint,behaviour:'smooth'});
                        
                }else{
                    document.getElementById("slider").scrollTo({top:rectObj.height*(i+1),behaviour:'smooth'});
                    clearInterval(timerID);
                }
            }else{
                if((scrollPoint-30)>rectObj.height*(i-1)){
                    scrollPoint-=30;
                    document.getElementById("slider").scrollTo({top:scrollPoint,behaviour:'smooth'});    
                }else{
                    document.getElementById("slider").scrollTo({top:rectObj.height*(i-1),behaviour:'smooth'});
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
class WorksSlider extends React.Component{
    constructor(props){
        super(props);
        this.state={active:0,number:2};
        this.handleClick=this.handleClick.bind(this);
    }
    
    handleClick(i,event,dirFlag){
            event.preventDefault();
            event.stopPropagation();
            let rectObj=document.getElementById("works").children[i].getBoundingClientRect();
            let scrollPoint=rectObj.height*i;
            function scroller(dir,timerID){
                if(dir){
                    if((scrollPoint+30)<rectObj.height*(i+1)){
                        scrollPoint+=30;
                        document.getElementById("works").scrollTo({top:scrollPoint,behaviour:'smooth'});
                            
                    }else{
                        document.getElementById("works").scrollTo({top:rectObj.height*(i+1),behaviour:'smooth'});
                        clearInterval(timerID);
                    }
                }else{
                    if((scrollPoint-30)>rectObj.height*(i-1)){
                        scrollPoint-=30;
                        document.getElementById("works").scrollTo({top:scrollPoint,behaviour:'smooth'});    
                    }else{
                        document.getElementById("works").scrollTo({top:rectObj.height*(i-1),behaviour:'smooth'});
                        clearInterval(timerID);
                    }
                }

            }
            if(dirFlag===0){
                let timerID=setInterval(()=>scroller(1,timerID),10);
                this.setState(
                    function(prevState,props){
                        if(prevState.active!==prevState.number){
                            return {active:prevState.active+1};
                        }
                        return {active:prevState.number};
                    }
                );
            }
            if(dirFlag===1){
                let timerID=setInterval(()=>scroller(0,timerID),10);
                this.setState(
                    function(prevState,props){
                        if(prevState.active!==0){
                            return {active:prevState.active-1};
                        }
                        return {active:0};
                    }
                );
            } 
                     
        
    }
    
    componentDidMount(){
        traverser(0,document.getElementById("works"))
        fader("works");
    }


    render(){
        return(
            <div id="works">
                <section>
                    <div>
                        <h1>Book Keeping CRUD application</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan nibh sit amet sem eleifend tincidunt. Fusce vehicula semper consectetur. Cras sagittis ante vel metus mattis fringilla. Nunc et dui ut arcu posuere dictum sit amet eget ligula. Vivamus leo ante, auctor ut tellus non, consectetur viverra lectus. Maecenas sodales, mauris quis aliquet condimentum, ante metus consectetur odio, vitae pellentesque justo lorem vel odio. Ut porta tincidunt eros, sit amet fringilla felis venenatis vitae.</p>
                        <a href="#">More...</a>
                        <a href="#">Github</a>
                    </div>                    
                </section>
                <section>
                    <div>
                        <h1>Book Keeping CRUD application</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan nibh sit amet sem eleifend tincidunt. Fusce vehicula semper consectetur. Cras sagittis ante vel metus mattis fringilla. Nunc et dui ut arcu posuere dictum sit amet eget ligula. Vivamus leo ante, auctor ut tellus non, consectetur viverra lectus. Maecenas sodales, mauris quis aliquet condimentum, ante metus consectetur odio, vitae pellentesque justo lorem vel odio. Ut porta tincidunt eros, sit amet fringilla felis venenatis vitae.</p>
                        <a href="#">More...</a>
                        <a href="#">Github</a>
                    </div>                    
                </section>
                <section>
                    <div>
                        <h1>Book Keeping CRUD application</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan nibh sit amet sem eleifend tincidunt. Fusce vehicula semper consectetur. Cras sagittis ante vel metus mattis fringilla. Nunc et dui ut arcu posuere dictum sit amet eget ligula. Vivamus leo ante, auctor ut tellus non, consectetur viverra lectus. Maecenas sodales, mauris quis aliquet condimentum, ante metus consectetur odio, vitae pellentesque justo lorem vel odio. Ut porta tincidunt eros, sit amet fringilla felis venenatis vitae.</p>
                        <a href="#">More...</a>
                        <a href="#">Github</a>
                    </div>                    
                </section>
                <div onClick={
                    (function(event){
                        this.handleClick(this.state.active,event,1);
                    }).bind(this)
                } id="up">          
                    <Up color='rgb(248, 238, 231)' size={36} id="caret-up" />
                </div>
                <div onClick={
                    (function(event){
                        this.handleClick(this.state.active,event,0);
                    }).bind(this)
                } id="down" >
                    <Down color='rgb(248, 238, 231)' size={36} id="caret-down" /> 
                </div>                               
            </div>
        );
    }
}
class Home extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        traverser(0,document.getElementById("home"))
        fader("home");
    }
    render(){
        return(
            <div id="home">
                <div >
                    <h1 >McDhee,</h1>
                    <p >                        
                        the creative portfolio of 
                    </p>
                    <h1>Dheeraj Mohan</h1>
                    <hr/>
                    <p>
                        <span>Full stack web developer,&nbsp;</span>Machine Learning Enthusiast,&nbsp;
                        <span>&nbsp;Comic</span> and <span>a perfectionist</span> with love for open source software.
                    </p>
                </div>                   
            </div>
        );
    }
}
class Content extends React.Component{
    constructor(props){
        super(props);
        this.generateContent=this.generateContent.bind(this);
    }

    generateContent(focus){
        if(focus===0){
            return(
                <Home/>
            );
        }else if(focus===1){
            return(
                <WorksSlider/>
            );
        }
    }

    render(){
        return(
            <div id="content-box">
                {this.generateContent(this.props.focus)}
            </div>
        );
    }
}
class Box extends React.Component{
    constructor(props){
        super(props);
        this.state={active:0};
        this.updateState=this.updateState.bind(this);
    }
    componentWillMount(){
        this.setState({active:0});
    }
    componentWillUnMount(){
        this.setState({active:0});
    }
    updateState(i,dir){
        this.setState({active:(dir?(i===3?i:i+1):(i===0?i:i-1))});
    }
    render(){
        return(
            <div className="box">
                <Slider update={this.updateState} focus={this.state.active}/>
                <Content focus={this.state.active}/>
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

