import React, { Component } from 'react'
import UserForm from './UserForm'
import Filters from './Filters'
import Counter from './Counter'
import NotFound from './routes/NotFound'
import NewArticle from './routes/NewArticle'
import CommentsPage from './routes/CommentsPage'
import 'react-select/dist/react-select.css'
import Articles from './routes/Articles'
import {Switch, Route, Redirect, NavLink} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import history from '../history'

class App extends Component {
    static propTypes = {

    };

    render() {
        return (
          <ConnectedRouter history={history}>
            <div>
              <div>
                <h2>Main menu</h2>
                <div><NavLink activeStyle={{color:'red'}} to='/counter'>Counter</NavLink></div>
                <div><NavLink activeStyle={{color:'red'}} to='/filters'>Filters</NavLink></div>
                <div><NavLink activeStyle={{color:'red'}} to='/articles'>Articles</NavLink></div>
              </div>
              <UserForm />
              <Switch>
                <Route path='/counter' component={Counter}/>
                <Route path='/filters' component={Filters}/>
                <Route path ='/articles/new' component = {NewArticle} />
                <Route path='/articles' component={Articles}/>
                <Route path='/comments' component={CommentsPage}/>
                {/*<Redirect from='/comments' to='/comments/1'/>*/}
                <Route path='*' component={NotFound}/>
              </Switch>
            </div>
          </ConnectedRouter>
        )
    }
}

export default App