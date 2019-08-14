import React from 'react';

import './Post.css';
import {withRouter} from 'react-router-dom';

//VAŽNO: uvozimo withRouter, on nam omogućuje da imamo pristup onim props keys koje react-router ubaci u parent komponetu ove kompnete(parent koristi <Route/>)
const post = (props) => {
      console.log('Post.js-props,',props)
    return (
    <article className="Post" onClick={props.clicked}>
        <h1> {props.title} </h1>
        <div className="Info">
            <div className="Author">{props.author}</div>
        </div>
    </article>
    )
};

export default withRouter(post);