import React, { Component } from "react";
import "./styles/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Project";
import Skills from "./components/Skill";

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      foo: "bar",
      resumeData: {},
      sharedData: {},
    };
  }

  applyPickedLanguage(pickedLanguage, pickedLangIconId) {
    document.documentElement.lang = pickedLanguage;
    var resumePath = `data.json`;
    this.loadResumeFromPath(resumePath);
  }

  componentDidMount() {
    this.loadSharedData();
    var resumePath = `data.json`;
    this.loadResumeFromPath(resumePath);
    this.applyPickedLanguage(
      window.$primaryLanguage,
      window.$primaryLanguageIconId
    );
  }

  loadResumeFromPath(path) {
    
    fetch(path)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ resumeData: data });
            })
            .catch(error => console.error('Error:', error));
  }

  loadSharedData() {
    
    fetch('shared_data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                    this.setState({ sharedData: data });
                    document.title = `${this.state.sharedData.basic_info.name}`;
            })
            .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <div>
        <Header sharedData={this.state.sharedData.basic_info} />
        
        <About
          resumeBasicInfo={this.state.resumeData.basic_info}
          sharedBasicInfo={this.state.sharedData.basic_info}
        />
        <Projects
          resumeProjects={this.state.resumeData.projects}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Skills
          sharedSkills={this.state.sharedData.skills}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Experience
          resumeExperience={this.state.resumeData.experience}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Footer sharedBasicInfo={this.state.sharedData.basic_info} />
      </div>
    );
  }
}

export default App;