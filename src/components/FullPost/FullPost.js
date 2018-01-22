import React, {Component} from 'react';
import axios from "axios";

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    };

    componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.loadedPost || (this.state.loadedPost.id !== this.props.id)) {
                axios
                    .get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                    .then((resp) => {
                        console.log(resp);
                        this.setState({loadedPost: resp.data});
                    });
            }
        }
    }

    deletePost = () => {
        if (this.state.loadedPost) {
            axios.delete('https://jsonplaceholder.typicode.com/posts/' + this.state.loadedPost.id).then(res => {
                console.log(res);                
            });
        }
    }

    render() {
        let post = null;

        if (this.props.id) {
            if (this.state.loadedPost) {
                post = (
                    <div className="FullPost">
                        <h1>{this.state.loadedPost.title}</h1>
                        <p>{this.state.loadedPost.body}</p>
                        <div className="Edit">
                            <button onClick={this.deletePost} className="Delete">Delete</button>
                        </div>
                    </div>
                );
            } else {
                post = <p style={{
                    textAlign: 'center'
                }}>Loading...</p>;
            }
        } else {
            post = <p style={{
                textAlign: 'center'
            }}>Please select a Post!</p>;
        }

        return post;
    }
}

export default FullPost;