import React, { PureComponent } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

class BookList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  displayBooks() {
    const { data } = this.props;
    if (data.loading === true) {
      return <div>Loading books</div>;
    }
    return data.books.map(book => (
      <li
        key={book.id}
        onClick={e => {
          this.setState({ selected: book.id });
        }}
      >
        {book.name}
        <div>X</div>
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

export default graphql(getBooksQuery)(BookList);

// export default compose(
//   graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
//   graphql(addBookMutation, { name: 'addBookMutation' }),
// )(AddBook);
