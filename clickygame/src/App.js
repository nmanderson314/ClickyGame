import React, { Component } from 'react';
import './App.css';
import pics from './pics.json'
import Container from './components/Container'
import Nav from './components/Nav'
import Content from './components/Content'
import PicCard from './components/PicCard'

class App extends Component {
    state = {
        message: "Click an image to begin!",
        topScore: 0,
        curScore: 0,
        pics: pics,
        unselectedPics: pics
    }

    componentDidMount() {
    }

    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectPic = bluth => {
        const findPic = this.state.unselectedPics.find(item => item.bluth === bluth);

        if(findPic === undefined) {
            // failure to select a new pic
            this.setState({ 
                message: "You guessed incorrectly!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                curScore: 0,
                pics: pics,
                unselectedpics: pics
            });
        }
        else {
            // success to select a new pic
            const newPics = this.state.unselectedPics.filter(item => item.bluth !== bluth);
            
            this.setState({ 
                message: "You guessed correctly!",
                curScore: this.state.curScore + 1,
                pics: pics,
                unselectedpics: newPics
            });
        }

        this.shuffleArray(pics);
    };

    render() {
        return (
            <Container>
                <Nav
                    message={this.state.message}
                    curScore={this.state.curScore}
                    topScore={this.state.topScore}
                />
                <Content />
                {
                    this.state.pics.map(pic => (
                        <PicCard
                            bluth={pic.bluth}
                            image={pic.image}
                            selectPic={this.selectPic} 
                            curScore={this.state.curScore}
                        />
                    ))
                }
            </Container>
        );
    }
}

export default App;