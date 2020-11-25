import React from "react";
import {connect} from "react-redux";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {AppRoute} from "../../js/enums";
import {getPopupStatus} from "../../selectors/popup/selectors";
import Header from "../header/header";
import Main from "../main/main";
import Login from "../login/login";
import News from "../news/news";

const App = ({popupStatus}) => {
  return (
    <BrowserRouter>
      <Switch>
        <React.Fragment>
          {/* Header component */}
          <Header />

          <main className="main">
            <Route
              path={AppRoute.MAIN} exact
              render={() => (
                // Main component
                <Main />
              )}
            />

            <Route
              path={AppRoute.NEWS}
              render={() => (
                // News component
                <News />
              )}
            />

            {/* Login component */}
            { popupStatus &&
              <Login />
            }
          </main>
        </React.Fragment>
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  popupStatus: getPopupStatus(state),
});

// const mapDispatchToProps = (dispatch) => ({

// });

export default connect(
  mapStateToProps,
  null,
)(App);
