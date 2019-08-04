import React, { PureComponent } from 'react';
import { graphql, compose } from 'react-apollo';
import { getBooksQuery, deleteBookMutation } from '../queries/queries';
import BookDetails from './BookDetails';
import AddBook from './AddBook';

class BookList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  displayBooks() {
    const { data, deleteBookMutation } = this.props;
    if (data.loading === true) {
      return <div>Loading books</div>;
    }
    return data.books.map(book => (
      <li
        key={book.id}
        onClick={(e) => {
          this.setState({ selected: book.id });
        }}
        onClick={(e) => {deleteBookMutation({
          variables:{
            id: book.id
          }
        })}}
      >
        {book.name}
      </li>
    ));
  }

  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default compose(
  graphql(getBooksQuery, { name: 'getBooksQuery' }),
  graphql(deleteBookMutation, { name: 'deleteBookMutation' }),
)(AddBook);
