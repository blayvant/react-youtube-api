// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
//
// import App from './components/app';
// import reducers from './reducers';
//
// const createStoreWithMiddleware = applyMiddleware()(createStore);
//
// ReactDOM.render(
//   <Provider store={createStoreWithMiddleware(reducers)}>
//     <App />
//   </Provider>
//   , document.querySelector('.container'));

import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import YTSearch from 'youtube-api-search';
const API_KEY = 'AIzaSyCyBp0eyNTX636Eq3lMEjVtKQjw6ieLxzM';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('Iron Maiden');

  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      <div>
         <SearchBar onSearchTermChange={videoSearch}  />
         <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          videos={this.state.videos}
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}  />
      </div>
    );
  }
}

ReactDOM.render(<App />,  document.querySelector('.container'));
