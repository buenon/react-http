import React, { Component } from 'react';
import axios from "axios";
import { CircleLoader } from 'react-spinners';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: null
    };

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(postsResp => {
                let posts = postsResp.data.slice(0, 4).map((post, i) => {
                    axios.get('https://jsonplaceholder.typicode.com/users/' + post.userId).then(usersResp => {
                        let newPosts = [...this.state.posts];
                        newPosts[i] = { ...post, completed: true, author: usersResp.data.name }
                        this.setState({ posts: newPosts });
                    });

                    return { ...post, completed: false };
                });

                this.setState({ posts: posts });
            })
            .catch(error => {
                this.setState({ error: error });
            });
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
    }

    render() {
        let posts;

        if (this.state.error) {
            posts = <div style={{ textAlign: 'center' }}>Something went wrong...</div>
        } else {
            posts = this.state.posts.map(post => {
                if (post.completed) {
                    return (<Post key={post.id} title={post.title} author={post.author} click={() => { this.postSelectedHandler(post.id) }} />);
                } else {
                    return <CircleLoader key={post.id} color={'#0000ff'} />
                }
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;