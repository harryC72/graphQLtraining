import React, { PureComponent } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: '',
    };
  }

  displayAuthors() {
    const data = this.props.getAuthorsQuery;

    console.log('props', this.props);
    if (data.loading === true) {
      return <option>It is loading!</option>;
    }
    return data.authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label htmlFor="book-name">
            Book name:
            <input type="text" id="book-name" onChange={e => this.setState({ name: e.target.value })} />
          </label>
        </div>

        <div className="field">
          <label htmlFor="genre">
            Genre:
            <input type="text" id="genre" onChange={e => this.setState({ genre: e.target.value })} />
          </label>
        </div>

        <div className="field">
          <label htmlFor="select-author">
            Author:
            <select id="select-author" onChange={e => this.setState({ authorId: e.target.value })}>
              {this.displayAuthors()}
            </select>
          </label>
        </div>

        <button type="submit">+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' }),
)(AddBook);
