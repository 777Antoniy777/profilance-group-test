import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getUsername} from "../../selectors/user/selectors";

const Main = ({username}) => {
  return (
    <section className="intro">
      <div className="site-wrapper">
        <h1 className="intro__title">Привет, {username}!</h1>
      </div>
    </section>
  );
};

Main.propTypes = {
  username: PropTypes.string,
};

const mapStateToProps = (state) => ({
  username: getUsername(state),
});

export default connect(
  mapStateToProps,
  null,
)(Main);
