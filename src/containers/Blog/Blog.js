import React, { Component } from 'react';
import axios from "axios";

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null
    };

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(postsResp => {
                axios.get('https://jsonplaceholder.typicode.com/users').then(usersResp => {
                    let posts = postsResp.data.slice(0, 4).map(post => {
                        return { ...post, author: usersResp.data[post.userId].name };
                    });

                    this.setState({ posts: posts });
                });
            });
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
    }

    render() {
        let posts = this.state.posts.map(post => {
            return (<Post key={post.id} title={post.title} author={post.author} click={() => { this.postSelectedHandler(post.id) }} />);
        });

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