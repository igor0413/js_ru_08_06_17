import React, {Component} from 'react';
import PropTypes from 'prop-types';
import dictionaries from '../dictionaries'

class LangProvider extends Component {
  getChildContext() {
    return {dictionary: dictionaries[this.props.language]}
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

LangProvider.propTypes = {
  language: PropTypes.string.isRequired
};

LangProvider.childContextTypes = {
  dictionary: PropTypes.object
}

export default LangProvider;
