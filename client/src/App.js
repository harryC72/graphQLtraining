import React from 'react';
import BookList from './BookList';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client={ client }>
    <div id="main">
      <h1>Harry's reading list</h1>
      <BookList/>
    </div>
    </ApolloProvider>
  );
}

export default App;
