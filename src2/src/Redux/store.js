import { applyMiddleware, compose, createStore} from "redux";
import { createBrowserHistory } from "history";
import createRootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
 import { routerMiddleware, push } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import createMigrate from "redux-persist/es/createMigrate";
import sagas from "./Saga/sagas";
// import { routerMiddleware, push } from 'react-router-redux'
// const middleware = routerMiddleware(browserHistory)
// const store = createStore(
//   reducers,
//   applyMiddleware(middleware)
// )
export const history = createBrowserHistory();
const migrations = {
    0: (state) => state,
    1: (previousVersionState) => ({
      number: {
        change: previousVersionState.number,
        lastUpdate: new Date(),
      },
    }),
  };



const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: [
    "LoginReducer",
  ],
  migrate: createMigrate(migrations, { debug: true }),
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
    const sagaMiddleware = createSagaMiddleware();
    const rootReducer = createRootReducer(history);
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = createStore(
      persistedReducer, // root reducer with router state
      // applyMiddleware(middleware),
      preloadedState,
  
      composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
    );
    sagaMiddleware.run(sagas);
    const persistor = persistStore(store);
    return {
      store,
      persistor,
    };
  }