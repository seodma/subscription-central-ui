import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Routes } from './Routes';
import './App.scss';
import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
// eslint-disable-next-line max-len
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
// eslint-disable-next-line max-len
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import NotificationProvider from './contexts/NotificationProvider';
import Notifications from './components/Notifications';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: 10 * 1000,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }
  }
});

const App = (props) => {
  useEffect(() => {
    const registry = getRegistry();
    registry.register({ notifications: notificationsReducer });
    insights.chrome.init();

    insights.chrome.identifyApp('manifests');
    return insights.chrome.on('APP_NAVIGATION', (event) =>
      this.props.history.push(`/${event.navId}`)
    );
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <Notifications />
        <NotificationsPortal />
        <Routes childProps={props} />
      </NotificationProvider>
    </QueryClientProvider>
  );
};

export default withRouter(connect()(App));
