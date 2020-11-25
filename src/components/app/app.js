import React from "react";
import {connect} from "react-redux";
import {getPopupStatus} from "../../selectors/popup/selectors";
import Header from "../header/header";
import Main from "../main/main";
import Login from "../login/login";

const App = ({popupStatus}) => {
  return (
    <React.Fragment>
      {/* Header component */}
      <Header />

      <main className="main">
        {/* Intro component */}
        <Main />

        {/* Login component */}
        { popupStatus &&
          <Login />
        }
      </main>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  popupStatus: getPopupStatus(state),
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
