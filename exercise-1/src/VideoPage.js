import React from 'react';
import Video from './Video';
import Baby from 'babyparse';
import './css/Video.css';
import $ from 'jquery';
import {RaisedButton} from 'material-ui';

// Page of videos
var VideoPage = React.createClass({
	// Get initial state: videso (empty array) and currentVideo (0)
	getInitialState(){
		return{videos:[], currentVideo:0}
	},

	// When the component mounts, get (and parse) the data. Then set the state.
	componentDidMount(){
		$.get('data/videos.csv').then(function(data) {
			var parsed = Baby.parse(data, {header:true});
			this.setState({videos:parsed.data})
		}.bind(this));
	},
	// Function to set the state of the current video
	chooseVideo(id){
		this.setState({currentVideo:id})
	},

	// Render a button for each video, and show the selected video
	render() {
		// Get selectedVideo
		let selectedVideo = this.state.videos[this.state.currentVideo];

		// Return HTML elements
		return (
			<div className="videoPage">
				<div className="controls">
					{this.state.videos.map(function(video, i){
						return(
							<RaisedButton className="button" key={'video-' + i}
								id={i}
								label={video.title}
								disabled = {this.state.currentVideo == i}
								onClick={() => this.chooseVideo(i)}
							/>
						)
					}.bind(this))}
				</div>
				<div>
					{selectedVideo &&
						<Video url={selectedVideo.url} title={selectedVideo.title}/>
					}
				</div>
			</div>
		);
	}
});

export default VideoPage;
